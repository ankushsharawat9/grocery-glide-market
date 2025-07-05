
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useCheckout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const [formData, setFormData] = useState<FormData>({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  // Load saved address on component mount
  useState(() => {
    const savedAddress = localStorage.getItem('savedAddress');
    if (savedAddress) {
      const parsed = JSON.parse(savedAddress);
      setFormData(prev => ({ ...prev, ...parsed }));
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveAddress = () => {
    const addressData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      phone: formData.phone
    };
    localStorage.setItem('savedAddress', JSON.stringify(addressData));
    toast.success('Address saved for future orders');
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'phone'];
    const missing = required.filter(field => !formData[field as keyof FormData].trim());
    
    if (missing.length > 0) {
      toast.error(`Please fill in all required fields: ${missing.join(', ')}`);
      return false;
    }
    
    return true;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const createOrder = async (finalTotal: number) => {
    const orderData = {
      user_id: user?.id,
      total_amount: finalTotal,
      status: paymentMethod === 'cod' ? 'pending' : 'pending',
      payment_method: paymentMethod === 'cod' ? 'cod' : 'online',
      shipping_address: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone
      },
      billing_address: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone
      }
    };

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (orderError) throw orderError;

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.product.id,
      quantity: item.quantity,
      price: item.product.price * 83 // Convert to rupees
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Calculate total with shipping and tax in rupees
      const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const subtotalInr = subtotal * 83; // Convert to rupees
      const shipping = subtotalInr > 500 ? 0 : 50; // ₹50 shipping, free above ₹500
      const tax = subtotalInr * 0.08; // 8% tax
      const finalTotal = subtotalInr + shipping + tax;

      const order = await createOrder(finalTotal);

      if (paymentMethod === 'cod') {
        // COD order - just clear cart and redirect
        await clearCart();
        toast.success('Order placed successfully! You can pay on delivery.');
        navigate(`/order-success?order_id=${order.id}`);
        return;
      }

      // Online payment with Razorpay
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay SDK');
      }

      // Create Razorpay order
      const { data: razorpayData, error: razorpayError } = await supabase.functions.invoke(
        'create-checkout-session',
        {
          body: {
            items,
            shipping_address: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              phone: formData.phone
            },
            billing_address: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipCode: formData.zipCode,
              phone: formData.phone
            },
            total_amount: finalTotal
          }
        }
      );

      if (razorpayError) throw razorpayError;

      // Configure Razorpay options
      const options = {
        key: razorpayData.keyId,
        amount: razorpayData.amount,
        currency: razorpayData.currency,
        name: 'GroceryGlide',
        description: 'Order Payment',
        order_id: razorpayData.orderId,
        handler: async function (response: any) {
          try {
            // Update order status to paid
            const { error: updateError } = await supabase
              .from('orders')
              .update({ 
                status: 'paid',
                stripe_session_id: response.razorpay_payment_id 
              })
              .eq('id', order.id);

            if (updateError) throw updateError;

            // Clear cart and redirect to success page
            await clearCart();
            toast.success('Payment successful!');
            navigate(`/order-success?session_id=${response.razorpay_payment_id}`);
          } catch (error) {
            console.error('Payment confirmation error:', error);
            toast.error('Payment completed but order update failed. Please contact support.');
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          address: formData.address
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to process order. Please try again.');
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    paymentMethod,
    setPaymentMethod,
    handleInputChange,
    handleSubmit,
    saveAddress,
    items,
    totalPrice
  };
};

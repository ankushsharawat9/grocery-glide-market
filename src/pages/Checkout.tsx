
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCheckout } from '@/hooks/useCheckout';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    formData, 
    loading, 
    paymentMethod, 
    setPaymentMethod, 
    handleInputChange, 
    handleSubmit, 
    saveAddress, 
    items, 
    totalPrice 
  } = useCheckout();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
  }, [user, items, navigate]);

  // Convert to rupees (1 USD = 83 INR approximately)
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const subtotalInr = subtotal * 83;
  const shipping = subtotalInr > 500 ? 0 : 50; // Free shipping above ₹500
  const tax = subtotalInr * 0.08; // 8% tax
  const finalTotal = subtotalInr + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ShippingForm
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            loading={loading}
            finalTotal={finalTotal}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            onSaveAddress={saveAddress}
          />
          
          <OrderSummary
            items={items}
            subtotal={subtotalInr}
            shipping={shipping}
            tax={tax}
            finalTotal={finalTotal}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;

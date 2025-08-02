import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

interface OrderData {
  items: CartItem[];
  shipping_address: any;
  billing_address: any;
  total_amount: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get authenticated user
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Parse request body
    const { orderData }: { orderData: OrderData } = await req.json();

    // Get Razorpay credentials
    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!keyId || !keySecret) {
      throw new Error("Razorpay credentials not configured");
    }

    // Create Razorpay order
    const razorpayOrder = {
      amount: Math.round(orderData.total_amount * 100), // Convert to paise (smallest currency unit)
      currency: "INR",
      receipt: `order_${Date.now()}`,
      notes: {
        user_id: user.id,
        user_email: user.email
      }
    };

    // Make request to Razorpay API
    const auth = btoa(`${keyId}:${keySecret}`);
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(razorpayOrder)
    });

    if (!razorpayResponse.ok) {
      const errorData = await razorpayResponse.text();
      console.error("Razorpay API error:", errorData);
      throw new Error("Failed to create Razorpay order");
    }

    const razorpayOrderData = await razorpayResponse.json();

    // Create order record in Supabase using service role key
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data: orderRecord, error: orderError } = await supabaseService
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: orderData.total_amount,
        shipping_address: orderData.shipping_address,
        billing_address: orderData.billing_address,
        currency: "INR",
        status: "pending",
        payment_method: "razorpay",
        stripe_session_id: razorpayOrderData.id // Store Razorpay order ID
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      throw new Error("Failed to create order record");
    }

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: orderRecord.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.product.price
    }));

    const { error: itemsError } = await supabaseService
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      throw new Error("Failed to create order items");
    }

    // Return Razorpay order details for frontend
    return new Response(
      JSON.stringify({
        razorpay_order_id: razorpayOrderData.id,
        amount: razorpayOrderData.amount,
        currency: razorpayOrderData.currency,
        key_id: keyId,
        order_id: orderRecord.id,
        user_contact: user.phone || "",
        user_email: user.email || ""
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
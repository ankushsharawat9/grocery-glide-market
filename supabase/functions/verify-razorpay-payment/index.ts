import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to verify Razorpay signature
function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  const crypto = globalThis.crypto;
  const encoder = new TextEncoder();
  
  const body = orderId + "|" + paymentId;
  const expectedSignature = btoa(
    Array.from(
      new Uint8Array(
        crypto.subtle.digest("SHA-256", encoder.encode(secret + body))
      )
    ).map(b => String.fromCharCode(b)).join("")
  );
  
  return expectedSignature === signature;
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
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      order_id 
    } = await req.json();

    // Get Razorpay secret
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!keySecret) {
      throw new Error("Razorpay secret not configured");
    }

    // Verify signature
    const isValidSignature = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      keySecret
    );

    if (!isValidSignature) {
      throw new Error("Invalid payment signature");
    }

    // Update order status in database using service role key
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { data: updatedOrder, error: updateError } = await supabaseService
      .from("orders")
      .update({
        status: "paid",
        updated_at: new Date().toISOString()
      })
      .eq("id", order_id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating order:", updateError);
      throw new Error("Failed to update order status");
    }

    // Clear user's cart after successful payment
    const { error: cartError } = await supabaseService
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (cartError) {
      console.error("Error clearing cart:", cartError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        order: updatedOrder,
        payment_id: razorpay_payment_id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
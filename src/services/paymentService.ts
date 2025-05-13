
import { CartItem } from "@/lib/cart";

// Payment processing service

interface PaymentDetails {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface PaymentResult {
  success: boolean;
  orderId?: string;
  error?: string;
  redirectUrl?: string;
}

// Process payment with cart items, shipping info and payment details
export async function processPayment(
  items: CartItem[], 
  shippingInfo: ShippingInfo, 
  paymentInfo: PaymentDetails,
  total: number
): Promise<PaymentResult> {
  // In a real implementation, this would connect to Stripe, PayPal, or another payment processor
  // For now, we'll simulate a successful payment
  
  console.log("Processing payment for order:", {
    items,
    shipping: shippingInfo,
    amount: total
  });
  
  // Simple validation
  if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
    return {
      success: false,
      error: "Invalid payment information"
    };
  }
  
  // For testing purposes, card numbers ending with "0000" will fail
  if (paymentInfo.cardNumber.endsWith("0000")) {
    return {
      success: false,
      error: "Payment declined. Please try a different payment method."
    };
  }
  
  try {
    // Simulate API call with a small delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a random order ID
    const orderId = `FSD-${Math.floor(100000 + Math.random() * 900000)}`;
    
    return {
      success: true,
      orderId,
      redirectUrl: `/order-confirmation/${orderId}`
    };
  } catch (error) {
    console.error("Payment processing error:", error);
    return {
      success: false,
      error: "An error occurred while processing your payment. Please try again."
    };
  }
}

// Validate payment info
export function validatePaymentInfo(paymentInfo: PaymentDetails): { valid: boolean, errors?: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (!paymentInfo.cardName) {
    errors.cardName = "Name on card is required";
  }
  
  if (!paymentInfo.cardNumber) {
    errors.cardNumber = "Card number is required";
  } else if (!/^\d{15,16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
    errors.cardNumber = "Invalid card number";
  }
  
  if (!paymentInfo.expiryDate) {
    errors.expiryDate = "Expiry date is required";
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expiryDate)) {
    errors.expiryDate = "Invalid expiry date (MM/YY)";
  } else {
    // Check if card is expired
    const [month, year] = paymentInfo.expiryDate.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const now = new Date();
    
    if (expiryDate < now) {
      errors.expiryDate = "Card is expired";
    }
  }
  
  if (!paymentInfo.cvv) {
    errors.cvv = "Security code is required";
  } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
    errors.cvv = "Invalid security code";
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined
  };
}

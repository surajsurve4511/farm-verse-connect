
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
  sessionUrl?: string;
}

// Get the Stripe publishable key from environment variables
const getStripePublishableKey = () => {
  return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';
};

// Check if we're in production mode to determine if we should use the live API
const isProduction = () => {
  return import.meta.env.VITE_USE_PRODUCTION_API === 'true';
};

// Process payment with cart items, shipping info and payment details
export async function processPayment(
  items: CartItem[], 
  shippingInfo: ShippingInfo, 
  paymentInfo: PaymentDetails,
  total: number
): Promise<PaymentResult> {
  // Simple validation
  if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv) {
    return {
      success: false,
      error: "Invalid payment information"
    };
  }
  
  try {
    if (isProduction()) {
      // In production, we create a payment intent on our server
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${apiUrl}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({ id: item.id, quantity: item.quantity })),
          shipping: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zipCode,
              country: 'US',
            },
            email: shippingInfo.email,
            phone: shippingInfo.phone,
          },
          amount: Math.round(total * 100), // Convert to cents
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create payment intent');
      }
      
      const data = await response.json();
      
      // For Stripe Elements or Checkout integration, return the session URL
      if (data.sessionUrl) {
        return {
          success: true,
          sessionUrl: data.sessionUrl,
        };
      }
      
      // For direct integration using client-side confirmations
      return {
        success: true,
        orderId: data.orderId || `FSD-${Math.floor(100000 + Math.random() * 900000)}`,
        redirectUrl: `/order-confirmation/${data.orderId || 'success'}`
      };
    } else {
      // In development, we'll simulate a successful payment with a small delay
      console.log("DEV MODE: Simulating payment processing for order:", {
        items,
        shipping: shippingInfo,
        amount: total
      });
      
      // For testing purposes, card numbers ending with "0000" will fail
      if (paymentInfo.cardNumber.endsWith("0000")) {
        return {
          success: false,
          error: "Payment declined. Please try a different payment method."
        };
      }
      
      // Simulate API call with a small delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random order ID
      const orderId = `FSD-${Math.floor(100000 + Math.random() * 900000)}`;
      
      return {
        success: true,
        orderId,
        redirectUrl: `/order-confirmation/${orderId}`
      };
    }
  } catch (error) {
    console.error("Payment processing error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while processing your payment. Please try again."
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

// For direct Stripe checkout integration (optional)
export async function createStripeCheckoutSession(items: CartItem[], shippingInfo: ShippingInfo): Promise<PaymentResult> {
  try {
    if (isProduction()) {
      // Call your backend to create a Stripe checkout session
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${apiUrl}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            id: item.id,
            name: item.name,
            price: Math.round(item.price * 100), // Convert to cents
            quantity: item.quantity,
            image: item.image
          })),
          customer_email: shippingInfo.email,
          shipping: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zipCode,
              country: 'US',
            },
            phone: shippingInfo.phone,
          }
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create checkout session');
      }
      
      const { sessionUrl } = await response.json();
      
      return {
        success: true,
        sessionUrl
      };
    } else {
      // In development, simulate a checkout session
      console.log("DEV MODE: Simulating checkout session creation for:", {
        items,
        shipping: shippingInfo
      });
      
      // Simulate API call with a small delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random order ID
      const orderId = `FSD-${Math.floor(100000 + Math.random() * 900000)}`;
      
      return {
        success: true,
        orderId,
        redirectUrl: `/order-confirmation/${orderId}`
      };
    }
  } catch (error) {
    console.error("Checkout session creation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred while creating your checkout session. Please try again."
    };
  }
}

// Function to verify a payment (can be used after redirect)
export async function verifyPayment(sessionId: string): Promise<{ verified: boolean, orderId?: string }> {
  try {
    if (isProduction()) {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      
      const response = await fetch(`${apiUrl}/verify-payment/${sessionId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        return { verified: false };
      }
      
      const data = await response.json();
      return {
        verified: data.verified,
        orderId: data.orderId,
      };
    } else {
      // In development, simulate verification
      console.log(`DEV MODE: Simulating payment verification for session ${sessionId}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        verified: true,
        orderId: `FSD-${Math.floor(100000 + Math.random() * 900000)}`
      };
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return { verified: false };
  }
}

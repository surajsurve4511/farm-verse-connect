
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Check, Truck, Box, MapPin, Clock } from "lucide-react";

// Cart item type
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  farm: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderTracking, setOrderTracking] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState("processing");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState("");

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    saveAddress: false
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveCard: false
  });

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data:", e);
      }
    }
  }, []);

  // Calculate order summary
  const orderSummary = {
    items: cartItems.map(item => ({ 
      name: item.name, 
      quantity: item.quantity, 
      price: item.price 
    })),
    subtotal: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
    shipping: 5.99,
    discount: 0,
    get total() { return this.subtotal + this.shipping - this.discount; }
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handlePlaceOrder = () => {
    setIsLoading(true);
    
    // Generate random order number
    const newOrderNumber = `FSD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(newOrderNumber);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setOrderComplete(true);
      
      // Clear cart after successful order
      localStorage.removeItem('cart');
      
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. Your order has been confirmed.",
      });
    }, 2000);
  };

  const handleTrackOrder = () => {
    setOrderTracking(true);
    
    // Simulate order status update
    const statuses = ["processing", "confirmed", "shipped", "out_for_delivery", "delivered"];
    let currentIndex = 0;
    
    setTrackingStatus(statuses[currentIndex]);
    
    // Simulate order status progression
    const statusInterval = setInterval(() => {
      currentIndex++;
      if (currentIndex < statuses.length) {
        setTrackingStatus(statuses[currentIndex]);
      } else {
        clearInterval(statusInterval);
      }
    }, 3000);
    
    // Clean up interval on component unmount
    return () => clearInterval(statusInterval);
  };
  
  // Render the order tracking interface
  if (orderTracking) {
    return (
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="mb-6">
            <button 
              onClick={() => setOrderTracking(false)} 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Order Confirmation
            </button>
            <h1 className="text-3xl font-bold mt-2">Track Your Order</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Order #{orderNumber}</CardTitle>
              <CardDescription>
                Track the status of your order in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-12">
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-muted-foreground/30 z-0"></div>
                  
                  <div className="relative z-10 flex items-center mb-12">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${trackingStatus === "processing" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"}`}>
                      <Box className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-lg">Order Processing</h3>
                      <p className="text-muted-foreground">Your order has been received and is being processed</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date().toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-center mb-12">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${trackingStatus === "confirmed" ? "bg-blue-100 text-blue-600" : (trackingStatus === "processing" ? "bg-muted text-muted-foreground" : "bg-green-100 text-green-600")}`}>
                      <Check className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-lg">Order Confirmed</h3>
                      <p className="text-muted-foreground">Your order has been confirmed and is being prepared</p>
                      {trackingStatus !== "processing" && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(Date.now() + 10 * 60000).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-center mb-12">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${trackingStatus === "shipped" ? "bg-blue-100 text-blue-600" : (trackingStatus === "processing" || trackingStatus === "confirmed" ? "bg-muted text-muted-foreground" : "bg-green-100 text-green-600")}`}>
                      <Truck className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-lg">Shipped</h3>
                      <p className="text-muted-foreground">Your order has been shipped and is on its way</p>
                      {trackingStatus !== "processing" && trackingStatus !== "confirmed" && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(Date.now() + 30 * 60000).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-center mb-12">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${trackingStatus === "out_for_delivery" ? "bg-blue-100 text-blue-600" : (trackingStatus === "processing" || trackingStatus === "confirmed" || trackingStatus === "shipped" ? "bg-muted text-muted-foreground" : "bg-green-100 text-green-600")}`}>
                      <MapPin className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-lg">Out for Delivery</h3>
                      <p className="text-muted-foreground">Your order is out for delivery</p>
                      {trackingStatus !== "processing" && trackingStatus !== "confirmed" && trackingStatus !== "shipped" && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(Date.now() + 60 * 60000).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${trackingStatus === "delivered" ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}>
                      <Clock className="h-8 w-8" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-lg">Delivered</h3>
                      <p className="text-muted-foreground">Your order has been delivered successfully</p>
                      {trackingStatus === "delivered" && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(Date.now() + 90 * 60000).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h3 className="font-medium mb-2">Delivery Details</h3>
                <p><span className="text-muted-foreground">Address:</span> {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                <p><span className="text-muted-foreground">Recipient:</span> {shippingInfo.firstName} {shippingInfo.lastName}</p>
                <p><span className="text-muted-foreground">Contact:</span> {shippingInfo.phone}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setOrderTracking(false)}>
                Back to Order
              </Button>
              <Button disabled={trackingStatus !== "delivered"}>
                {trackingStatus === "delivered" ? "Confirm Receipt" : "Awaiting Delivery"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-muted/30 py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Thank you for your purchase. Your order has been placed and is being processed.
              </p>
              
              <div className="bg-muted p-4 rounded-md w-full max-w-md mb-6">
                <div className="font-medium">Order #{orderNumber}</div>
                <div className="text-sm text-muted-foreground">A confirmation email has been sent to {shippingInfo.email}</div>
              </div>
              
              <div className="flex flex-col items-center gap-4 mb-8 w-full max-w-md">
                <Button 
                  className="w-full" 
                  onClick={handleTrackOrder}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Track Your Order
                </Button>
                
                <div className="flex gap-4 w-full">
                  <Link to="/dashboard" className="w-1/2">
                    <Button className="w-full" variant="outline">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Link to="/marketplace" className="w-1/2">
                    <Button className="w-full" variant="outline">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-md w-full max-w-md">
                <h3 className="font-medium mb-2">Estimated Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Your order is expected to arrive within 2-3 business days. You can track your order status at any time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold mt-2">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>
                  Enter where you'd like your order to be delivered
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input 
                      id="zipCode" 
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox 
                    id="saveAddress" 
                    name="saveAddress"
                    checked={shippingInfo.saveAddress}
                    onCheckedChange={(checked) => 
                      setShippingInfo(prev => ({ ...prev, saveAddress: checked === true }))
                    }
                  />
                  <label
                    htmlFor="saveAddress"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Save this address for future orders
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Choose how you'd like to pay for your order
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                    <RadioGroupItem value="card" id="payment-card" />
                    <Label htmlFor="payment-card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <span>Credit/Debit Card</span>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted opacity-50">
                    <RadioGroupItem value="paypal" id="payment-paypal" disabled />
                    <Label htmlFor="payment-paypal" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.217a.77.77 0 0 1 .757-.651h6.737c2.785 0 4.765 1.994 4.47 4.787-.026.257-.078.51-.146.748.935.261 1.683.731 2.205 1.404.604.784.815 1.8.708 2.977-.395 4.322-3.396 5.292-6.326 5.292h-1.39a.761.761 0 0 0-.75.63l-.893 4.933zm8.9-10.6c-.336 2.157-1.924 3.402-4.359 3.402h-1.761c-.135 0-.253.095-.277.227l-.916 5.153h3.041l.004-.025.756-4.172a.591.591 0 0 1 .581-.489h1.067c2.216 0 4.186-.762 4.73-4.097.262-1.604.038-2.695-2.866-3.105v3.105zM7.148 11.1H4.87a.27.27 0 0 0-.266.231l-1.265 7.037h3.177l.933-5.543a.333.333 0 0 1 .328-.276h1.872c.901 0 1.75-.133 2.52-.395-1.115.669-2.396.946-4.022.946z" />
                        </svg>
                        <span>PayPal (Coming Soon)</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input 
                        id="cardName" 
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input 
                          id="expiryDate" 
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          name="cvv"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox 
                        id="saveCard" 
                        name="saveCard"
                        checked={paymentInfo.saveCard}
                        onCheckedChange={(checked) => 
                          setPaymentInfo(prev => ({ ...prev, saveCard: checked === true }))
                        }
                      />
                      <label
                        htmlFor="saveCard"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Save this card for future payments
                      </label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-sm">
                      {item.quantity}x {item.name}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${orderSummary.shipping.toFixed(2)}</span>
                  </div>
                  {orderSummary.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${orderSummary.discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={isLoading || orderSummary.items.length === 0}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

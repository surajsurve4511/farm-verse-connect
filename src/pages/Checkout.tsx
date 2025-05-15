
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
import { ArrowLeft, CreditCard, Check, Truck, Box, MapPin, Clock, AlertCircle, Smartphone } from "lucide-react";
import { getCartItems, clearCart, CartItem } from "@/lib/cart";
import { processPayment, validatePaymentInfo, createRazorpayOrder } from "@/services/paymentService";
import { createOrderAPI } from "@/services/apiService";
import { Toaster } from "@/components/ui/toaster";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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
    country: "IN", // Default to India
    saveAddress: false
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
    paymentMethod: "card",
    upiId: "",
    bankName: ""
  });

  // Load cart items from localStorage on mount
  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
    
    // If cart is empty, redirect to cart page
    if (items.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive"
      });
      navigate('/cart');
    }
  }, [navigate, toast]);

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
    
    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    setPaymentInfo(prev => ({
      ...prev,
      paymentMethod: value
    }));
    
    // Clear validation errors for the previous payment method
    setValidationErrors({});
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'country') {
      setShippingInfo(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setPaymentInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear validation error when field is updated
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Validate shipping info
    if (!shippingInfo.firstName) errors.firstName = "First name is required";
    if (!shippingInfo.lastName) errors.lastName = "Last name is required";
    if (!shippingInfo.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      errors.email = "Email is invalid";
    }
    if (!shippingInfo.phone) errors.phone = "Phone number is required";
    if (!shippingInfo.address) errors.address = "Address is required";
    if (!shippingInfo.city) errors.city = "City is required";
    if (!shippingInfo.state) errors.state = "State is required";
    if (!shippingInfo.zipCode) errors.zipCode = "ZIP code is required";
    
    // Validate payment info based on payment method
    paymentInfo.paymentMethod = paymentMethod;
    const paymentValidation = validatePaymentInfo(paymentInfo);
    if (!paymentValidation.valid && paymentValidation.errors) {
      Object.assign(errors, paymentValidation.errors);
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "There are issues with your information. Please correct them before placing your order.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // For Indian payments and UPI/Wallets/Net Banking, use Razorpay
      if (shippingInfo.country === 'IN' && ['upi', 'netbanking', 'wallet'].includes(paymentMethod)) {
        const razorpayResult = await createRazorpayOrder(
          cartItems,
          shippingInfo,
          orderSummary.total
        );
        
        if (!razorpayResult.success) {
          toast({
            title: "Payment initiation failed",
            description: razorpayResult.error || "There was a problem initiating your payment. Please try again.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        
        // If we have a session URL, redirect to Razorpay
        if (razorpayResult.sessionUrl) {
          window.location.href = razorpayResult.sessionUrl;
          return;
        }
        
        // Set the order number from the Razorpay result
        setOrderNumber(razorpayResult.orderId || `FSD-${Math.floor(100000 + Math.random() * 900000)}`);
        
      } else {
        // Use regular card processing for other countries or card payments
        const paymentResult = await processPayment(
          cartItems,
          shippingInfo,
          paymentInfo,
          orderSummary.total
        );
        
        if (!paymentResult.success) {
          toast({
            title: "Payment failed",
            description: paymentResult.error || "There was a problem processing your payment. Please try again.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        
        // Check if we should redirect to external payment page
        if (paymentResult.sessionUrl) {
          window.location.href = paymentResult.sessionUrl;
          return;
        }
        
        // Set order number from payment result
        setOrderNumber(paymentResult.orderId || `FSD-${Math.floor(100000 + Math.random() * 900000)}`);
      }
      
      // Clear cart after successful order
      clearCart();
      
      // Optional: Create order in database...
      
      setIsLoading(false);
      setOrderComplete(true);
      
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. Your order has been confirmed.",
      });
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
      toast({
        title: "Something went wrong",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    }
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
                    <Label htmlFor="firstName" className={validationErrors.firstName ? "text-destructive" : ""}>
                      First Name {validationErrors.firstName && <span className="text-destructive">*</span>}
                    </Label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      className={validationErrors.firstName ? "border-destructive" : ""}
                      required
                    />
                    {validationErrors.firstName && (
                      <p className="text-destructive text-sm">{validationErrors.firstName}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className={validationErrors.lastName ? "text-destructive" : ""}>
                      Last Name {validationErrors.lastName && <span className="text-destructive">*</span>}
                    </Label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      className={validationErrors.lastName ? "border-destructive" : ""}
                      required
                    />
                    {validationErrors.lastName && (
                      <p className="text-destructive text-sm">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className={validationErrors.email ? "text-destructive" : ""}>
                      Email Address {validationErrors.email && <span className="text-destructive">*</span>}
                    </Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={handleShippingChange}
                      className={validationErrors.email ? "border-destructive" : ""}
                      required
                    />
                    {validationErrors.email && (
                      <p className="text-destructive text-sm">{validationErrors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className={validationErrors.phone ? "text-destructive" : ""}>
                      Phone Number {validationErrors.phone && <span className="text-destructive">*</span>}
                    </Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className={validationErrors.phone ? "border-destructive" : ""}
                      required
                    />
                    {validationErrors.phone && (
                      <p className="text-destructive text-sm">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className={validationErrors.address ? "text-destructive" : ""}>
                    Street Address {validationErrors.address && <span className="text-destructive">*</span>}
                  </Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingChange}
                    className={validationErrors.address ? "border-destructive" : ""}
                    required
                  />
                  {validationErrors.address && (
                    <p className="text-destructive text-sm">{validationErrors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="city" className={validationErrors.city ? "text-destructive" : ""}>
                      City {validationErrors.city && <span className="text-destructive">*</span>}
                    </Label>
                    <Input 
                      id="city" 
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className={validationErrors.city ? "border-destructive" : ""}
                      required
                    />
                    {validationErrors.city && (
                      <p className="text-destructive text-sm">{validationErrors.city}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className={validationErrors.state ? "text-destructive" : ""}>
                      State {validationErrors.state && <span className="text-destructive">*</span>}
                    </Label>
                    <Input 
                      id="state" 
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className={validationErrors.state ? "border-destructive" : ""}
                      required
                    />
                    {validationErrors.state && (
                      <p className="text-destructive text-sm">{validationErrors.state}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className={validationErrors.zipCode ? "text-destructive" : ""}>
                      ZIP Code {validationErrors.zipCode && <span className="text-destructive">*</span>}
                    </Label>
                    <Input 
                      id="zipCode" 
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      className={validationErrors.zipCode ? "border-destructive" : ""}
                      required
                    />
                    {validationErrors.zipCode && (
                      <p className="text-destructive text-sm">{validationErrors.zipCode}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select 
                    value={shippingInfo.country} 
                    onValueChange={(value) => handleSelectChange('country', value)}
                  >
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                    </SelectContent>
                  </Select>
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
                  onValueChange={handlePaymentMethodChange}
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
                  
                  {shippingInfo.country === 'IN' && (
                    <>
                      <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="upi" id="payment-upi" />
                        <Label htmlFor="payment-upi" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Smartphone className="h-5 w-5" />
                            <span>UPI</span>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="netbanking" id="payment-netbanking" />
                        <Label htmlFor="payment-netbanking" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7 8H7v2h4v2h2v-2h4v-2h-4V9h2V7h-2v2h-2v2z" />
                            </svg>
                            <span>Net Banking</span>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted">
                        <RadioGroupItem value="wallet" id="payment-wallet" />
                        <Label htmlFor="payment-wallet" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M16 12h2v4h-2z" />
                              <path d="M20 7V5c0-1.103-.897-2-2-2H5C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h14c1.103 0 2-.897 2-2v-2h-2v2H5c-.551 0-1-.449-1-1V6c0-.551.449-1 1-1h13v2h2z" />
                              <path d="M20 9H9c-1.103 0-2 .897-2 2v6c0 1.103.897 2 2 2h11c1.103 0 2-.897 2-2v-6c0-1.103-.897-2-2-2zM9 17v-6h11l.002 6H9z" />
                            </svg>
                            <span>Wallets (Paytm, PhonePe, etc.)</span>
                          </div>
                        </Label>
                      </div>
                    </>
                  )}
                  
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
                      <Label htmlFor="cardName" className={validationErrors.cardName ? "text-destructive" : ""}>
                        Name on Card {validationErrors.cardName && <span className="text-destructive">*</span>}
                      </Label>
                      <Input 
                        id="cardName" 
                        name="cardName"
                        value={paymentInfo.cardName}
                        onChange={handlePaymentChange}
                        className={validationErrors.cardName ? "border-destructive" : ""}
                        required
                      />
                      {validationErrors.cardName && (
                        <p className="text-destructive text-sm">{validationErrors.cardName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className={validationErrors.cardNumber ? "text-destructive" : ""}>
                        Card Number {validationErrors.cardNumber && <span className="text-destructive">*</span>}
                      </Label>
                      <Input 
                        id="cardNumber" 
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={handlePaymentChange}
                        className={validationErrors.cardNumber ? "border-destructive" : ""}
                        required
                      />
                      {validationErrors.cardNumber && (
                        <p className="text-destructive text-sm">{validationErrors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className={validationErrors.expiryDate ? "text-destructive" : ""}>
                          Expiry Date {validationErrors.expiryDate && <span className="text-destructive">*</span>}
                        </Label>
                        <Input 
                          id="expiryDate" 
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={handlePaymentChange}
                          className={validationErrors.expiryDate ? "border-destructive" : ""}
                          required
                        />
                        {validationErrors.expiryDate && (
                          <p className="text-destructive text-sm">{validationErrors.expiryDate}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className={validationErrors.cvv ? "text-destructive" : ""}>
                          CVV {validationErrors.cvv && <span className="text-destructive">*</span>}
                        </Label>
                        <Input 
                          id="cvv" 
                          name="cvv"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          className={validationErrors.cvv ? "border-destructive" : ""}
                          required
                        />
                        {validationErrors.cvv && (
                          <p className="text-destructive text-sm">{validationErrors.cvv}</p>
                        )}
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

                {paymentMethod === "upi" && (
                  <div className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId" className={validationErrors.upiId ? "text-destructive" : ""}>
                        UPI ID {validationErrors.upiId && <span className="text-destructive">*</span>}
                      </Label>
                      <Input 
                        id="upiId" 
                        name="upiId"
                        placeholder="yourname@upi"
                        value={paymentInfo.upiId}
                        onChange={handlePaymentChange}
                        className={validationErrors.upiId ? "border-destructive" : ""}
                        required
                      />
                      {validationErrors.upiId && (
                        <p className="text-destructive text-sm">{validationErrors.upiId}</p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You'll receive a payment request on your UPI app.
                    </p>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName" className={validationErrors.bankName ? "text-destructive" : ""}>
                        Select Bank {validationErrors.bankName && <span className="text-destructive">*</span>}
                      </Label>
                      <Select 
                        value={paymentInfo.bankName} 
                        onValueChange={(value) => handleSelectChange('bankName', value)}
                      >
                        <SelectTrigger id="bankName" className={validationErrors.bankName ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sbi">State Bank of India</SelectItem>
                          <SelectItem value="hdfc">HDFC Bank</SelectItem>
                          <SelectItem value="icici">ICICI Bank</SelectItem>
                          <SelectItem value="axis">Axis Bank</SelectItem>
                          <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                          <SelectItem value="pnb">Punjab National Bank</SelectItem>
                        </SelectContent>
                      </Select>
                      {validationErrors.bankName && (
                        <p className="text-destructive text-sm">{validationErrors.bankName}</p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to your bank's website to complete the payment.
                    </p>
                  </div>
                )}

                {paymentMethod === "wallet" && (
                  <div className="pt-4 space-y-4">
                    <p className="text-sm">
                      Choose your preferred wallet on the payment page. We support:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <div className="border rounded p-2 px-3 text-sm">Paytm</div>
                      <div className="border rounded p-2 px-3 text-sm">PhonePe</div>
                      <div className="border rounded p-2 px-3 text-sm">Google Pay</div>
                      <div className="border rounded p-2 px-3 text-sm">Amazon Pay</div>
                      <div className="border rounded p-2 px-3 text-sm">MobiKwik</div>
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
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₹{orderSummary.shipping.toFixed(2)}</span>
                  </div>
                  {orderSummary.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{orderSummary.discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{orderSummary.total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePlaceOrder}
                  disabled={isLoading || orderSummary.items.length === 0}
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </Button>
                {Object.keys(validationErrors).length > 0 && (
                  <div className="flex items-center justify-center w-full text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Please fix the errors in the form
                  </div>
                )}
                <p className="text-xs text-muted-foreground text-center mt-2">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

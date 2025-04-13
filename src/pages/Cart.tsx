
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  ShoppingCart, 
  Trash, 
  Plus, 
  Minus, 
  RefreshCw, 
  ShoppingBag,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";
import { getCurrentUser } from "@/services/authService";

// Mock cart items
const initialCartItems = [
  {
    id: "1",
    productId: "1",
    name: "Organic Tomatoes",
    price: 4.99,
    quantity: 2,
    image: "/placeholder.svg",
    farm: "Green Valley Organics"
  },
  {
    id: "2",
    productId: "2",
    name: "Fresh Carrots",
    price: 3.49,
    quantity: 1,
    image: "/placeholder.svg",
    farm: "Sunshine Acres"
  },
  {
    id: "3",
    productId: "4",
    name: "Free-Range Eggs",
    price: 6.49,
    quantity: 1,
    image: "/placeholder.svg",
    farm: "Happy Hens"
  }
];

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 7.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax - discount;
  
  const handleQuantityChange = (id: string, change: number)  => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    }));
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };
  
  const handleClearCart = () => {
    setCartItems([]);
    setPromoCode("");
    setIsPromoApplied(false);
    setDiscount(0);
    toast.success("Cart cleared");
  };
  
  const handleApplyPromo = () => {
    if (!promoCode) return;
    
    setIsLoading(true);
    
    // Simulate API call to validate promo code
    setTimeout(() => {
      if (promoCode.toUpperCase() === "FRESH10") {
        const newDiscount = subtotal * 0.1; // 10% discount
        setDiscount(newDiscount);
        setIsPromoApplied(true);
        toast.success("Promo code applied successfully!");
      } else {
        toast.error("Invalid promo code");
        setDiscount(0);
        setIsPromoApplied(false);
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handleCheckout = () => {
    const user = getCurrentUser();
    
    if (!user) {
      toast.error("Please login to continue with checkout", {
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });
      return;
    }
    
    navigate("/checkout");
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <div className="max-w-2xl mx-auto text-center py-16 border rounded-lg">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Button size="lg" onClick={() => navigate("/marketplace")}>
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Items ({cartItems.length})</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleClearCart} className="text-muted-foreground">
                <Trash className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 py-4 border-b last:border-0 last:pb-0">
                  <div 
                    className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 cursor-pointer"
                    onClick={() => navigate(`/product/${item.productId}`)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div>
                        <h3 
                          className="font-semibold text-lg cursor-pointer hover:text-primary"
                          onClick={() => navigate(`/product/${item.productId}`)}
                        >
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.farm}</p>
                      </div>
                      <div className="text-right mt-2 sm:mt-0">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => handleQuantityChange(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-muted-foreground"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => navigate("/marketplace")}
                className="gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </Button>
              <Button
                onClick={() => {
                  setCartItems(initialCartItems);
                  toast.success("Cart updated");
                }}
                variant="outline"
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Update Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              {isPromoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({promoCode})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              {subtotal < 50 && (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex gap-2 items-start text-sm">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping!</p>
                  </div>
                </div>
              )}
              
              <div className="pt-2">
                <div className="text-sm font-medium mb-2">Have a promo code?</div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={isPromoApplied || isLoading}
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleApplyPromo}
                    disabled={isPromoApplied || !promoCode || isLoading}
                  >
                    {isLoading ? "Applying..." : "Apply"}
                  </Button>
                </div>
                {isPromoApplied && (
                  <p className="text-green-600 text-xs mt-1">
                    Promo code "{promoCode}" applied successfully!
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCheckout} className="w-full">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

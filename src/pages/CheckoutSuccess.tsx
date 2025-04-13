
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, ShoppingBag, ChevronRight, Calendar, Truck } from "lucide-react";

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    date: "",
    items: [],
    total: 0,
    estimatedDelivery: ""
  });
  
  useEffect(() => {
    // In a real app, you would get this from the checkout process or API
    // For demo purposes, we're generating mock data
    const mockOrderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const today = new Date();
    
    // Get cart items from localStorage
    const cartItems = localStorage.getItem('cart') 
      ? JSON.parse(localStorage.getItem('cart') || '[]')
      : [];
    
    // Calculate total
    const total = cartItems.reduce((sum: number, item: any) => 
      sum + (item.price * item.quantity), 0);
    
    // Estimate delivery (2-3 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + 2 + Math.floor(Math.random() * 2));
    
    setOrderDetails({
      orderId: mockOrderId,
      date: today.toLocaleDateString(),
      items: cartItems,
      total: total,
      estimatedDelivery: deliveryDate.toLocaleDateString()
    });
    
    // Clear cart after successful checkout
    localStorage.setItem('cart', JSON.stringify([]));
    window.dispatchEvent(new Event('storage'));
  }, []);

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center pb-6 border-b">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-600">Order Confirmed!</CardTitle>
            <p className="text-muted-foreground">
              Thank you for your order. Your order has been placed and is being processed.
            </p>
          </CardHeader>
          
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="bg-muted p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Order Number</div>
                <div className="font-bold">{orderDetails.orderId}</div>
              </div>
              <Separator orientation="vertical" className="hidden md:block h-10" />
              <div>
                <div className="text-sm text-muted-foreground">Date Placed</div>
                <div className="font-medium">{orderDetails.date}</div>
              </div>
              <Separator orientation="vertical" className="hidden md:block h-10" />
              <div>
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="font-bold">${orderDetails.total.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Order Summary</h3>
              
              {orderDetails.items.length > 0 ? (
                <div className="space-y-4">
                  {orderDetails.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md overflow-hidden bg-muted">
                        <img 
                          src={item.image || "/placeholder.svg"} 
                          alt={item.name}
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.farm}</div>
                      </div>
                      <div className="text-sm">
                        {item.quantity} × ${item.price.toFixed(2)}
                      </div>
                      <div className="font-medium">
                        ${(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Order details unavailable</p>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Delivery Information</h3>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Estimated Delivery</div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {orderDetails.estimatedDelivery}
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <div className="font-medium mb-1">Delivery Address</div>
                <div className="text-sm text-muted-foreground">
                  123 Example Street, Apt 4B<br />
                  Cityville, ST 12345<br />
                  United States
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold">What's Next?</h3>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">1</span>
                  </div>
                  <div>
                    <div className="font-medium">Order Processing</div>
                    <div className="text-sm text-muted-foreground">
                      Your order is being prepared by our farm partners.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">2</span>
                  </div>
                  <div>
                    <div className="font-medium">Shipment</div>
                    <div className="text-sm text-muted-foreground">
                      You'll receive a notification when your order ships.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">3</span>
                  </div>
                  <div>
                    <div className="font-medium">Delivery</div>
                    <div className="text-sm text-muted-foreground">
                      Your fresh produce will be delivered to your doorstep.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild className="flex-1">
                <Link to="/dashboard">
                  Track Order
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link to="/marketplace">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>
            
            <div className="text-center text-sm text-muted-foreground pt-4">
              <p>
                Questions about your order? <Link to="/support" className="text-primary underline">Contact Support</Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <Link to="/" className="flex items-center justify-center hover:text-foreground">
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

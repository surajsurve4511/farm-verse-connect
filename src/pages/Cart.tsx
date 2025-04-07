
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CreditCard, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample initial products
const sampleProducts = [
  {
    id: "1",
    name: "Organic Tomatoes",
    price: 4.99,
    image: "/placeholder.svg",
    farm: "Green Acres Farm"
  },
  {
    id: "2",
    name: "Fresh Lettuce",
    price: 3.49,
    image: "/placeholder.svg",
    farm: "Sunny Valley Organics"
  },
  {
    id: "3",
    name: "Grass-fed Beef",
    price: 15.99,
    image: "/placeholder.svg",
    farm: "Highland Ranch"
  },
  {
    id: "4",
    name: "Farm Fresh Eggs",
    price: 5.99,
    image: "/placeholder.svg",
    farm: "Happy Hen Farm"
  },
  {
    id: "5",
    name: "Organic Honey",
    price: 8.99,
    image: "/placeholder.svg",
    farm: "Beehive Gardens"
  },
];

// Cart item type
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  farm: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data:", e);
        // Initialize with some sample items if parsing fails
        initializeCartWithSamples();
      }
    } else {
      // Initialize with some sample items for demo
      initializeCartWithSamples();
    }
  }, []);

  // Save cart items to localStorage when they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Initialize cart with sample items for demo
  const initializeCartWithSamples = () => {
    const initialItems: CartItem[] = [
      {
        ...sampleProducts[0],
        quantity: 2
      },
      {
        ...sampleProducts[2],
        quantity: 1
      }
    ];
    setCartItems(initialItems);
    localStorage.setItem('cart', JSON.stringify(initialItems));
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const total = subtotal + shipping - discount;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
    
    toast({
      title: "Cart updated",
      description: "Your cart has been updated with the new quantity.",
    });
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const addToCart = (product: typeof sampleProducts[0]) => {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // Add new item if it doesn't exist
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setPromoCode("");
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const applyPromoCode = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "fresh10") {
        const discountAmount = subtotal * 0.1;
        setDiscount(discountAmount);
        toast({
          title: "Promo code applied!",
          description: "10% discount has been applied to your order.",
        });
      } else {
        toast({
          title: "Invalid promo code",
          description: "The promo code you entered is invalid or expired.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      navigate("/checkout");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/marketplace" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold mt-2">Your Cart</h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-16 w-16 rounded-md object-cover"
                              />
                              <div>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-muted-foreground">{item.farm}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="mx-2 w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recommended Products Section */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>You Might Also Like</CardTitle>
                  <CardDescription>
                    Products based on your current cart items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {sampleProducts.filter(p => !cartItems.some(item => item.id === p.id)).slice(0, 3).map(product => (
                      <Card key={product.id}>
                        <div className="aspect-square">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.farm}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-medium">${product.price.toFixed(2)}</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => addToCart(product)}
                            >
                              Add
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-8">
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
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <div className="text-sm font-medium mb-2">Promo Code</div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                      />
                      <Button 
                        variant="outline" 
                        onClick={applyPromoCode}
                        disabled={isLoading || !promoCode}
                      >
                        Apply
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Try "FRESH10" for 10% off
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isLoading || cartItems.length === 0}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    {isLoading ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="py-12">
            <CardContent className="flex flex-col items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Looks like you haven't added anything to your cart yet. Browse our marketplace to find fresh, local produce.
              </p>
              <Link to="/marketplace">
                <Button size="lg">
                  Browse Marketplace
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

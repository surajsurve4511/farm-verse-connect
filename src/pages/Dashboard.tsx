
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Package, ShoppingBag, Truck, Clock, BarChart3, Star } from "lucide-react";
import { getCurrentUser } from "@/services/authService";
import { toast } from "sonner";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for recent orders
  const recentOrders = [
    { id: "ORD-1234", date: "2025-04-10", status: "delivered", total: 35.99, items: 3 },
    { id: "ORD-1235", date: "2025-04-08", status: "shipped", total: 42.50, items: 5 },
    { id: "ORD-1236", date: "2025-04-05", status: "processing", total: 18.25, items: 2 },
  ];
  
  // Mock data for saved farms
  const savedFarms = [
    { id: "1", name: "Green Valley Organics", location: "Riverside, CA", products: 24 },
    { id: "2", name: "Sunshine Acres", location: "Boulder, CO", products: 18 },
    { id: "3", name: "Mountain View Farm", location: "Portland, OR", products: 32 },
  ];
  
  // Mock data for recommendations
  const recommendations = [
    { id: "1", name: "Organic Strawberries", price: 4.99, farm: "Green Valley Organics", rating: 4.8 },
    { id: "2", name: "Free-Range Eggs", price: 5.49, farm: "Sunshine Acres", rating: 4.9 },
    { id: "3", name: "Heirloom Tomatoes", price: 3.99, farm: "Mountain View Farm", rating: 4.7 },
    { id: "4", name: "Fresh Basil", price: 2.49, farm: "Green Valley Organics", rating: 4.6 },
  ];

  useEffect(() => {
    // Get current user info
    const userInfo = getCurrentUser();
    setUser(userInfo);
    setIsLoading(false);
    
    // Redirect to login if not authenticated
    if (!userInfo) {
      toast.error("Please login to access the dashboard");
      navigate("/login");
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name || "Customer"}</h1>
          <p className="text-muted-foreground">Here's what's happening with your account</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/marketplace")}>
            Browse Products
          </Button>
          <Button onClick={() => navigate("/orders")}>View Orders</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Total Orders</p>
                  <h3 className="text-3xl font-bold">12</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Pending Delivery</p>
                  <h3 className="text-3xl font-bold">2</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Truck className="h-6 w-6 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Saved Farms</p>
                  <h3 className="text-3xl font-bold">3</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Star className="h-6 w-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Total Spent</p>
                  <h3 className="text-3xl font-bold">$248.50</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest 3 orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-600' : 
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-600' : 
                          'bg-amber-100 text-amber-600'
                        }`}>
                          {order.status === 'delivered' ? (
                            <Package className="h-5 w-5" />
                          ) : order.status === 'shipped' ? (
                            <Truck className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.items} {order.items === 1 ? 'item' : 'items'} • {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <p className="text-sm capitalize text-muted-foreground">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate("/orders")}>
                  View all orders <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
                <CardDescription>Based on your previous orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.slice(0, 3).map((product) => (
                    <div key={product.id} className="flex items-center gap-3 border-b pb-4 last:border-0 last:pb-0">
                      <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                        <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{product.farm}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${product.price.toFixed(2)}</p>
                        <div className="flex items-center text-sm text-amber-500">
                          <Star className="h-3 w-3 fill-amber-500" />
                          <span className="ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate("/marketplace")}>
                  View all products <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View and track all your orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{order.id}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Ordered on {new Date(order.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm mt-1">
                            {order.items} {order.items === 1 ? 'item' : 'items'} • ${order.total.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/orders/${order.id}`)}>
                            View Details
                          </Button>
                          {order.status === 'delivered' && (
                            <Button size="sm">Write Review</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                    <p className="text-muted-foreground">When you place an order, it will appear here</p>
                    <Button className="mt-4" onClick={() => navigate("/marketplace")}>Start Shopping</Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center md:justify-end">
              <Button variant="outline" onClick={() => navigate("/orders")}>View All Orders</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Saved Farms</CardTitle>
              <CardDescription>
                Farms you follow and buy from regularly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedFarms.map((farm) => (
                  <Card key={farm.id} className="overflow-hidden">
                    <div className="h-32 bg-muted flex items-center justify-center">
                      <img 
                        src={`/placeholder.svg`} 
                        alt={farm.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{farm.name}</h3>
                      <p className="text-sm text-muted-foreground">{farm.location}</p>
                      <p className="text-sm mt-2">{farm.products} products available</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-4"
                        onClick={() => navigate(`/farm/${farm.id}`)}
                      >
                        Visit Farm
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center md:justify-end">
              <Button variant="outline" onClick={() => navigate("/farms")}>Explore All Farms</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

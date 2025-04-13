
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, BarChart3, ShoppingBag, Truck, Clock, Package, AlertCircle, ChevronUp, ChevronDown, DollarSign, Users } from "lucide-react";
import { getCurrentUser } from "@/services/authService";
import { toast } from "sonner";

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for recent orders
  const recentOrders = [
    { id: "ORD-1234", customer: "John Doe", date: "2025-04-10", status: "pending", total: 35.99, items: 3 },
    { id: "ORD-1235", customer: "Jane Smith", date: "2025-04-08", status: "shipped", total: 42.50, items: 2 },
    { id: "ORD-1236", customer: "Robert Johnson", date: "2025-04-05", status: "delivered", total: 18.25, items: 1 },
  ];
  
  // Mock data for products
  const products = [
    { id: "1", name: "Organic Tomatoes", price: 4.99, stock: 45, category: "Vegetables", organic: true },
    { id: "2", name: "Fresh Carrots", price: 3.49, stock: 32, category: "Vegetables", organic: true },
    { id: "3", name: "Strawberries", price: 5.99, stock: 28, category: "Fruits", organic: false },
    { id: "4", name: "Free-Range Eggs", price: 6.49, stock: 24, category: "Eggs", organic: true },
    { id: "5", name: "Raw Honey", price: 8.99, stock: 15, category: "Specialty", organic: true },
  ];
  
  // Mock data for inventory alerts
  const inventoryAlerts = [
    { id: "1", product: "Raw Honey", stock: 15, threshold: 20 },
    { id: "2", product: "Organic Apples", stock: 8, threshold: 15 },
  ];

  useEffect(() => {
    // Get current user info
    const userInfo = getCurrentUser();
    setUser(userInfo);
    setIsLoading(false);
    
    // Redirect to login if not authenticated or not a farmer
    if (!userInfo) {
      toast.error("Please login to access the dashboard");
      navigate("/login");
    } else if (userInfo.role !== 'farmer' && userInfo.role !== 'admin') {
      toast.error("You don't have permission to access this page");
      navigate("/dashboard");
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
          <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Manage your farm and products</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate("/farmer/price-advisor")}>
            Price Advisor
          </Button>
          <Button onClick={() => navigate("/farmer/products/new")}>Add New Product</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Today's Sales</p>
                  <h3 className="text-3xl font-bold">$256.50</h3>
                  <div className="flex items-center text-sm text-green-500 mt-1">
                    <ChevronUp className="h-4 w-4" />
                    <span>12% from yesterday</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Pending Orders</p>
                  <h3 className="text-3xl font-bold">4</h3>
                  <div className="flex items-center text-sm text-amber-500 mt-1">
                    <ChevronUp className="h-4 w-4" />
                    <span>2 new today</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Total Products</p>
                  <h3 className="text-3xl font-bold">{products.length}</h3>
                  <div className="flex items-center text-sm text-green-500 mt-1">
                    <ChevronUp className="h-4 w-4" />
                    <span>3 new this week</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-muted-foreground">Customers</p>
                  <h3 className="text-3xl font-bold">124</h3>
                  <div className="flex items-center text-sm text-green-500 mt-1">
                    <ChevronUp className="h-4 w-4" />
                    <span>8 new this week</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest orders requiring attention</CardDescription>
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
                            {order.customer} • {new Date(order.date).toLocaleDateString()}
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
                <CardTitle>Inventory Alerts</CardTitle>
                <CardDescription>Products running low on stock</CardDescription>
              </CardHeader>
              <CardContent>
                {inventoryAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {inventoryAlerts.map((alert) => (
                      <div key={alert.id} className="border rounded-lg p-4 bg-amber-50">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">{alert.product}</h4>
                            <p className="text-sm text-muted-foreground">
                              Current stock: <span className="font-medium text-amber-600">{alert.stock}</span> (below threshold of {alert.threshold})
                            </p>
                            <Button size="sm" className="mt-2" onClick={() => navigate(`/farmer/products/edit/${alert.id}`)}>
                              Update Stock
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">View All Inventory</Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="rounded-full h-12 w-12 bg-green-100 flex items-center justify-center mx-auto">
                      <ShoppingBag className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">All stock levels are good</h3>
                    <p className="text-sm text-muted-foreground">You'll be notified when inventory runs low</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Your sales performance over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-muted rounded-md">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="mt-4 text-muted-foreground">Sales chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Your Products</CardTitle>
                <CardDescription>
                  Manage your farm's product catalog
                </CardDescription>
              </div>
              <Button onClick={() => navigate("/farmer/products/new")}>Add New Product</Button>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-3 text-left font-medium">Product</th>
                        <th className="px-4 py-3 text-left font-medium">Category</th>
                        <th className="px-4 py-3 text-right font-medium">Price</th>
                        <th className="px-4 py-3 text-right font-medium">Stock</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                                <Package className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {product.organic ? 'Organic' : 'Conventional'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">{product.category}</td>
                          <td className="px-4 py-3 text-right">${product.price.toFixed(2)}</td>
                          <td className="px-4 py-3 text-right">{product.stock}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.stock > 20 ? 'bg-green-100 text-green-800' : 
                              product.stock > 10 ? 'bg-amber-100 text-amber-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.stock > 20 ? 'In Stock' : 
                               product.stock > 10 ? 'Low Stock' : 
                               'Critical Stock'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate(`/farmer/products/edit/${product.id}`)}
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>
                Track and fulfill orders for your products
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
                            From {order.customer} • {new Date(order.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm mt-1">
                            {order.items} {order.items === 1 ? 'item' : 'items'} • ${order.total.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => navigate(`/orders/${order.id}`)}>
                            View Details
                          </Button>
                          {order.status === 'pending' && (
                            <Button size="sm">Process Order</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                    <p className="text-muted-foreground">When you receive orders, they will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center md:justify-end">
              <Button variant="outline" onClick={() => navigate("/orders")}>View All Orders</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

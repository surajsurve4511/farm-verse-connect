
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  User, 
  ShoppingBag, 
  Store, 
  ShoppingCart,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Users,
  Package,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  BarChart3,
  PieChart
} from "lucide-react";
import { toast } from "sonner";
import { getCurrentUser } from "@/services/authService";

// Mock data for pending approvals
const pendingApprovals = [
  { id: "1", name: "Mountain View Farm", type: "Farmer Registration", date: "2025-04-10" },
  { id: "2", name: "Sunrise Valley Co-op", type: "Farmer Registration", date: "2025-04-09" },
  { id: "3", name: "Organic Greens", type: "Product Approval", date: "2025-04-08" },
];

// Mock data for users
const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "customer", status: "active", joined: "2025-01-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "farmer", status: "active", joined: "2025-02-10" },
  { id: "3", name: "Robert Johnson", email: "robert@example.com", role: "customer", status: "active", joined: "2025-02-22" },
  { id: "4", name: "Sarah Brown", email: "sarah@example.com", role: "farmer", status: "pending", joined: "2025-04-05" },
  { id: "5", name: "Admin User", email: "admin@example.com", role: "admin", status: "active", joined: "2025-01-01" },
];

// Mock data for products
const products = [
  { id: "1", name: "Organic Tomatoes", price: 4.99, farm: "Green Valley Organics", category: "Vegetables", status: "active" },
  { id: "2", name: "Fresh Carrots", price: 3.49, farm: "Sunshine Acres", category: "Vegetables", status: "active" },
  { id: "3", name: "Strawberries", price: 5.99, farm: "Mountain View Farm", category: "Fruits", status: "pending" },
  { id: "4", name: "Free-Range Eggs", price: 6.49, farm: "Happy Hens", category: "Eggs", status: "active" },
  { id: "5", name: "Raw Honey", price: 8.99, farm: "Beekeepers Co-op", category: "Specialty", status: "active" },
];

// Mock data for orders
const orders = [
  { id: "ORD-1234", customer: "John Doe", date: "2025-04-10", status: "delivered", total: 35.99 },
  { id: "ORD-1235", customer: "Jane Smith", date: "2025-04-08", status: "shipped", total: 42.50 },
  { id: "ORD-1236", customer: "Robert Johnson", date: "2025-04-05", status: "processing", total: 18.25 },
  { id: "ORD-1237", customer: "Sarah Brown", date: "2025-04-02", status: "delivered", total: 29.75 },
  { id: "ORD-1238", customer: "Michael Wilson", date: "2025-03-30", status: "delivered", total: 54.20 },
];

// Mock data for farms
const farms = [
  { id: "1", name: "Green Valley Organics", owner: "Jane Smith", location: "Riverside, CA", products: 24, status: "active" },
  { id: "2", name: "Sunshine Acres", owner: "David Miller", location: "Boulder, CO", products: 18, status: "active" },
  { id: "3", name: "Mountain View Farm", owner: "Sarah Brown", location: "Portland, OR", products: 32, status: "pending" },
  { id: "4", name: "Happy Hens", owner: "Mark Johnson", location: "Austin, TX", products: 12, status: "active" },
  { id: "5", name: "Beekeepers Co-op", owner: "Lisa Chen", location: "Burlington, VT", products: 8, status: "active" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Get current user info
    const userInfo = getCurrentUser();
    setUser(userInfo);
    setIsLoading(false);
    
    // Redirect to login if not authenticated or not an admin
    if (!userInfo) {
      toast.error("Please login to access the dashboard");
      navigate("/login");
    } else if (userInfo.role !== 'admin') {
      toast.error("You don't have permission to access this page");
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleApprove = (id: string, type: string) => {
    toast.success(`${type} approved successfully`);
    // In a real app, this would update the backend
  };

  const handleReject = (id: string, type: string) => {
    toast.success(`${type} rejected`);
    // In a real app, this would update the backend
  };

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
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your platform and monitor its performance
          </p>
        </div>
        
        <div className="flex space-x-4">
          <Button variant="outline">
            Export Reports
          </Button>
          <Button>
            Add New User
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Total Users</p>
              <h3 className="text-3xl font-bold">1,248</h3>
              <div className="flex items-center text-green-500 text-sm mt-1">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span>12% from last month</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Total Products</p>
              <h3 className="text-3xl font-bold">3,426</h3>
              <div className="flex items-center text-green-500 text-sm mt-1">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span>8% from last month</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Total Farms</p>
              <h3 className="text-3xl font-bold">254</h3>
              <div className="flex items-center text-green-500 text-sm mt-1">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span>5% from last month</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Store className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Revenue</p>
              <h3 className="text-3xl font-bold">$128.4k</h3>
              <div className="flex items-center text-green-500 text-sm mt-1">
                <ChevronUp className="h-4 w-4 mr-1" />
                <span>18% from last month</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="users">
            <User className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="products">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="farms">
            <Store className="h-4 w-4 mr-2" />
            Farms
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted rounded-md">
                  <BarChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Sales Chart Placeholder</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((item) => (
                    <div key={item.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.type}</p>
                          <p className="text-xs text-muted-foreground mt-1">Submitted: {new Date(item.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReject(item.id, item.type)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleApprove(item.id, item.type)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 4).map((order) => (
                    <div key={order.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">Customer: {order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setActiveTab("orders")}>
                  View All Orders
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-3 border-b pb-2">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500"></div>
                    <div>
                      <p className="font-medium">Warning: Low stock for 3 products</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 border-b pb-2">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium">Info: System update scheduled</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 border-b pb-2">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-amber-500"></div>
                    <div>
                      <p className="font-medium">Warning: 5 new farmer registrations pending</p>
                      <p className="text-sm text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="h-2 w-2 mt-1.5 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium">Info: Daily backup completed</p>
                      <p className="text-sm text-muted-foreground">8 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Users Management</CardTitle>
                <CardDescription>Manage all platform users</CardDescription>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search users..." 
                    className="pl-8 w-full md:w-[300px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>Add User</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-3 text-left font-medium">Name</th>
                        <th className="px-4 py-3 text-left font-medium">Email</th>
                        <th className="px-4 py-3 text-left font-medium">Role</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-left font-medium">Joined On</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="font-medium">{user.name}</div>
                          </td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">
                            <Badge className={
                              user.role === 'admin' ? 'bg-purple-100 text-purple-800 hover:bg-purple-100' : 
                              user.role === 'farmer' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                              'bg-blue-100 text-blue-800 hover:bg-blue-100'
                            }>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge className={
                              user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                              'bg-amber-100 text-amber-800 hover:bg-amber-100'
                            }>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            {new Date(user.joined).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              {user.status === 'pending' && (
                                <Button size="sm">Approve</Button>
                              )}
                            </div>
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
        
        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Products Management</CardTitle>
                <CardDescription>Manage all platform products</CardDescription>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search products..." 
                    className="pl-8 w-full md:w-[300px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-3 text-left font-medium">Name</th>
                        <th className="px-4 py-3 text-left font-medium">Category</th>
                        <th className="px-4 py-3 text-right font-medium">Price</th>
                        <th className="px-4 py-3 text-left font-medium">Farm</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="font-medium">{product.name}</div>
                          </td>
                          <td className="px-4 py-3">{product.category}</td>
                          <td className="px-4 py-3 text-right">${product.price.toFixed(2)}</td>
                          <td className="px-4 py-3">{product.farm}</td>
                          <td className="px-4 py-3">
                            <Badge className={
                              product.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                              'bg-amber-100 text-amber-800 hover:bg-amber-100'
                            }>
                              {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                              {product.status === 'pending' && (
                                <Button size="sm">Approve</Button>
                              )}
                            </div>
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
        
        <TabsContent value="farms" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Farms Management</CardTitle>
                <CardDescription>Manage all platform farms</CardDescription>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search farms..." 
                    className="pl-8 w-full md:w-[300px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-3 text-left font-medium">Farm Name</th>
                        <th className="px-4 py-3 text-left font-medium">Owner</th>
                        <th className="px-4 py-3 text-left font-medium">Location</th>
                        <th className="px-4 py-3 text-right font-medium">Products</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {farms.map((farm) => (
                        <tr key={farm.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="font-medium">{farm.name}</div>
                          </td>
                          <td className="px-4 py-3">{farm.owner}</td>
                          <td className="px-4 py-3">{farm.location}</td>
                          <td className="px-4 py-3 text-right">{farm.products}</td>
                          <td className="px-4 py-3">
                            <Badge className={
                              farm.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                              'bg-amber-100 text-amber-800 hover:bg-amber-100'
                            }>
                              {farm.status.charAt(0).toUpperCase() + farm.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                              {farm.status === 'pending' && (
                                <Button size="sm">Approve</Button>
                              )}
                            </div>
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
        
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Orders Management</CardTitle>
                <CardDescription>Track and manage all orders</CardDescription>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search orders..." 
                    className="pl-8 w-full md:w-[300px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-3 text-left font-medium">Order ID</th>
                        <th className="px-4 py-3 text-left font-medium">Customer</th>
                        <th className="px-4 py-3 text-left font-medium">Date</th>
                        <th className="px-4 py-3 text-right font-medium">Total</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div className="font-medium">{order.id}</div>
                          </td>
                          <td className="px-4 py-3">{order.customer}</td>
                          <td className="px-4 py-3">{new Date(order.date).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-right">${order.total.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <Badge className={
                              order.status === 'delivered' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                              'bg-amber-100 text-amber-800 hover:bg-amber-100'
                            }>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="sm">
                              View Details
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
      </Tabs>
    </div>
  );
}

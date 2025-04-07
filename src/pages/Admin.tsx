
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Users, Truck, ShoppingBag, AlertCircle, BarChart3 } from "lucide-react";

// Sample farmers and customers data for admin view
const sampleFarmers = [
  { id: "f1", name: "Green Acres Farm", email: "farmer@example.com", products: 24, revenue: 15231.89, status: "active" },
  { id: "f2", name: "Highland Ranch", email: "highland@farms.com", products: 18, revenue: 9450.50, status: "active" },
  { id: "f3", name: "Sunny Valley Organics", email: "info@sunnyvalley.org", products: 12, revenue: 7820.25, status: "pending" },
];

const sampleCustomers = [
  { id: "c1", name: "John Smith", email: "customer@example.com", orders: 8, spent: 342.50, status: "active" },
  { id: "c2", name: "Emily Johnson", email: "emily@example.com", orders: 12, spent: 523.75, status: "active" },
  { id: "c3", name: "Michael Brown", email: "michael@example.com", orders: 5, spent: 189.99, status: "inactive" },
];

// Sample orders for admin view
const sampleOrders = [
  { id: "ord-1001", customer: "John Smith", items: 3, total: 89.97, status: "completed", date: "2025-04-05" },
  { id: "ord-1002", customer: "Emily Johnson", items: 5, total: 145.50, status: "processing", date: "2025-04-06" },
  { id: "ord-1003", customer: "Michael Brown", items: 2, total: 59.98, status: "cancelled", date: "2025-04-04" },
  { id: "ord-1004", customer: "Sarah Wilson", items: 4, total: 112.75, status: "shipped", date: "2025-04-03" },
  { id: "ord-1005", customer: "David Lee", items: 1, total: 29.99, status: "pending", date: "2025-04-07" },
];

// Helper function to display order status with a colored badge
const getOrderStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return <Badge className="bg-green-500">Completed</Badge>;
    case "processing":
      return <Badge className="bg-blue-500">Processing</Badge>;
    case "pending":
      return <Badge className="bg-yellow-500">Pending</Badge>;
    case "shipped":
      return <Badge className="bg-purple-500">Shipped</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is admin
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    
    if (role !== "admin") {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [navigate, toast]);

  // If not admin, don't render the page
  if (userRole !== "admin") {
    return null;
  }

  const handleApproveUser = (id: string) => {
    toast({
      title: "User Approved",
      description: `User ${id} has been approved.`,
    });
  };

  const handleSuspendUser = (id: string) => {
    toast({
      title: "User Suspended",
      description: `User ${id} has been suspended.`,
    });
  };

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage users, monitor platform activity, and ensure smooth operations.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Farmers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              +5 new registrations this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">158</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              +8 since yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Platform Revenue
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,240.89</div>
            <p className="text-xs text-muted-foreground">
              +15.3% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Alert
        title="System Notification"
        description="New farmer verification requests are pending approval. Please review them in the Farmers tab."
        variant="info"
      />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="farmers">Farmers</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Platform Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Recent platform activities and notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-medium">New farmer registration</p>
                  <p className="text-sm text-muted-foreground">Organic Fields Farm just registered and needs approval.</p>
                  <p className="text-xs text-muted-foreground">10 minutes ago</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <p className="font-medium">Order dispute reported</p>
                  <p className="text-sm text-muted-foreground">Customer reported issue with order #ORD-1042. Requires review.</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="font-medium">Payment processed</p>
                  <p className="text-sm text-muted-foreground">Monthly commission payments processed for 28 farmers.</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <p className="font-medium">System update scheduled</p>
                  <p className="text-sm text-muted-foreground">Platform maintenance scheduled for April 10, 2025 at 2:00 AM.</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Latest Orders</CardTitle>
                <CardDescription>
                  Most recent orders placed on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleOrders.slice(0, 5).map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm">View All Orders</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>New Users</CardTitle>
                <CardDescription>
                  Recent user registrations pending verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Organic Fields Farm</p>
                      <p className="text-sm text-muted-foreground">Farmer - organicfields@example.com</p>
                    </div>
                    <Button size="sm">Verify</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Robert Johnson</p>
                      <p className="text-sm text-muted-foreground">Customer - robert@example.com</p>
                    </div>
                    <Button size="sm">Verify</Button>
                  </div>
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Sunrise Dairy</p>
                      <p className="text-sm text-muted-foreground">Farmer - info@sunrisedairy.com</p>
                    </div>
                    <Button size="sm">Verify</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="farmers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Farmer Management</CardTitle>
                <CardDescription>
                  View and manage all farmer accounts
                </CardDescription>
              </div>
              <div className="w-full max-w-sm">
                <Input 
                  type="search" 
                  placeholder="Search farmers..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleFarmers.map((farmer) => (
                    <TableRow key={farmer.id}>
                      <TableCell className="font-medium">{farmer.name}</TableCell>
                      <TableCell>{farmer.email}</TableCell>
                      <TableCell>{farmer.products}</TableCell>
                      <TableCell>${farmer.revenue.toFixed(2)}</TableCell>
                      <TableCell>
                        {farmer.status === "active" ? (
                          <Badge className="bg-green-500">Active</Badge>
                        ) : (
                          <Badge className="bg-yellow-500">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {farmer.status === "pending" ? (
                            <Button 
                              size="sm" 
                              onClick={() => handleApproveUser(farmer.id)}
                            >
                              Approve
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleSuspendUser(farmer.id)}
                            >
                              Suspend
                            </Button>
                          )}
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>
                  View and manage customer accounts
                </CardDescription>
              </div>
              <div className="w-full max-w-sm">
                <Input 
                  type="search" 
                  placeholder="Search customers..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>${customer.spent.toFixed(2)}</TableCell>
                      <TableCell>
                        {customer.status === "active" ? (
                          <Badge className="bg-green-500">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Inactive</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {customer.status === "inactive" ? (
                            <Button 
                              size="sm" 
                              onClick={() => handleApproveUser(customer.id)}
                            >
                              Activate
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleSuspendUser(customer.id)}
                            >
                              Suspend
                            </Button>
                          )}
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>
                  Monitor and manage all orders on the platform
                </CardDescription>
              </div>
              <div className="w-full max-w-sm">
                <Input 
                  type="search" 
                  placeholder="Search orders..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline">Details</Button>
                          <Button size="sm" variant="outline">Update</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
              <CardDescription>
                Configure platform-wide settings and policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Commission Settings</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span>Default commission rate</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span>High-volume discount rate</span>
                      <span className="font-medium">8%</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span>New farmer introductory rate</span>
                      <span className="font-medium">5%</span>
                    </div>
                  </div>
                  <Button className="mt-4" variant="outline" size="sm">
                    Adjust Commission Rates
                  </Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">User Verification</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Configure how new users are verified on the platform
                  </p>
                  <div className="flex items-center mt-4 space-x-4">
                    <Button variant="outline" size="sm">
                      Manual Verification
                    </Button>
                    <Button size="sm">
                      Automatic Verification
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium">System Maintenance</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Schedule system maintenance and updates
                  </p>
                  <Button className="mt-4" variant="outline" size="sm">
                    Schedule Maintenance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Simple Alert component
function Alert({ 
  title, 
  description, 
  variant = "default" 
}: { 
  title: string; 
  description: string; 
  variant?: "default" | "destructive" | "info"; 
}) {
  let bgColor = "bg-background";
  let icon = <AlertCircle className="h-4 w-4" />;
  
  if (variant === "destructive") {
    bgColor = "bg-red-50 text-red-900 border-red-200";
    icon = <AlertCircle className="h-4 w-4 text-red-900" />;
  } else if (variant === "info") {
    bgColor = "bg-blue-50 text-blue-900 border-blue-200";
    icon = <ShieldCheck className="h-4 w-4 text-blue-900" />;
  }
  
  return (
    <div className={`flex items-center gap-4 rounded-lg border p-4 ${bgColor}`}>
      {icon}
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-sm opacity-90">{description}</div>
      </div>
    </div>
  );
}

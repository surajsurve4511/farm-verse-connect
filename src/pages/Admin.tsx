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
import { ShieldCheck, Users, Truck, ShoppingBag, AlertCircle, BarChart3, Database, Settings } from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  
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

    // In a real app, you would fetch these from the API
    setPendingUsers([
      { id: "1", name: "John Doe", email: "john@example.com", role: "farmer", joinDate: "2025-05-10" },
      { id: "2", name: "Jane Smith", email: "jane@example.com", role: "customer", joinDate: "2025-05-12" }
    ]);
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
    // In a real app, you would call an API to approve the user
    setPendingUsers(pendingUsers.filter(user => user.id !== id));
  };

  const handleSuspendUser = (id: string) => {
    toast({
      title: "User Suspended",
      description: `User ${id} has been suspended.`,
    });
    // In a real app, you would call an API to suspend the user
    setPendingUsers(pendingUsers.filter(user => user.id !== id));
  };

  const handleCreateTestData = () => {
    toast({
      title: "Test Data Created",
      description: "Test data has been successfully created in the system.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data export is now being processed. You will be notified when it's ready to download.",
    });
  };

  const handleSystemConfiguration = () => {
    toast({
      title: "System Configuration",
      description: "System configuration panel will be available in the next release.",
    });
  };

  return (
    <div className="flex flex-col space-y-6 p-6 bg-gradient-to-br from-background to-background/90">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gradient">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage users, monitor platform activity, and ensure smooth operations.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card border-0 hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Farmers
            </CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Ready to onboard new farmers
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-0 hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Ready for customer acquisition
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-0 hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <Truck className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              No pending orders
            </p>
          </CardContent>
        </Card>
        <Card className="glass-card border-0 hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Platform Revenue
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              Ready to start tracking revenue
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Alert
        title="System Notification"
        description="Welcome to the SmartFarm Direct admin dashboard. This system is ready for real-world implementation."
        variant="info"
      />
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-background/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="farmers">Farmers</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="settings">Platform Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current platform status and recent activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-500/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-green-500" />
                    <div>
                      <h3 className="font-medium">Database Connected</h3>
                      <p className="text-sm text-muted-foreground">System is ready to store data</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-500/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">System Configuration</h3>
                      <p className="text-sm text-muted-foreground">All systems are properly configured</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-500">Ready</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-500/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-yellow-500" />
                    <div>
                      <h3 className="font-medium">Security Status</h3>
                      <p className="text-sm text-muted-foreground">Authentication system active</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500">Secure</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>Implementation Guide</CardTitle>
                <CardDescription>
                  Steps to complete the platform implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 p-3 border border-border rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">1</div>
                    <div>
                      <h3 className="font-medium">Setup Database Connection</h3>
                      <p className="text-sm text-muted-foreground">Configure your SQL database connection</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-3 border border-border rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">2</div>
                    <div>
                      <h3 className="font-medium">Create Database Schema</h3>
                      <p className="text-sm text-muted-foreground">Run the database migration scripts</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-3 border border-border rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">3</div>
                    <div>
                      <h3 className="font-medium">Configure API Endpoints</h3>
                      <p className="text-sm text-muted-foreground">Set up the backend service connections</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 p-3 border border-border rounded-lg">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">4</div>
                    <div>
                      <h3 className="font-medium">Deploy Application</h3>
                      <p className="text-sm text-muted-foreground">Deploy your application to production</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle>System Resources</CardTitle>
                <CardDescription>
                  Current resource utilization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-muted-foreground">15%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm text-muted-foreground">25%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Storage Usage</span>
                      <span className="text-sm text-muted-foreground">5%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Bandwidth</span>
                      <span className="text-sm text-muted-foreground">8%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="farmers" className="space-y-4">
          <Card className="glass-card border-0">
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
                  className="bg-background/50"
                />
              </div>
            </CardHeader>
            <CardContent>
              {pendingUsers.filter(user => user.role === "farmer").length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingUsers
                      .filter(user => user.role === "farmer")
                      .map(user => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" className="mr-2" onClick={() => handleApproveUser(user.id)}>
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleSuspendUser(user.id)}>
                              Reject
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <ShoppingBag className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No farmers registered yet</h3>
                  <p className="text-muted-foreground mb-4">
                    When farmers register on the platform, they will appear here.
                  </p>
                  <Button variant="outline" onClick={handleCreateTestData}>Create Test Data</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers" className="space-y-4">
          <Card className="glass-card border-0">
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
                  className="bg-background/50"
                />
              </div>
            </CardHeader>
            <CardContent>
              {pendingUsers.filter(user => user.role === "customer").length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingUsers
                      .filter(user => user.role === "customer")
                      .map(user => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" className="mr-2" onClick={() => handleApproveUser(user.id)}>
                              Approve
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleSuspendUser(user.id)}>
                              Reject
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-10">
                  <Users className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No customers registered yet</h3>
                  <p className="text-muted-foreground mb-4">
                    When customers register on the platform, they will appear here.
                  </p>
                  <Button variant="outline" onClick={handleCreateTestData}>Create Test Data</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <Card className="glass-card border-0">
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
                  className="bg-background/50"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <ShoppingBag className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No orders placed yet</h3>
                <p className="text-muted-foreground mb-4">
                  When orders are placed on the platform, they will appear here.
                </p>
                <Button variant="outline" onClick={handleCreateTestData}>Create Test Order</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card className="glass-card border-0">
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
                    <div className="flex justify-between items-center border-b border-border pb-2">
                      <span>Default commission rate</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border pb-2">
                      <span>High-volume discount rate</span>
                      <span className="font-medium">8%</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border pb-2">
                      <span>New farmer introductory rate</span>
                      <span className="font-medium">5%</span>
                    </div>
                  </div>
                  <Button className="mt-4" variant="outline" size="sm" onClick={handleSystemConfiguration}>
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
                    <Button variant="outline" size="sm" onClick={handleSystemConfiguration}>
                      Manual Verification
                    </Button>
                    <Button size="sm" onClick={handleSystemConfiguration}>
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
                  <Button className="mt-4" variant="outline" size="sm" onClick={handleSystemConfiguration}>
                    Schedule Maintenance
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Data Management</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Export or backup system data
                  </p>
                  <Button className="mt-4" variant="outline" size="sm" onClick={handleExportData}>
                    Export Data
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
  let bgColor = "bg-card/50 backdrop-blur-md";
  let icon = <AlertCircle className="h-4 w-4" />;
  
  if (variant === "destructive") {
    bgColor = "bg-red-500/10 text-red-600";
    icon = <AlertCircle className="h-4 w-4 text-red-600" />;
  } else if (variant === "info") {
    bgColor = "bg-blue-500/10 text-blue-600";
    icon = <ShieldCheck className="h-4 w-4 text-blue-600" />;
  }
  
  return (
    <div className={`flex items-center gap-4 rounded-lg border border-white/10 p-4 ${bgColor}`}>
      {icon}
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <div className="text-sm opacity-90">{description}</div>
      </div>
    </div>
  );
}


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  User, 
  ShoppingBag, 
  Store, 
  ShoppingCart,
  ChevronDown,
  LayoutDashboard
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
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
              <p className="text-sm text-green-500">+12% from last month</p>
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
              <p className="text-sm text-green-500">+8% from last month</p>
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
              <p className="text-sm text-green-500">+5% from last month</p>
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
              <p className="text-sm text-green-500">+18% from last month</p>
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
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Mountain View Farm</h3>
                        <p className="text-sm text-muted-foreground">Farmer Registration</p>
                      </div>
                      <Button size="sm">Review</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Sunrise Valley Co-op</h3>
                        <p className="text-sm text-muted-foreground">Farmer Registration</p>
                      </div>
                      <Button size="sm">Review</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Organic Greens</h3>
                        <p className="text-sm text-muted-foreground">Product Approval</p>
                      </div>
                      <Button size="sm">Review</Button>
                    </div>
                  </div>
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
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">Order #{1000 + i}</p>
                        <p className="text-sm text-muted-foreground">Customer: John Doe</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(50 + i * 12).toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Today</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>System Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex space-x-3 border-b pb-2 last:border-0">
                      <div className={`h-2 w-2 mt-1.5 rounded-full ${i % 2 === 0 ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                      <div>
                        <p className="font-medium">
                          {i % 2 === 0 ? 'Warning: Low stock for 3 products' : 'Info: System update scheduled'}
                        </p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Users Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <p>Users management interface will be implemented here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Products Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <p>Products management interface will be implemented here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="farms" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Farms Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <p>Farms management interface will be implemented here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Orders Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <p>Orders management interface will be implemented here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

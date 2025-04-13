
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, ShoppingBag, Package, Settings, PieChart, LineChart, Plus } from "lucide-react";

export default function FarmerDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your farm products and track sales
          </p>
        </div>
        
        <div className="flex space-x-4">
          <Button variant="outline">
            View Farm Profile
          </Button>
          <Button asChild>
            <Link to="/farmer/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Total Sales</p>
              <h3 className="text-3xl font-bold">$4,280</h3>
              <p className="text-sm text-green-500">+12% from last month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Active Products</p>
              <h3 className="text-3xl font-bold">24</h3>
              <p className="text-sm text-green-500">+3 new this month</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Pending Orders</p>
              <h3 className="text-3xl font-bold">12</h3>
              <p className="text-sm text-amber-500">4 need attention</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Inventory Value</p>
              <h3 className="text-3xl font-bold">$12,540</h3>
              <p className="text-sm text-red-500">3 low stock items</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <Settings className="h-6 w-6 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="analytics">
            <PieChart className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="products">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-muted rounded-md">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Sales Chart Placeholder</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Organic Tomatoes", "Fresh Carrots", "Farm Eggs", "Lettuce Bundle"].map((product, i) => (
                    <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-muted rounded-md"></div>
                        <div>
                          <p className="font-medium">{product}</p>
                          <p className="text-sm text-muted-foreground">{28 - i * 4} sales</p>
                        </div>
                      </div>
                      <div className="font-medium">${(9.99 - i * 1.5).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-muted rounded-md">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Categories Chart Placeholder</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "New order received - Order #1042",
                    "Price Advisor suggestion for Organic Apples",
                    "Inventory alert: Tomatoes running low",
                    "Payment received - $128.50"
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start gap-3 border-b pb-2 last:border-0">
                      <div className="h-2 w-2 rounded-full bg-primary mt-1.5"></div>
                      <div>
                        <p className="font-medium">{activity}</p>
                        <p className="text-sm text-muted-foreground">{i + 1} hour{i !== 0 ? 's' : ''} ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <CardTitle>Your Products</CardTitle>
              <Button asChild>
                <Link to="/farmer/products/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-muted rounded-md"></div>
                      <div>
                        <p className="font-medium">Organic Tomatoes</p>
                        <p className="text-sm text-muted-foreground">Vegetables • $4.99/kg</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/farmer/products/edit/1">Edit</Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-muted rounded-md"></div>
                      <div>
                        <p className="font-medium">Fresh Carrots</p>
                        <p className="text-sm text-muted-foreground">Vegetables • $3.49/bundle</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/farmer/products/edit/2">Edit</Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-muted rounded-md"></div>
                      <div>
                        <p className="font-medium">Farm Eggs</p>
                        <p className="text-sm text-muted-foreground">Eggs • $6.99/dozen</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/farmer/products/edit/3">Edit</Link>
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-muted rounded-md"></div>
                      <div>
                        <p className="font-medium">Lettuce Bundle</p>
                        <p className="text-sm text-muted-foreground">Vegetables • $3.99/bundle</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/farmer/products/edit/4">Edit</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline">View All Products</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #1042</p>
                      <p className="text-sm text-muted-foreground">Jane Smith • 2 hours ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$32.50</p>
                      <p className="text-sm bg-amber-100 text-amber-800 rounded-full px-2 py-0.5">Pending</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #1041</p>
                      <p className="text-sm text-muted-foreground">John Doe • 5 hours ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$48.75</p>
                      <p className="text-sm bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">Processing</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #1040</p>
                      <p className="text-sm text-muted-foreground">Sarah Johnson • Yesterday</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$24.99</p>
                      <p className="text-sm bg-green-100 text-green-800 rounded-full px-2 py-0.5">Shipped</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #1039</p>
                      <p className="text-sm text-muted-foreground">Michael Williams • Yesterday</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$65.25</p>
                      <p className="text-sm bg-green-100 text-green-800 rounded-full px-2 py-0.5">Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline">View All Orders</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Price Advisor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our AI-powered price advisor suggests optimal pricing based on market data.
            </p>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Organic Tomatoes</span>
                  <span className="font-medium">Current: $4.99/kg</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Suggested: $5.49/kg</span>
                  <span className="text-green-600">+10% potential revenue</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Fresh Carrots</span>
                  <span className="font-medium">Current: $3.49/bundle</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Suggested: $3.29/bundle</span>
                  <span className="text-amber-600">Market is competitive</span>
                </div>
              </div>
            </div>
            <Button className="w-full mt-4" asChild>
              <Link to="/farmer/price-advisor">
                View Price Advisor
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">Complete your farm profile</p>
                  <p className="text-sm text-muted-foreground">
                    Add farm details, photos, and farming practices
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Add your products</p>
                  <p className="text-sm text-muted-foreground">
                    List what you're currently growing and selling
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">Set up delivery options</p>
                  <p className="text-sm text-muted-foreground">
                    Choose how you'll fulfill orders
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <div>
                  <p className="font-medium">Start selling</p>
                  <p className="text-sm text-muted-foreground">
                    You're ready to receive and fulfill orders
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

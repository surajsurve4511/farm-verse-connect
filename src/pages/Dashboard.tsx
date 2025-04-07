
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { Overview } from "@/components/dashboard/Overview";
import { SalesSummary } from "@/components/dashboard/SalesSummary";
import { WeatherForecast } from "@/components/dashboard/WeatherForecast";
import { InventoryStatus } from "@/components/dashboard/InventoryStatus";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShoppingBag, Users, TrendingUp, Truck, AlertCircle } from "lucide-react";

// Demo function to simulate checking user role from login
const getUserRole = () => {
  // In a real app, this would come from your auth context
  const userEmail = localStorage.getItem("userEmail") || "";
  
  if (userEmail.includes("farmer")) {
    return "farmer";
  }
  return "customer";
};

export default function Dashboard() {
  const [userRole, setUserRole] = useState<"farmer" | "customer">("customer");
  
  useEffect(() => {
    // Get stored email from demo login
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserRole(email.includes("farmer") ? "farmer" : "customer");
    } else {
      // Set demo role based on URL (if testing directly)
      const url = window.location.href;
      setUserRole(url.includes("farmer") ? "farmer" : "customer");
    }
  }, []);

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {userRole === "farmer" ? "Farmer Dashboard" : "Customer Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          {userRole === "farmer" 
            ? "Manage your farm products, view orders, and track your sales."
            : "Welcome to SmartFarm Direct, your farm-to-consumer marketplace."}
        </p>
      </div>
      
      {userRole === "farmer" ? (
        <FarmerDashboard />
      ) : (
        <CustomerDashboard />
      )}
    </div>
  );
}

function FarmerDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="inventory">Inventory</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$15,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products Sold
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
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
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +4 since yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Inventory Status
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M3 2h.01" />
                <path d="M7 2h.01" />
                <path d="M11 2h.01" />
                <path d="M15 2h.01" />
                <path d="M19 2h.01" />
                <path d="M3 6h.01" />
                <path d="M7 6h.01" />
                <path d="M11 6h.01" />
                <path d="M15 6h.01" />
                <path d="M19 6h.01" />
                <path d="M3 10h.01" />
                <path d="M7 10h.01" />
                <path d="M11 10h.01" />
                <path d="M15 10h.01" />
                <path d="M19 10h.01" />
                <path d="M3 14h.01" />
                <path d="M7 14h.01" />
                <path d="M11 14h.01" />
                <path d="M15 14h.01" />
                <path d="M19 14h.01" />
                <path d="M3 18h.01" />
                <path d="M7 18h.01" />
                <path d="M11 18h.01" />
                <path d="M15 18h.01" />
                <path d="M19 18h.01" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86%</div>
              <p className="text-xs text-muted-foreground">
                5 products low in stock
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Alert className="bg-amber-50 text-amber-800 border-amber-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Weather Alert</AlertTitle>
          <AlertDescription>
            Incoming rain forecasted for the next 3 days. Consider adjusting harvest schedules.
          </AlertDescription>
        </Alert>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>
                Monthly sales performance and comparisons
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Your recent order activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentOrders />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Weather Forecast</CardTitle>
              <CardDescription>
                5-day forecast for your farm location
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WeatherForecast />
            </CardContent>
          </Card>
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>
                Current inventory levels and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InventoryStatus />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="inventory" className="space-y-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>
                Manage your product inventory levels and stock
              </CardDescription>
            </div>
            <Button>Add New Product</Button>
          </CardHeader>
          <CardContent>
            <SalesSummary />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="orders" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Manage Orders</CardTitle>
            <CardDescription>
              View and manage customer orders for your products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders fullView={true} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription>
              Detailed analytics for your farm products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Detailed analytics content will be displayed here.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function CustomerDashboard() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="orders">My Orders</TabsTrigger>
        <TabsTrigger value="favorites">Favorites</TabsTrigger>
        <TabsTrigger value="profile">Profile</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Spent
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$342.50</div>
              <p className="text-xs text-muted-foreground">
                +5.4% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Orders Placed
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Farms Supported</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Local farmers in your area
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Environmental Impact
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28 lbs</div>
              <p className="text-xs text-muted-foreground">
                CO₂ emissions reduced
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent purchases and interactions
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Your recent order history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentOrders />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Featured Products</CardTitle>
            <CardDescription>
              Recommended products based on your purchase history
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item}>
                <div className="aspect-square relative">
                  <img
                    src="/placeholder.svg"
                    alt="Featured product"
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium">Featured Product {item}</h3>
                  <p className="text-sm text-muted-foreground">Local Farm</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium">$12.99</span>
                    <Button size="sm" variant="outline">Add</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="orders" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              View and track all your previous orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders fullView={true} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="favorites" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Your Favorite Products</CardTitle>
            <CardDescription>
              Products and farms you've saved as favorites
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="py-4 text-center text-muted-foreground">
              You haven't saved any favorites yet. Browse the marketplace to find products you love!
            </p>
            <div className="flex justify-center">
              <Button>Browse Marketplace</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="profile" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Your profile settings and preferences will appear here.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, MapPin, ShoppingBag, Truck, Users } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
  };

  const features = [
    {
      icon: MapPin,
      title: "Local Sourcing",
      description: "Connect with farms in your area and reduce food miles."
    },
    {
      icon: ShoppingBag,
      title: "Fresh Products",
      description: "Get fresher produce direct from farms to your table."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Convenient delivery options straight to your doorstep."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Support local farmers and strengthen food systems."
    }
  ];

  const categories = [
    { name: "Vegetables", image: "/placeholder.svg" },
    { name: "Fruits", image: "/placeholder.svg" },
    { name: "Dairy", image: "/placeholder.svg" },
    { name: "Meat", image: "/placeholder.svg" },
    { name: "Eggs", image: "/placeholder.svg" },
    { name: "Bakery", image: "/placeholder.svg" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Fresh from farm to your table
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-md">
                Connect directly with local farmers and get fresh, sustainable produce delivered to your doorstep.
              </p>
              
              <form onSubmit={handleSearch} className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for farms or products..."
                  className="pl-10 py-6 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                >
                  Search
                </Button>
              </form>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate("/marketplace")}
                >
                  Shop Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/login")}
                >
                  Login / Register
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src="/placeholder.svg" 
                alt="Fresh farm produce" 
                className="rounded-lg object-cover h-[400px] w-full"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose SmartFarm Direct?</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our platform connects consumers directly with local farmers, promoting sustainable agriculture and community support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Browse Categories</h2>
            <Button 
              variant="ghost" 
              className="hidden md:flex items-center gap-2"
              onClick={() => navigate("/marketplace")}
            >
              View all categories
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, i) => (
              <div 
                key={i} 
                className="cursor-pointer group"
                onClick={() => navigate(`/marketplace?category=${encodeURIComponent(category.name)}`)}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-white border">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-center font-medium">{category.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button 
              variant="outline"
              onClick={() => navigate("/marketplace")}
            >
              View all categories
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Farms Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Farms</h2>
            <Button 
              variant="ghost" 
              className="hidden md:flex items-center gap-2"
              onClick={() => navigate("/farms")}
            >
              View all farms
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt={`Featured Farm ${i}`} 
                  className="h-48 w-full object-cover"
                />
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Green Acres Farm</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>Farmville, CA (12 mi away)</span>
                      </div>
                    </div>
                    <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                      Organic
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Family-owned farm specializing in organic vegetables and free-range eggs.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/farms/${i}`)}
                  >
                    Visit Farm
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button 
              variant="outline"
              onClick={() => navigate("/farms")}
            >
              View all farms
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your farm-to-table experience?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join SmartFarm Direct today and discover the freshest products from local farms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/marketplace")}
            >
              Browse Products
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent hover:bg-primary-foreground/10"
              onClick={() => navigate("/login")}
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">SmartFarm Direct</h3>
              <p className="text-sm opacity-70">
                Connecting farmers and consumers directly, promoting sustainable agriculture and strengthening local food systems.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Explore</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:underline">Marketplace</a></li>
                <li><a href="#" className="text-sm hover:underline">Farms</a></li>
                <li><a href="#" className="text-sm hover:underline">Categories</a></li>
                <li><a href="#" className="text-sm hover:underline">Seasonal Products</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:underline">About Us</a></li>
                <li><a href="#" className="text-sm hover:underline">How It Works</a></li>
                <li><a href="#" className="text-sm hover:underline">Sustainability</a></li>
                <li><a href="#" className="text-sm hover:underline">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:underline">Help Center</a></li>
                <li><a href="#" className="text-sm hover:underline">FAQs</a></li>
                <li><a href="#" className="text-sm hover:underline">Contact Us</a></li>
                <li><a href="#" className="text-sm hover:underline">Terms & Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-sm opacity-70">
            <p>&copy; {new Date().getFullYear()} SmartFarm Direct. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

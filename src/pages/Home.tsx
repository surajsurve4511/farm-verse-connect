
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowRight, MapPin, ShoppingBag, Truck, Users, Leaf, BarChart3, Zap } from "lucide-react";

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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?q=80&w=1920" 
            alt="Farm landscape" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                Fresh from farm <br/>
                <span className="text-gradient">to your table</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-md">
                Connect directly with local farmers and get fresh, sustainable produce delivered to your doorstep.
              </p>
              
              <form onSubmit={handleSearch} className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for farms or products..."
                  className="pl-10 py-6 text-base bg-black/30 backdrop-blur-md border-white/10"
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
                  className="hover-scale"
                >
                  Shop Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate("/login")}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover-scale"
                >
                  Login / Register
                </Button>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full backdrop-blur-xl"></div>
                <div className="absolute -bottom-5 -right-5 w-28 h-28 bg-blue-500/20 rounded-full backdrop-blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1760" 
                  alt="Fresh farm produce" 
                  className="rounded-lg object-cover h-[400px] w-full glass-card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose SmartFarm Direct?</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Our platform connects consumers directly with local farmers, promoting sustainable agriculture and community support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <Card key={i} className="glass-card hover-scale border-0">
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
      
      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bringing value to farmers and consumers</h2>
              <p className="text-muted-foreground mb-8">
                SmartFarm Direct provides a seamless platform that brings benefits to all participants in the food ecosystem.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Leaf className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Sustainable Practices</h3>
                    <p className="text-muted-foreground text-sm">Promoting environment-friendly farming methods</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Fair Pricing</h3>
                    <p className="text-muted-foreground text-sm">Better margins for farmers and fair prices for consumers</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Efficiency</h3>
                    <p className="text-muted-foreground text-sm">Streamlined logistics and reduced food waste</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-10 -right-5 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1500829243541-74b677fecc30?q=80&w=1770" 
                alt="Farmer with produce" 
                className="rounded-2xl h-auto w-full object-cover glass-card p-2"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/80 to-blue-600 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1770')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-br from-primary/50 to-blue-600/50"></div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your farm-to-table experience?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Join SmartFarm Direct today and discover the freshest products from local farms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/marketplace")}
              className="hover-scale"
            >
              Browse Products
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white/30 hover:bg-white/10 hover-scale"
              onClick={() => navigate("/login")}
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-black/90 text-gray-300">
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

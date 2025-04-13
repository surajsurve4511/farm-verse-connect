
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Leaf, 
  Truck, 
  Shield, 
  Recycle, 
  ChevronRight, 
  Star,
  ShoppingBag,
  ArrowRight
} from "lucide-react";

// Mock data for featured products
const featuredProducts = [
  {
    id: "1",
    name: "Organic Tomatoes",
    description: "Fresh, juicy tomatoes grown without synthetic pesticides.",
    price: 4.99,
    image: "/placeholder.svg",
    farm: "Green Valley Organics",
    farmId: "1",
    organic: true
  },
  {
    id: "2",
    name: "Fresh Carrots",
    description: "Sweet and crunchy carrots harvested at the perfect time.",
    price: 3.49,
    image: "/placeholder.svg",
    farm: "Sunshine Acres",
    farmId: "2",
    organic: true
  },
  {
    id: "4",
    name: "Free-Range Eggs",
    description: "Eggs from happy, free-range chickens with rich yolks.",
    price: 6.49,
    image: "/placeholder.svg",
    farm: "Happy Hens",
    farmId: "4",
    organic: true
  },
  {
    id: "7",
    name: "Fresh Milk",
    description: "Creamy, non-homogenized milk from grass-fed cows.",
    price: 4.49,
    image: "/placeholder.svg",
    farm: "Meadow Dairy",
    farmId: "7",
    organic: true
  }
];

// Mock data for featured farms
const featuredFarms = [
  {
    id: "1",
    name: "Green Valley Organics",
    description: "Family-owned organic farm specializing in heirloom vegetables and fruits.",
    location: "Riverside, CA",
    image: "/placeholder.svg",
    productCount: 24,
    rating: 4.8
  },
  {
    id: "2",
    name: "Sunshine Acres",
    description: "Sustainable farm with a focus on seasonal produce and regenerative farming.",
    location: "Boulder, CO",
    image: "/placeholder.svg",
    productCount: 18,
    rating: 4.5
  },
  {
    id: "7",
    name: "Meadow Dairy",
    description: "Small-scale dairy farm with grass-fed cows and artisanal cheese production.",
    location: "Madison, WI",
    image: "/placeholder.svg",
    productCount: 12,
    rating: 4.9
  }
];

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchTerm)}`);
    }
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Farm Fresh Produce, <br />
              Delivered To Your Door
            </h1>
            <p className="text-lg text-muted-foreground">
              Connect directly with local farmers and enjoy the freshest seasonal 
              produce delivered straight to your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate("/marketplace")}>
                Shop Now
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/farms")}>
                Meet Our Farmers
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="/placeholder.svg" 
              alt="Fresh farm produce" 
              className="rounded-lg shadow-lg w-full max-w-lg mx-auto"
            />
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">What fresh produce are you looking for today?</h2>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for fresh fruits, vegetables, dairy..."
                className="pl-10 py-6 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2">
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="ghost" className="gap-1" onClick={() => navigate("/marketplace")}>
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div 
                  className="h-48 relative cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                  {product.organic && (
                    <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Leaf className="h-3 w-3" />
                      Organic
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 
                      className="font-semibold text-lg cursor-pointer hover:text-primary"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <p className="font-bold">${product.price.toFixed(2)}</p>
                  </div>
                  <p 
                    className="text-sm text-muted-foreground cursor-pointer hover:text-primary"
                    onClick={() => navigate(`/farm/${product.farmId}`)}
                  >
                    {product.farm}
                  </p>
                  <p className="text-sm mt-2 line-clamp-2">{product.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    View Product
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Organic Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-green-50 rounded-lg p-6 md:p-10 relative">
                <Badge className="absolute top-4 right-4 bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
                  <Leaf className="h-3 w-3" />
                  100% Organic
                </Badge>
                <h2 className="text-3xl font-bold mb-4">Organic Produce for a Healthier Lifestyle</h2>
                <p className="text-muted-foreground mb-6">
                  Our organic products are grown without synthetic pesticides or fertilizers, 
                  promoting healthier ecosystems and nutritious food for your family.
                </p>
                <Button onClick={() => navigate("/category/organic")}>
                  Explore All Organic Products
                </Button>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="font-bold text-lg">30+</div>
                    <div className="text-sm text-muted-foreground">Organic Farms</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="font-bold text-lg">150+</div>
                    <div className="text-sm text-muted-foreground">Organic Products</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <div className="font-bold text-lg">5000+</div>
                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <img src="/placeholder.svg" alt="Organic vegetables" className="rounded-lg w-full" />
              <img src="/placeholder.svg" alt="Organic fruits" className="rounded-lg w-full" />
              <img src="/placeholder.svg" alt="Organic dairy" className="rounded-lg w-full" />
              <img src="/placeholder.svg" alt="Organic eggs" className="rounded-lg w-full" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose FarmVerse?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to building a more sustainable and equitable food system
              by connecting consumers directly with local farmers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Fresh & Organic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Harvest-to-table freshness with produce picked at peak ripeness and delivered directly to you.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Support Local Farmers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every purchase directly supports family farms and strengthens your local food system.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Efficient delivery network ensures your produce arrives fresh within 24-48 hours of harvest.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Recycle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Eco-Friendly Packaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All deliveries use minimal, sustainable packaging that is compostable or recyclable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Farms */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Farms</h2>
            <Button variant="ghost" className="gap-1" onClick={() => navigate("/farms")}>
              View all <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredFarms.map((farm) => (
              <Card key={farm.id} className="overflow-hidden">
                <div 
                  className="h-48 relative cursor-pointer"
                  onClick={() => navigate(`/farm/${farm.id}`)}
                >
                  <img 
                    src={farm.image} 
                    alt={farm.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <h3 
                      className="font-semibold text-lg cursor-pointer hover:text-primary"
                      onClick={() => navigate(`/farm/${farm.id}`)}
                    >
                      {farm.name}
                    </h3>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <span className="ml-1">{farm.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {farm.location}
                  </p>
                  <p className="text-sm mt-2 line-clamp-3">{farm.description}</p>
                  <div className="mt-4 text-sm">
                    <span className="text-muted-foreground">{farm.productCount} products available</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/farm/${farm.id}`)}
                  >
                    Visit Farm
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Are You a Farmer?</h2>
            <p className="text-muted-foreground mb-8">
              Join our platform to reach more customers and grow your business. 
              We help local farmers sell directly to consumers while handling 
              logistics, marketing, and customer service.
            </p>
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <p className="text-left">Reach customers within 50 miles of your farm</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <p className="text-left">Set your own prices and control your inventory</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <p className="text-left">We handle delivery and customer service</p>
              </div>
            </div>
            <div className="mt-8">
              <Button size="lg" className="gap-2" onClick={() => navigate("/register")}>
                Become a Seller
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

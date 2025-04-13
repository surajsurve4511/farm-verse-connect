
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, MapPin, Star, Leaf } from "lucide-react";

// Sample farm data (in a real app, this would come from an API)
const farms = [
  {
    id: "green-acres",
    name: "Green Acres Farm",
    location: "Riverside, CA",
    distance: "12 mi",
    image: "/placeholder.svg",
    description: "Family-owned organic farm specializing in heirloom vegetables and fruits.",
    established: 2010,
    rating: 4.8,
    reviewCount: 45,
    organic: true,
    products: 24,
    featured: true,
  },
  {
    id: "sunrise-organics",
    name: "Sunrise Organics",
    location: "Meadowville, OR",
    distance: "8 mi",
    image: "/placeholder.svg",
    description: "Sustainable farm committed to eco-friendly practices and biodiversity.",
    established: 2015,
    rating: 4.6,
    reviewCount: 32,
    organic: true,
    products: 18,
    featured: true,
  },
  {
    id: "highland-ranch",
    name: "Highland Ranch",
    location: "Hilltop, WA",
    distance: "20 mi",
    image: "/placeholder.svg",
    description: "Traditional cattle ranch raising grass-fed beef and free-range poultry.",
    established: 1998,
    rating: 4.9,
    reviewCount: 67,
    organic: false,
    products: 12,
    featured: true,
  },
  {
    id: "happy-hens-farm",
    name: "Happy Hens Farm",
    location: "Sunny Valley, CA",
    distance: "15 mi",
    image: "/placeholder.svg",
    description: "Specializing in pasture-raised eggs and poultry products.",
    established: 2012,
    rating: 4.7,
    reviewCount: 28,
    organic: true,
    products: 8,
    featured: false,
  },
  {
    id: "orchard-valley",
    name: "Orchard Valley",
    location: "Fruitvale, WA",
    distance: "18 mi",
    image: "/placeholder.svg",
    description: "Multi-generation orchard growing a variety of organic apples and stone fruits.",
    established: 1985,
    rating: 4.5,
    reviewCount: 51,
    organic: true,
    products: 16,
    featured: false,
  },
  {
    id: "countryside-bakery",
    name: "Countryside Bakery",
    location: "Wheatfield, OR",
    distance: "10 mi",
    image: "/placeholder.svg",
    description: "Artisan bakery using locally-sourced grains and traditional methods.",
    established: 2008,
    rating: 4.8,
    reviewCount: 72,
    organic: false,
    products: 22,
    featured: false,
  },
  {
    id: "buzzing-meadows",
    name: "Buzzing Meadows",
    location: "Honeycomb, CA",
    distance: "22 mi",
    image: "/placeholder.svg",
    description: "Bee farm producing organic honey and beeswax products.",
    established: 2013,
    rating: 4.9,
    reviewCount: 39,
    organic: true,
    products: 14,
    featured: false,
  },
  {
    id: "dairy-dreams",
    name: "Dairy Dreams",
    location: "Creamland, WA",
    distance: "14 mi",
    image: "/placeholder.svg",
    description: "Family dairy farm producing organic milk, cheese, and yogurt.",
    established: 2001,
    rating: 4.7,
    reviewCount: 43,
    organic: true,
    products: 19,
    featured: false,
  },
];

export default function Farms() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredFarms = farms.filter(farm => 
    farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farm.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Farm Partners</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover the local farms that supply our marketplace with fresh, sustainable produce. 
              Support local agriculture and connect directly with farmers.
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 md:px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search farms by name or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Featured Farms */}
        {!searchQuery && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Farms</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {farms.filter(farm => farm.featured).map(farm => (
                <Card key={farm.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={farm.image} 
                      alt={farm.name}
                      className="w-full h-full object-cover" 
                    />
                    {farm.organic && (
                      <Badge className="absolute top-2 right-2 bg-green-600">
                        <Leaf className="h-3 w-3 mr-1" />
                        Organic
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {farm.location} • {farm.distance} away
                    </div>
                    <Link to={`/farm/${farm.id}`}>
                      <h3 className="text-xl font-bold hover:underline">{farm.name}</h3>
                    </Link>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{farm.rating}</span>
                      <span className="text-muted-foreground ml-1">({farm.reviewCount} reviews)</span>
                    </div>
                    <p className="mt-3 text-muted-foreground line-clamp-2">{farm.description}</p>
                    <Separator className="my-4" />
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-sm font-semibold">{farm.products}</div>
                        <div className="text-xs text-muted-foreground">Products</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{new Date().getFullYear() - farm.established}</div>
                        <div className="text-xs text-muted-foreground">Years</div>
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{farm.organic ? "Yes" : "No"}</div>
                        <div className="text-xs text-muted-foreground">Organic</div>
                      </div>
                    </div>
                    <Button className="w-full mt-4" asChild>
                      <Link to={`/farm/${farm.id}`}>View Farm</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* All Farms */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {searchQuery ? `Search Results (${filteredFarms.length})` : "All Farms"}
          </h2>
          
          {filteredFarms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFarms.map(farm => (
                <Card key={farm.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <img 
                      src={farm.image} 
                      alt={farm.name}
                      className="w-full h-full object-cover" 
                    />
                    {farm.organic && (
                      <Badge className="absolute top-2 right-2 bg-green-600">
                        <Leaf className="h-3 w-3 mr-1" />
                        Organic
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {farm.location} • {farm.distance} away
                    </div>
                    <Link to={`/farm/${farm.id}`}>
                      <h3 className="font-bold hover:underline">{farm.name}</h3>
                    </Link>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{farm.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">({farm.reviewCount})</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{farm.description}</p>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-3 gap-1 text-center text-xs">
                      <div>
                        <div className="font-semibold">{farm.products}</div>
                        <div className="text-muted-foreground">Products</div>
                      </div>
                      <div>
                        <div className="font-semibold">Est. {farm.established}</div>
                        <div className="text-muted-foreground">Founded</div>
                      </div>
                      <div>
                        <div className="font-semibold">{farm.organic ? "Yes" : "No"}</div>
                        <div className="text-muted-foreground">Organic</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                      <Link to={`/farm/${farm.id}`}>View Farm</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No farms found</h3>
              <p className="text-muted-foreground mb-4">
                No farms match your search criteria
              </p>
              <Button onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>
        
        {/* CTA for Farmers */}
        <div className="mt-16 bg-gradient-to-r from-primary/80 to-blue-600 text-white rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">Are You a Farmer?</h2>
              <p className="mb-6">
                Join our platform to connect directly with customers, 
                sell your products, and grow your farm business.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>List and sell your products directly to consumers</span>
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Manage orders, inventory, and delivery in one place</span>
                </li>
                <li className="flex items-center">
                  <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center mr-2">
                    <span className="text-xs">✓</span>
                  </div>
                  <span>Build your farm's brand and connect with the community</span>
                </li>
              </ul>
              <Button variant="secondary" size="lg" asChild>
                <Link to="/register">Become a Seller</Link>
              </Button>
            </div>
            <div className="hidden md:block relative">
              <img
                src="https://images.unsplash.com/photo-1500829243541-74b677fecc30?q=80&w=1770"
                alt="Farmer with produce"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

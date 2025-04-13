
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Search, Filter, ChevronRight, Star, Leaf, ShoppingCart
} from "lucide-react";

// Sample product data (in a real app, this would come from an API)
const allProducts = [
  {
    id: "organic-tomatoes",
    name: "Organic Tomatoes",
    price: 4.99,
    unit: "kg",
    farm: "Green Acres Farm",
    farmId: "green-acres",
    distance: "12 mi",
    category: "Vegetables",
    organic: true,
    rating: 4.8,
    reviewCount: 24,
    image: "/placeholder.svg",
  },
  {
    id: "fresh-carrots",
    name: "Fresh Carrots Bundle",
    price: 3.49,
    unit: "bundle",
    farm: "Sunrise Organics",
    farmId: "sunrise-organics",
    distance: "8 mi",
    category: "Vegetables",
    organic: true,
    rating: 4.5,
    reviewCount: 18,
    image: "/placeholder.svg",
  },
  {
    id: "grass-fed-beef",
    name: "Grass-fed Beef",
    price: 15.99,
    unit: "kg",
    farm: "Highland Ranch",
    farmId: "highland-ranch",
    distance: "20 mi",
    category: "Meat",
    organic: false,
    rating: 4.9,
    reviewCount: 36,
    image: "/placeholder.svg",
  },
  {
    id: "free-range-eggs",
    name: "Free-range Eggs",
    price: 6.99,
    unit: "dozen",
    farm: "Happy Hens Farm",
    farmId: "happy-hens",
    distance: "15 mi",
    category: "Eggs",
    organic: true,
    rating: 4.7,
    reviewCount: 42,
    image: "/placeholder.svg",
  },
  {
    id: "organic-apples",
    name: "Organic Apple Basket",
    price: 8.99,
    unit: "basket",
    farm: "Orchard Valley",
    farmId: "orchard-valley",
    distance: "18 mi",
    category: "Fruits",
    organic: true,
    rating: 4.6,
    reviewCount: 29,
    image: "/placeholder.svg",
  },
  {
    id: "freshly-baked-bread",
    name: "Freshly Baked Bread",
    price: 4.50,
    unit: "loaf",
    farm: "Countryside Bakery",
    farmId: "countryside-bakery",
    distance: "10 mi",
    category: "Bakery",
    organic: false,
    rating: 4.8,
    reviewCount: 54,
    image: "/placeholder.svg",
  },
  {
    id: "raw-honey",
    name: "Raw Honey",
    price: 12.99,
    unit: "jar",
    farm: "Buzzing Meadows",
    farmId: "buzzing-meadows",
    distance: "22 mi",
    category: "Specialty",
    organic: true,
    rating: 4.9,
    reviewCount: 31,
    image: "/placeholder.svg",
  },
  {
    id: "fresh-milk",
    name: "Fresh Milk",
    price: 5.99,
    unit: "gallon",
    farm: "Dairy Dreams",
    farmId: "dairy-dreams",
    distance: "14 mi",
    category: "Dairy",
    organic: true,
    rating: 4.7,
    reviewCount: 38,
    image: "/placeholder.svg",
  },
];

export default function CategoryProducts() {
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [selectedFarms, setSelectedFarms] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("relevance");
  
  // Get unique farms from products
  const farms = [...new Set(allProducts.map(product => product.farm))];
  
  // Filter products by category and other filters
  const filteredProducts = allProducts.filter(product => {
    // Always filter by category
    const categoryMatch = category 
      ? product.category.toLowerCase() === category.toLowerCase() 
      : true;
    
    // Search query filter
    const searchMatch = searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farm.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Organic filter
    const organicMatch = !organicOnly || product.organic;
    
    // Farm filter
    const farmMatch = selectedFarms.length === 0 || selectedFarms.includes(product.farm);
    
    // Price filter
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return categoryMatch && searchMatch && organicMatch && farmMatch && priceMatch;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "distance":
        return parseInt(a.distance) - parseInt(b.distance);
      default:
        return 0;
    }
  });
  
  const handleFarmChange = (farm: string) => {
    setSelectedFarms(prev =>
      prev.includes(farm)
        ? prev.filter(f => f !== farm)
        : [...prev, farm]
    );
  };
  
  const resetFilters = () => {
    setSearchQuery("");
    setOrganicOnly(false);
    setSelectedFarms([]);
    setPriceRange([0, 100]);
  };
  
  useEffect(() => {
    // Reset to top of page when category changes
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-muted/30 py-6">
        <div className="container mx-auto px-4 md:px-6">
          <nav className="mb-4 flex text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <Link to="/marketplace" className="text-muted-foreground hover:text-foreground">
              Marketplace
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <span className="text-foreground font-medium capitalize">
              {category || "All Categories"}
            </span>
          </nav>
          
          <h1 className="text-3xl font-bold mb-2 capitalize">
            {category || "All Products"}
          </h1>
          <p className="text-muted-foreground">
            Browse our selection of {category ? `fresh ${category.toLowerCase()}` : "farm-fresh products"}
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 md:px-6 py-8">
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products or farms..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {(selectedFarms.length > 0 || organicOnly || priceRange[0] > 0 || priceRange[1] < 100) && (
                <Badge className="ml-1 px-1 py-0 h-5 min-w-5">
                  {selectedFarms.length + (organicOnly ? 1 : 0) + 
                   ((priceRange[0] > 0 || priceRange[1] < 100) ? 1 : 0)}
                </Badge>
              )}
            </Button>
            
            <select
              className="px-3 py-2 rounded-md border border-input bg-background text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="distance">Distance</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Panel */}
          {showFilters && (
            <div className="w-full md:w-64 shrink-0 space-y-6 sticky top-4">
              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Options</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="organic"
                        checked={organicOnly}
                        onCheckedChange={(checked) => 
                          setOrganicOnly(checked === true)
                        }
                      />
                      <Label htmlFor="organic">Organic Only</Label>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-4">Farms</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {farms.map((farm) => (
                      <div key={farm} className="flex items-center space-x-2">
                        <Checkbox
                          id={`farm-${farm}`}
                          checked={selectedFarms.includes(farm)}
                          onCheckedChange={() => handleFarmChange(farm)}
                        />
                        <Label htmlFor={`farm-${farm}`} className="text-sm">
                          {farm}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetFilters}
                  >
                    Reset All
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowFilters(false)}
                    className="md:hidden"
                  >
                    Apply Filters
                  </Button>
                </div>
              </Card>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-muted-foreground">
                Showing {sortedProducts.length} of {allProducts.length} products
              </p>
            </div>
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                      {product.organic && (
                        <Badge className="absolute top-2 right-2 bg-green-600">
                          <Leaf className="h-3 w-3 mr-1" />
                          Organic
                        </Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <Link 
                          to={`/farm/${product.farmId}`}
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          {product.farm} • {product.distance} away
                        </Link>
                      </div>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-medium text-lg hover:underline">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 my-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {product.rating} ({product.reviewCount})
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium">
                          ${product.price.toFixed(2)}{" "}
                          <span className="text-sm font-normal">
                            / {product.unit}
                          </span>
                        </span>
                        <Button size="sm" variant="outline">
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={resetFilters}>
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

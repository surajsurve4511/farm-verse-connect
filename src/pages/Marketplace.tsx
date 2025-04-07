
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter, Search, Star, ShoppingCart } from "lucide-react";

// Mock data
const products = [
  {
    id: "1",
    name: "Organic Tomatoes",
    price: 4.99,
    unit: "kg",
    farm: "Green Acres Farm",
    distance: "12 mi",
    category: "Vegetables",
    organic: true,
    rating: 4.8,
    reviewCount: 24,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Fresh Carrots Bundle",
    price: 3.49,
    unit: "bundle",
    farm: "Sunrise Organics",
    distance: "8 mi",
    category: "Vegetables",
    organic: true,
    rating: 4.5,
    reviewCount: 18,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Grass-fed Beef",
    price: 15.99,
    unit: "kg",
    farm: "Highland Ranch",
    distance: "20 mi",
    category: "Meat",
    organic: false,
    rating: 4.9,
    reviewCount: 36,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Free-range Eggs",
    price: 6.99,
    unit: "dozen",
    farm: "Happy Hens Farm",
    distance: "15 mi",
    category: "Eggs",
    organic: true,
    rating: 4.7,
    reviewCount: 42,
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Organic Apple Basket",
    price: 8.99,
    unit: "basket",
    farm: "Orchard Valley",
    distance: "18 mi",
    category: "Fruits",
    organic: true,
    rating: 4.6,
    reviewCount: 29,
    image: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Freshly Baked Bread",
    price: 4.50,
    unit: "loaf",
    farm: "Countryside Bakery",
    distance: "10 mi",
    category: "Bakery",
    organic: false,
    rating: 4.8,
    reviewCount: 54,
    image: "/placeholder.svg",
  },
  {
    id: "7",
    name: "Raw Honey",
    price: 12.99,
    unit: "jar",
    farm: "Buzzing Meadows",
    distance: "22 mi",
    category: "Specialty",
    organic: true,
    rating: 4.9,
    reviewCount: 31,
    image: "/placeholder.svg",
  },
  {
    id: "8",
    name: "Fresh Milk",
    price: 5.99,
    unit: "gallon",
    farm: "Dairy Dreams",
    distance: "14 mi",
    category: "Dairy",
    organic: true,
    rating: 4.7,
    reviewCount: 38,
    image: "/placeholder.svg",
  },
];

// Categories
const categories = [
  "Vegetables",
  "Fruits",
  "Meat",
  "Dairy",
  "Eggs",
  "Bakery",
  "Specialty",
];

// Farms
const farms = [
  "Green Acres Farm",
  "Sunrise Organics",
  "Highland Ranch",
  "Happy Hens Farm",
  "Orchard Valley",
  "Countryside Bakery",
  "Buzzing Meadows",
  "Dairy Dreams",
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFarms, setSelectedFarms] = useState<string[]>([]);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [maxDistance, setMaxDistance] = useState(50);
  const [sortBy, setSortBy] = useState("relevance");

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Search query filter
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.farm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    // Farm filter
    const matchesFarm =
      selectedFarms.length === 0 || selectedFarms.includes(product.farm);

    // Organic filter
    const matchesOrganic = !organicOnly || product.organic;

    // Distance filter
    const matchesDistance = parseInt(product.distance) <= maxDistance;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFarm &&
      matchesOrganic &&
      matchesDistance
    );
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleFarmChange = (farm: string) => {
    setSelectedFarms((prev) =>
      prev.includes(farm)
        ? prev.filter((f) => f !== farm)
        : [...prev, farm]
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-muted/30 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Farm Fresh Marketplace</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover fresh, local produce direct from farms near you. Browse our selection of sustainable products.
            </p>
          </div>
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
              placeholder="Search products, farms, categories..."
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
              {(selectedCategories.length > 0 || 
                selectedFarms.length > 0 || 
                organicOnly || 
                maxDistance !== 50) && (
                <Badge className="ml-1 px-1 py-0 h-5 min-w-5">
                  {selectedCategories.length + 
                   selectedFarms.length + 
                   (organicOnly ? 1 : 0) + 
                   (maxDistance !== 50 ? 1 : 0)}
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
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <Label htmlFor={`category-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Farms</h3>
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
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Options</h3>
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
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Maximum Distance</h3>
                      <span>{maxDistance} miles</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      step="5"
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedFarms([]);
                        setOrganicOnly(false);
                        setMaxDistance(50);
                      }}
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
                </div>
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-muted-foreground">
                Showing {sortedProducts.length} of {products.length} products
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
                          Organic
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <Link 
                          to={`/farms/${product.farm.replace(/\s+/g, '-').toLowerCase()}`}
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          {product.farm} • {product.distance} away
                        </Link>
                      </div>
                      <Link to={`/products/${product.id}`}>
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategories([]);
                    setSelectedFarms([]);
                    setOrganicOnly(false);
                    setMaxDistance(50);
                  }}
                >
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

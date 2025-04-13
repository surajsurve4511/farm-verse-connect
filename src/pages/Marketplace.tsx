
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Leaf, 
  ChevronRight, 
  Star
} from "lucide-react";
import { toast } from "sonner";

// Mock data for products
const mockProducts = [
  {
    id: "1",
    name: "Organic Tomatoes",
    description: "Fresh, juicy organic tomatoes grown without synthetic pesticides.",
    price: 4.99,
    image: "/placeholder.svg",
    category: "vegetables",
    farm: "Green Valley Organics",
    farmId: "1",
    organic: true,
    featured: true,
    rating: 4.8,
    reviews: 24
  },
  {
    id: "2",
    name: "Fresh Carrots",
    description: "Sweet and crunchy carrots harvested at the perfect time.",
    price: 3.49,
    image: "/placeholder.svg",
    category: "vegetables",
    farm: "Sunshine Acres",
    farmId: "2",
    organic: true,
    featured: false,
    rating: 4.5,
    reviews: 18
  },
  {
    id: "3",
    name: "Strawberries",
    description: "Plump, sweet strawberries, perfect for desserts or snacking.",
    price: 5.99,
    image: "/placeholder.svg",
    category: "fruits",
    farm: "Mountain View Farm",
    farmId: "3",
    organic: false,
    featured: true,
    rating: 4.9,
    reviews: 32
  },
  {
    id: "4",
    name: "Free-Range Eggs",
    description: "Eggs from happy, free-range chickens with rich, golden yolks.",
    price: 6.49,
    image: "/placeholder.svg",
    category: "eggs",
    farm: "Happy Hens",
    farmId: "4",
    organic: true,
    featured: true,
    rating: 4.7,
    reviews: 41
  },
  {
    id: "5",
    name: "Raw Honey",
    description: "Unprocessed, pure honey direct from local beekeepers.",
    price: 8.99,
    image: "/placeholder.svg",
    category: "specialty",
    farm: "Beekeepers Co-op",
    farmId: "5",
    organic: true,
    featured: false,
    rating: 4.9,
    reviews: 29
  },
  {
    id: "6",
    name: "Artisan Bread",
    description: "Hand-crafted sourdough bread made with organic flour.",
    price: 7.49,
    image: "/placeholder.svg",
    category: "bakery",
    farm: "Village Bakery",
    farmId: "6",
    organic: false,
    featured: false,
    rating: 4.6,
    reviews: 35
  },
  {
    id: "7",
    name: "Fresh Milk",
    description: "Creamy, non-homogenized milk from grass-fed cows.",
    price: 4.49,
    image: "/placeholder.svg",
    category: "dairy",
    farm: "Meadow Dairy",
    farmId: "7",
    organic: true,
    featured: true,
    rating: 4.8,
    reviews: 27
  },
  {
    id: "8",
    name: "Grass-Fed Ground Beef",
    description: "Lean ground beef from cattle raised on open pastures.",
    price: 9.99,
    image: "/placeholder.svg",
    category: "meat",
    farm: "Rolling Hills Ranch",
    farmId: "8",
    organic: false,
    featured: true,
    rating: 4.7,
    reviews: 22
  }
];

// Category data
const categories = [
  { id: "vegetables", name: "Vegetables" },
  { id: "fruits", name: "Fruits" },
  { id: "dairy", name: "Dairy" },
  { id: "meat", name: "Meat" },
  { id: "eggs", name: "Eggs" },
  { id: "bakery", name: "Bakery" },
  { id: "specialty", name: "Specialty" }
];

export default function Marketplace() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  
  // Apply filters
  useEffect(() => {
    let result = mockProducts;
    
    // Search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farm.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Price range filter
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Organic filter
    if (organicOnly) {
      result = result.filter(product => product.organic);
    }
    
    // Sort products
    result = result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "featured":
        default:
          return b.featured === a.featured ? 0 : b.featured ? 1 : -1;
      }
    });
    
    setFilteredProducts(result);
  }, [searchTerm, priceRange, selectedCategories, organicOnly, sortBy]);
  
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleAddToCart = (product: any) => {
    // In a real app, this would interact with a cart service
    toast.success(`${product.name} added to cart`);
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 20]);
    setSelectedCategories([]);
    setOrganicOnly(false);
    setSortBy("featured");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Fresh Farm Produce</h1>
          <p className="text-muted-foreground">
            Browse our selection of fresh, locally grown products
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            
            <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                  <SheetDescription>
                    Narrow down results by price, category, and more
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="space-y-4">
                      <Slider
                        min={0}
                        max={20}
                        step={0.5}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between text-sm">
                        <span>${priceRange[0].toFixed(2)}</span>
                        <span>${priceRange[1].toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Categories</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={selectedCategories.includes(category.id)}
                            onCheckedChange={() => handleCategoryToggle(category.id)}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Farming Methods</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="organic-only"
                        checked={organicOnly}
                        onCheckedChange={(checked) => setOrganicOnly(checked as boolean)}
                      />
                      <label
                        htmlFor="organic-only"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Organic Products Only
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={clearFilters}>Clear All</Button>
                    <Button onClick={() => setIsFiltersOpen(false)}>Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Display filter summary if filters are active */}
      {(selectedCategories.length > 0 || organicOnly || searchTerm || priceRange[0] > 0 || priceRange[1] < 20) && (
        <div className="mb-6 bg-muted rounded-lg p-3 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Active Filters:</span>
          
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchTerm}
              <button 
                onClick={() => setSearchTerm("")}
                className="ml-1 h-4 w-4 rounded-full bg-muted-foreground/20 inline-flex items-center justify-center text-muted-foreground hover:bg-muted-foreground/30"
              >
                ×
              </button>
            </Badge>
          )}
          
          {(priceRange[0] > 0 || priceRange[1] < 20) && (
            <Badge variant="secondary" className="gap-1">
              Price: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
            </Badge>
          )}
          
          {selectedCategories.map(catId => {
            const category = categories.find(c => c.id === catId);
            return (
              <Badge key={catId} variant="secondary" className="gap-1">
                {category?.name}
                <button
                  onClick={() => handleCategoryToggle(catId)}
                  className="ml-1 h-4 w-4 rounded-full bg-muted-foreground/20 inline-flex items-center justify-center text-muted-foreground hover:bg-muted-foreground/30"
                >
                  ×
                </button>
              </Badge>
            );
          })}
          
          {organicOnly && (
            <Badge variant="secondary" className="gap-1">
              Organic Only
              <button
                onClick={() => setOrganicOnly(false)}
                className="ml-1 h-4 w-4 rounded-full bg-muted-foreground/20 inline-flex items-center justify-center text-muted-foreground hover:bg-muted-foreground/30"
              >
                ×
              </button>
            </Badge>
          )}
          
          <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
            Clear All
          </Button>
        </div>
      )}
      
      {/* Results count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>
      </div>
      
      {/* Products grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden flex flex-col">
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
              <CardContent className="flex-grow p-4">
                <div className="flex justify-between items-start">
                  <h3 
                    className="font-semibold text-lg truncate cursor-pointer hover:text-primary"
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
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-1">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <p className="text-sm mt-2 line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter className="px-4 pb-4 pt-0">
                <Button 
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No products found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your filters or search term</p>
          <Button onClick={clearFilters}>Clear All Filters</Button>
        </div>
      )}
      
      {/* Category showcase */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Browse by Category</h2>
          <Button variant="ghost" className="gap-1" onClick={() => navigate("/categories")}>
            View all <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="group"
            >
              <div className="border rounded-lg p-4 text-center hover:border-primary hover:bg-primary/5 transition-colors">
                <div className="h-16 w-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/10">
                  <img 
                    src={`/placeholder.svg`} 
                    alt={category.name} 
                    className="h-8 w-8" 
                  />
                </div>
                <h3 className="font-medium">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

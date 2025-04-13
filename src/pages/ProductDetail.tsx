
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Leaf, 
  Star, 
  Truck, 
  ShoppingCart, 
  Calendar, 
  Clock, 
  Warehouse, 
  ChevronLeft, 
  ChevronRight, 
  Heart,
  Store
} from "lucide-react";
import { toast } from "sonner";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Organic Tomatoes",
    description: "These vine-ripened organic tomatoes are grown without synthetic pesticides or fertilizers. They're harvested at peak ripeness for maximum flavor and nutrition. Perfect for salads, sandwiches, or cooking in your favorite recipes. Our tomatoes are grown using sustainable farming practices that protect the environment and promote soil health.",
    price: 4.99,
    unit: "kg",
    category: "vegetables",
    farm: {
      id: "farm1",
      name: "Green Valley Organics",
      location: "Riverside, CA",
      distance: 15
    },
    organic: true,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    stock: 45,
    harvestDate: "2025-04-10",
    expiryDate: "2025-04-20",
    farmingPractices: ["No synthetic pesticides", "Sustainable irrigation", "Hand-picked"],
    nutrition: ["Rich in vitamin C", "Low in calories", "Good source of potassium"],
    reviews: [
      { id: "r1", user: "John D.", rating: 5, comment: "These tomatoes are incredibly flavorful! Much better than what I find in the supermarket.", date: "2025-04-08" },
      { id: "r2", user: "Sarah M.", rating: 4, comment: "Very fresh and juicy. Will buy again.", date: "2025-04-05" },
      { id: "r3", user: "Robert L.", rating: 5, comment: "Perfect ripeness and great taste. Highly recommend!", date: "2025-04-02" }
    ],
    relatedProducts: ["2", "3", "7"]
  },
  {
    id: "2",
    name: "Fresh Carrots",
    description: "Sweet and crunchy carrots harvested at the perfect time. Great for snacking, cooking, or juicing.",
    price: 3.49,
    unit: "bundle",
    category: "vegetables",
    farm: {
      id: "farm2",
      name: "Sunshine Acres",
      location: "Boulder, CO",
      distance: 22
    },
    organic: true,
    images: ["/placeholder.svg", "/placeholder.svg"],
    stock: 32,
    harvestDate: "2025-04-12",
    expiryDate: "2025-04-25",
    farmingPractices: ["Organic cultivation", "Crop rotation", "Natural pest management"],
    nutrition: ["High in beta-carotene", "Vitamin A", "Fiber"],
    reviews: [
      { id: "r4", user: "Emma K.", rating: 5, comment: "So crisp and flavorful! My kids love them as snacks.", date: "2025-04-09" },
      { id: "r5", user: "David P.", rating: 4, comment: "Great quality carrots with excellent sweetness.", date: "2025-04-07" }
    ],
    relatedProducts: ["1", "3", "5"]
  },
  {
    id: "3",
    name: "Strawberries",
    description: "Plump, sweet strawberries, perfect for desserts or snacking.",
    price: 5.99,
    unit: "pint",
    category: "fruits",
    farm: {
      id: "farm3",
      name: "Mountain View Farm",
      location: "Portland, OR",
      distance: 30
    },
    organic: false,
    images: ["/placeholder.svg"],
    stock: 28,
    harvestDate: "2025-04-11",
    expiryDate: "2025-04-18",
    farmingPractices: ["Sustainable farming", "Minimal spraying", "Hand-selected"],
    nutrition: ["Vitamin C", "Fiber", "Antioxidants"],
    reviews: [
      { id: "r6", user: "Linda M.", rating: 5, comment: "The sweetest strawberries I've had in years!", date: "2025-04-12" },
      { id: "r7", user: "Michael T.", rating: 3, comment: "Good flavor but a few were overripe.", date: "2025-04-10" }
    ],
    relatedProducts: ["1", "2", "4"]
  },
  {
    id: "7",
    name: "Fresh Milk",
    description: "Creamy, non-homogenized milk from grass-fed cows.",
    price: 4.49,
    unit: "half-gallon",
    category: "dairy",
    farm: {
      id: "farm7",
      name: "Meadow Dairy",
      location: "Madison, WI",
      distance: 18
    },
    organic: true,
    images: ["/placeholder.svg"],
    stock: 15,
    harvestDate: "2025-04-13",
    expiryDate: "2025-04-20",
    farmingPractices: ["Grass-fed cows", "No hormones", "Ethical animal treatment"],
    nutrition: ["Calcium", "Protein", "Vitamin D"],
    reviews: [
      { id: "r12", user: "Olivia N.", rating: 5, comment: "The best milk I've ever tasted. So creamy!", date: "2025-04-13" },
      { id: "r13", user: "Daniel K.", rating: 5, comment: "You can really taste the difference with this milk. Worth every penny.", date: "2025-04-11" }
    ],
    relatedProducts: ["1", "4", "5"]
  }
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProduct = () => {
      setLoading(true);
      setError(null);
      
      // Find the product by ID
      const foundProduct = mockProducts.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Find related products
        if (foundProduct.relatedProducts && foundProduct.relatedProducts.length > 0) {
          const related = foundProduct.relatedProducts
            .map(relId => mockProducts.find(p => p.id === relId))
            .filter(Boolean);
          setRelatedProducts(related as any[]);
        }
      } else {
        setError("Product not found");
      }
      
      setLoading(false);
    };
    
    fetchProduct();
  }, [id]);
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    // In a real app, this would call a cart service
    toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart`, {
      description: `${product.name} x ${quantity} ($${(product.price * quantity).toFixed(2)})`
    });
  };
  
  const handleFavorite = () => {
    toast.success(`${product.name} added to favorites`);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12 border rounded-lg">
          <h2 className="text-xl font-semibold text-red-500">Error: {error}</h2>
          <p className="text-muted-foreground mt-2">Please try another product or go back to the marketplace.</p>
          <Button className="mt-4" onClick={() => navigate("/marketplace")}>
            Return to Marketplace
          </Button>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12 border rounded-lg">
          <h2 className="text-xl font-semibold">Product Not Found</h2>
          <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-4" onClick={() => navigate("/marketplace")}>
            Return to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / product.reviews.length;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center text-muted-foreground"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Gallery */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden aspect-square">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img: string, idx: number) => (
                <div
                  key={idx}
                  className={`border rounded-md overflow-hidden w-20 h-20 flex-shrink-0 cursor-pointer ${
                    idx === activeImage ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img
                    src={img}
                    alt={`${product.name} - view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500">
                    <Star className="h-4 w-4 fill-amber-500" />
                    <span className="ml-1 font-medium">{averageRating.toFixed(1)}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews.length} reviews)
                  </span>
                  {product.organic && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
                      <Leaf className="h-3 w-3" />
                      Organic
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">per {product.unit}</div>
              </div>
            </div>
            
            <div 
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary cursor-pointer"
              onClick={() => navigate(`/farm/${product.farm.id}`)}
            >
              <Store className="h-4 w-4" />
              <span>From {product.farm.name} • {product.farm.location} ({product.farm.distance} miles away)</span>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <Tabs defaultValue="description" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <p>{product.description}</p>
              </TabsContent>
              
              <TabsContent value="details" className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Harvest Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Harvest Date:</span>
                          <span>{new Date(product.harvestDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Best Before:</span>
                          <span>{new Date(product.expiryDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Leaf className="h-4 w-4 mr-2" />
                        Farming Practices
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {product.farmingPractices.map((practice: string, idx: number) => (
                          <li key={idx}>{practice}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Nutrition Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.nutrition.map((info: string, idx: number) => (
                        <li key={idx}>{info}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl font-bold">{averageRating.toFixed(1)}</div>
                        <div className="flex items-center justify-center text-amber-500">
                          <Star className="h-3 w-3 fill-amber-500" />
                          <Star className="h-3 w-3 fill-amber-500" />
                          <Star className="h-3 w-3 fill-amber-500" />
                          <Star className="h-3 w-3 fill-amber-500" />
                          <Star className="h-3 w-3 fill-amber-500 opacity-50" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-medium">{product.reviews.length} Reviews</div>
                      <Button variant="outline" size="sm" className="mt-1">
                        Write a Review
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {product.reviews.map((review: any) => (
                      <div key={review.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{review.user}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="mt-2">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Warehouse className="h-4 w-4 text-muted-foreground" />
                <span>
                  {product.stock > 10 
                    ? <span className="text-green-600">In Stock</span> 
                    : product.stock > 0 
                      ? <span className="text-amber-600">Low Stock - Only {product.stock} left</span>
                      : <span className="text-red-600">Out of Stock</span>
                  }
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span>Delivery available within {product.farm.distance + 10} miles</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-none"
                >
                  -
                </Button>
                <div className="w-12 text-center">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10 rounded-none"
                >
                  +
                </Button>
              </div>
              
              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              
              <Button variant="outline" size="icon" onClick={handleFavorite}>
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <Card key={related.id} className="overflow-hidden">
                <div 
                  className="h-48 relative cursor-pointer"
                  onClick={() => navigate(`/product/${related.id}`)}
                >
                  <img 
                    src={related.images[0]} 
                    alt={related.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                  {related.organic && (
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
                      onClick={() => navigate(`/product/${related.id}`)}
                    >
                      {related.name}
                    </h3>
                    <p className="font-bold">${related.price.toFixed(2)}</p>
                  </div>
                  <p 
                    className="text-sm text-muted-foreground cursor-pointer hover:text-primary"
                    onClick={() => navigate(`/farm/${related.farm.id}`)}
                  >
                    {related.farm.name}
                  </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full"
                    onClick={() => {
                      toast.success(`${related.name} added to cart`);
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

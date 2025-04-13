
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { StarIcon, ShoppingCart, Leaf, Info, ChevronRight, Clock, Calendar, Store, Tag, Truck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Sample product data (in a real app, this would come from an API)
const product = {
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
  description: "These vine-ripened organic tomatoes are grown without synthetic pesticides or fertilizers. They're harvested at peak ripeness for maximum flavor and nutrition.",
  harvestDate: "2025-04-10",
  expiryDate: "2025-04-20",
  inStock: 45,
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  farmingPractices: ["Organic", "Non-GMO", "Sustainable", "Hand-Picked"],
  nutritionFacts: {
    calories: 18,
    protein: "0.9g",
    carbs: "3.9g",
    fat: "0.2g",
    fiber: "1.2g",
    vitamins: ["Vitamin C", "Vitamin K", "Potassium", "Folate"]
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  useEffect(() => {
    // In a real app, you would fetch the product data based on the ID
    console.log(`Fetching product with ID: ${id}`);
    // For now, we're using static data
  }, [id]);
  
  const handleAddToCart = () => {
    // Get existing cart
    const existingCart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart') || '[]')
      : [];
    
    // Check if item already exists in cart
    const existingItem = existingCart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      // Update quantity if item exists
      existingItem.quantity += quantity;
    } else {
      // Add new item if it doesn't exist
      existingCart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0],
        farm: product.farm
      });
    }
    
    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Trigger storage event for other components that might be listening
    window.dispatchEvent(new Event('storage'));
    
    toast.success(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart`);
  };
  
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increment = () => {
    if (quantity < product.inStock) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Sorry, only ${product.inStock} items in stock`);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Breadcrumb */}
      <nav className="mb-6 flex text-sm">
        <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link to="/marketplace" className="text-muted-foreground hover:text-foreground">Marketplace</Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link to={`/category/${product.category.toLowerCase()}`} className="text-muted-foreground hover:text-foreground">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border bg-white">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="h-full w-full object-contain" 
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`aspect-square overflow-hidden rounded-lg border bg-white 
                  ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} view ${index + 1}`}
                  className="h-full w-full object-contain" 
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Link 
              to={`/farm/${product.farmId}`} 
              className="text-sm text-muted-foreground hover:underline"
            >
              {product.farm} • {product.distance} away
            </Link>
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            <div className="flex items-center mt-2 space-x-2">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="ml-1 text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
              {product.organic && (
                <Badge className="bg-green-600">
                  <Leaf className="h-3 w-3 mr-1" />
                  Organic
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-end">
            <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>
            <div className="text-lg text-muted-foreground ml-2">/ {product.unit}</div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <div className="text-sm font-medium">Harvest Date</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(product.harvestDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <div className="text-sm font-medium">Best Before</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(product.expiryDate).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Store className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <div className="text-sm font-medium">In Stock</div>
                <div className="text-sm text-muted-foreground">
                  {product.inStock} {product.unit}s available
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Tag className="h-5 w-5 text-muted-foreground mr-2" />
              <div>
                <div className="text-sm font-medium">Category</div>
                <div className="text-sm text-muted-foreground">
                  {product.category}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {product.farmingPractices.map((practice, index) => (
              <Badge key={index} variant="outline" className="rounded-full">
                {practice}
              </Badge>
            ))}
          </div>
          
          <Separator />
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-none rounded-l-md"
                onClick={decrement}
              >
                -
              </Button>
              <div className="h-10 w-12 flex items-center justify-center text-center">
                {quantity}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-none rounded-r-md"
                onClick={increment}
              >
                +
              </Button>
            </div>
            <Button 
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <Truck className="h-4 w-4 mr-2" />
            <span>Free delivery for orders over $35</span>
          </div>
        </div>
      </div>
      
      {/* Additional Information Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Farm Details</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition Facts</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-4">
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <img 
                    src="/placeholder.svg" 
                    alt={product.farm}
                    className="rounded-lg object-cover w-full h-40" 
                  />
                  <h3 className="text-lg font-medium mt-4">{product.farm}</h3>
                  <p className="text-sm text-muted-foreground">
                    Established in 2010 • {product.distance} away
                  </p>
                  <Button variant="outline" className="mt-4 w-full" asChild>
                    <Link to={`/farm/${product.farmId}`}>
                      Visit Farm Page
                    </Link>
                  </Button>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-medium mb-2">About this Farm</h3>
                  <p className="text-muted-foreground">
                    Green Acres Farm is a family-owned organic farm located just outside the city. 
                    We're dedicated to sustainable farming practices and producing the highest quality 
                    organic vegetables. Our tomatoes are grown using traditional methods without 
                    synthetic pesticides or fertilizers.
                  </p>
                  <h3 className="text-lg font-medium mt-6 mb-2">Farming Practices</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <Info className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                      <span>Our vegetables are grown using organic methods certified by USDA Organic.</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                      <span>We use natural pest control methods and crop rotation to maintain soil health.</span>
                    </li>
                    <li className="flex items-start">
                      <Info className="h-5 w-5 mr-2 mt-0.5 text-primary" />
                      <span>All our produce is hand-picked at peak ripeness for maximum flavor and nutrition.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="nutrition" className="py-4">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Nutrition Information</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Per 100g serving of {product.name}
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium">Calories</h4>
                    <p className="text-lg">{product.nutritionFacts.calories}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Protein</h4>
                    <p className="text-lg">{product.nutritionFacts.protein}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Carbohydrates</h4>
                    <p className="text-lg">{product.nutritionFacts.carbs}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Fat</h4>
                    <p className="text-lg">{product.nutritionFacts.fat}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Fiber</h4>
                    <p className="text-lg">{product.nutritionFacts.fiber}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Vitamins & Minerals</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.nutritionFacts.vitamins.map((vitamin, index) => (
                      <Badge key={index} variant="outline">
                        {vitamin}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground mt-4">
                  <p className="italic">
                    Note: Nutritional information is approximate and may vary based on 
                    growing conditions and time of harvest.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium">JD</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">John Doe</h4>
                      <span className="text-sm text-muted-foreground">3 days ago</span>
                    </div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      These tomatoes are amazing! So fresh and flavorful, much better than what you find in the grocery store.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium">SM</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Sarah Miller</h4>
                      <span className="text-sm text-muted-foreground">1 week ago</span>
                    </div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Really good quality tomatoes. They lasted for over a week in the fridge and taste great in salads.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium">RJ</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Robert Johnson</h4>
                      <span className="text-sm text-muted-foreground">2 weeks ago</span>
                    </div>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      I'm impressed by the quality. You can really taste the difference when produce is this fresh.
                    </p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Load More Reviews
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src="/placeholder.svg"
                  alt="Related product"
                  className="object-cover w-full h-full"
                />
                {item % 2 === 0 && (
                  <Badge className="absolute top-2 right-2 bg-green-600">
                    Organic
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <Link to={`/product/related-${item}`} className="hover:underline">
                  <h3 className="font-medium">Related Product {item}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">Some Farm</p>
                <div className="flex items-center gap-1 my-1">
                  <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">4.{item} (1{item})</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">
                    ${(3.99 + item * 0.5).toFixed(2)}
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
      </div>
    </div>
  );
}

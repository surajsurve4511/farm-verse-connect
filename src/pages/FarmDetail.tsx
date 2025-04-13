
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, Calendar, Star, Leaf, ShoppingCart, 
  Mail, Phone, ChevronRight, Globe, Clock, Check
} from "lucide-react";

// Sample farm data (in a real app, this would come from an API)
const farm = {
  id: "green-acres",
  name: "Green Acres Farm",
  location: "Riverside, CA",
  distance: "12 mi",
  coordinates: { lat: 33.9806, lng: -117.3755 },
  description: "Green Acres is a family-owned organic farm nestled in the beautiful countryside of Riverside, CA. We've been growing organic vegetables and fruits since 2010, focusing on sustainable farming practices that respect the land and produce the most nutritious and flavorful crops possible. Our mission is to bring the freshest organic produce directly from our fields to your table.",
  established: 2010,
  rating: 4.8,
  reviewCount: 45,
  organic: true,
  certifications: ["USDA Organic", "Certified Humane", "Non-GMO Project Verified"],
  farmingPractices: [
    "Organic Cultivation",
    "Crop Rotation",
    "Integrated Pest Management",
    "Rainwater Harvesting",
    "Composting"
  ],
  gallery: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ],
  contact: {
    email: "info@greenacresfarm.com",
    phone: "(555) 123-4567",
    website: "www.greenacresfarm.com",
    hours: "Mon-Sat: 8AM-6PM, Sun: 9AM-4PM"
  },
  products: [
    {
      id: "organic-tomatoes",
      name: "Organic Tomatoes",
      price: 4.99,
      unit: "kg",
      category: "Vegetables",
      organic: true,
      image: "/placeholder.svg",
    },
    {
      id: "organic-lettuce",
      name: "Organic Lettuce",
      price: 3.49,
      unit: "bunch",
      category: "Vegetables",
      organic: true,
      image: "/placeholder.svg",
    },
    {
      id: "organic-carrots",
      name: "Organic Carrots",
      price: 2.99,
      unit: "kg",
      category: "Vegetables",
      organic: true,
      image: "/placeholder.svg",
    },
    {
      id: "organic-apples",
      name: "Organic Apples",
      price: 6.99,
      unit: "kg",
      category: "Fruits",
      organic: true,
      image: "/placeholder.svg",
    },
    {
      id: "organic-strawberries",
      name: "Organic Strawberries",
      price: 8.99,
      unit: "basket",
      category: "Fruits",
      organic: true,
      image: "/placeholder.svg",
    },
    {
      id: "farm-fresh-eggs",
      name: "Farm Fresh Eggs",
      price: 7.49,
      unit: "dozen",
      category: "Eggs",
      organic: true,
      image: "/placeholder.svg",
    }
  ]
};

export default function FarmDetail() {
  const { id } = useParams();
  
  useEffect(() => {
    // In a real app, you would fetch the farm data based on the ID
    console.log(`Fetching farm with ID: ${id}`);
    // For now, we're using static data
    window.scrollTo(0, 0);
  }, [id]);
  
  const [activeImage, setActiveImage] = useState(0);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Farm Header */}
      <div className="relative">
        <div className="h-64 md:h-80 overflow-hidden">
          <img 
            src={farm.gallery[0]} 
            alt={farm.name}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative -mt-24">
          <div className="bg-background rounded-lg shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                {farm.organic && (
                  <Badge className="bg-green-600">
                    <Leaf className="h-3 w-3 mr-1" />
                    Certified Organic
                  </Badge>
                )}
                <h1 className="text-3xl font-bold">{farm.name}</h1>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {farm.location} • {farm.distance} away
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{farm.rating}</span>
                  <span className="ml-1 text-muted-foreground">
                    ({farm.reviewCount} reviews)
                  </span>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-muted-foreground">
                    Est. {farm.established}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-0">
                <Button>Contact Farm</Button>
                <Button variant="outline">
                  Visit Website
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Farm Content */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="space-y-6 py-4">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">About Our Farm</h2>
                    <p className="text-muted-foreground mb-6">
                      {farm.description}
                    </p>
                    
                    <h3 className="font-bold mt-6 mb-3">Our Certifications</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {farm.certifications.map((certification, index) => (
                        <Badge key={index} variant="outline">
                          {certification}
                        </Badge>
                      ))}
                    </div>
                    
                    <h3 className="font-bold mt-6 mb-3">Sustainable Farming Practices</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {farm.farmingPractices.map((practice, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                          <span>{practice}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="products" className="py-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Farm Products</h2>
                      <Button variant="outline" asChild>
                        <Link to={`/marketplace?farm=${farm.id}`}>
                          View All Products
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {farm.products.map(product => (
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
                          <CardContent className="p-4">
                            <Link to={`/product/${product.id}`}>
                              <h3 className="font-medium hover:underline">
                                {product.name}
                              </h3>
                            </Link>
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
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="gallery" className="py-4">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">Farm Gallery</h2>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <img 
                          src={farm.gallery[activeImage]} 
                          alt={`${farm.name} gallery image ${activeImage + 1}`}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-6 gap-2">
                        {farm.gallery.map((image, index) => (
                          <button
                            key={index}
                            className={`aspect-square rounded-md overflow-hidden border-2 ${
                              activeImage === index ? "border-primary" : "border-transparent"
                            }`}
                            onClick={() => setActiveImage(index)}
                          >
                            <img 
                              src={image} 
                              alt={`${farm.name} thumbnail ${index + 1}`}
                              className="w-full h-full object-cover" 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="py-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Customer Reviews</h2>
                      <Button>Write a Review</Button>
                    </div>
                    
                    <div className="space-y-6">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b border-border pb-6 last:border-0">
                          <div className="flex items-start space-x-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="font-medium">U{review}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h4 className="font-medium">User {review}</h4>
                                <span className="text-sm text-muted-foreground">
                                  {review} week{review !== 1 ? 's' : ''} ago
                                </span>
                              </div>
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < 5 - (review % 2) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="mt-2 text-muted-foreground">
                                {review === 1 
                                  ? "I've been buying from this farm for years. Their produce is always fresh and delicious. The staff is friendly and helpful too!"
                                  : review === 2
                                  ? "Great farm with amazing organic vegetables. The tomatoes and lettuce are exceptional. Will definitely keep coming back."
                                  : "I appreciate their commitment to sustainable farming practices. You can really taste the difference in their products compared to store-bought."}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full">
                        Load More Reviews
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-sm text-muted-foreground">
                        123 Farm Road, Riverside, CA 92501
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a 
                        href={`mailto:${farm.contact.email}`} 
                        className="text-sm text-primary hover:underline"
                      >
                        {farm.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <a 
                        href={`tel:${farm.contact.phone}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {farm.contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Website</h4>
                      <a 
                        href={`https://${farm.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {farm.contact.website}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Hours</h4>
                      <p className="text-sm text-muted-foreground">
                        {farm.contact.hours}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Farm Map */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Farm Location</h3>
                <div className="aspect-square bg-muted rounded-md overflow-hidden">
                  {/* In a real app, this would be a map component */}
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Map View <br />
                      {farm.coordinates.lat}, {farm.coordinates.lng}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  Get Directions
                </Button>
              </CardContent>
            </Card>
            
            {/* Featured Products */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Featured Products</h3>
                <div className="space-y-4">
                  {farm.products.slice(0, 3).map(product => (
                    <div key={product.id} className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <Link 
                          to={`/product/${product.id}`}
                          className="font-medium hover:underline"
                        >
                          {product.name}
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          ${product.price.toFixed(2)} / {product.unit}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to={`/marketplace?farm=${farm.id}`}>
                    View All Products
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* More Farms Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">More Farms Near You</h2>
            <Button variant="outline" asChild>
              <Link to="/farms">View All Farms</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(farmIndex => (
              <Card key={farmIndex} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img 
                    src="/placeholder.svg" 
                    alt={`Farm ${farmIndex}`}
                    className="w-full h-full object-cover" 
                  />
                  {farmIndex % 2 === 0 && (
                    <Badge className="absolute top-2 right-2 bg-green-600">
                      <Leaf className="h-3 w-3 mr-1" />
                      Organic
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location • {5 + farmIndex * 3} mi away
                  </div>
                  <Link to={`/farm/sample-${farmIndex}`}>
                    <h3 className="font-medium hover:underline">Farm Name {farmIndex}</h3>
                  </Link>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1">{4.0 + farmIndex * 0.2}</span>
                    <span className="text-xs text-muted-foreground ml-1">(2{farmIndex})</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                    <Link to={`/farm/sample-${farmIndex}`}>View Farm</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

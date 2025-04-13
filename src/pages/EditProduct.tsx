
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Organic Tomatoes",
    price: 4.99,
    unit: "kg",
    category: "vegetables",
    description: "These vine-ripened organic tomatoes are grown without synthetic pesticides or fertilizers. They're harvested at peak ripeness for maximum flavor and nutrition.",
    organic: true,
    stock: 45,
    sku: "ORG-TOM-001",
    harvestDate: "2025-04-10",
    expiryDate: "2025-04-20",
    farmingPractices: "No synthetic pesticides, Sustainable irrigation, Hand-picked",
    nutrition: "Rich in vitamin C, Low in calories, Good source of potassium"
  },
  {
    id: "2",
    name: "Fresh Carrots",
    price: 3.49,
    unit: "bundle",
    category: "vegetables",
    description: "Sweet and crunchy carrots harvested at the perfect time. Great for snacking, cooking, or juicing.",
    organic: true,
    stock: 32,
    sku: "ORG-CAR-002",
    harvestDate: "2025-04-12",
    expiryDate: "2025-04-25",
    farmingPractices: "Organic cultivation, Crop rotation, Natural pest management",
    nutrition: "High in beta-carotene, Vitamin A, and fiber"
  },
];

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [product, setProduct] = useState<any>(null);
  
  useEffect(() => {
    // In a real app, you would fetch the product data based on the ID
    const fetchedProduct = mockProducts.find(p => p.id === id);
    
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      toast.error("Product not found");
      navigate('/farmer/dashboard');
    }
  }, [id, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Product updated successfully!");
      setIsSubmitting(false);
      navigate("/farmer/dashboard");
    }, 1500);
  };
  
  const handleDelete = () => {
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Product deleted successfully!");
      setIsDeleting(false);
      navigate("/farmer/dashboard");
    }, 1500);
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading product data...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Product</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product
                and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update the core details about your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    defaultValue={product.name}
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input 
                        id="price" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        defaultValue={product.price}
                        className="pl-7" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select defaultValue={product.unit}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="lb">Pound (lb)</SelectItem>
                        <SelectItem value="g">Gram (g)</SelectItem>
                        <SelectItem value="oz">Ounce (oz)</SelectItem>
                        <SelectItem value="each">Each</SelectItem>
                        <SelectItem value="bundle">Bundle</SelectItem>
                        <SelectItem value="dozen">Dozen</SelectItem>
                        <SelectItem value="basket">Basket</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue={product.category}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="meat">Meat</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="eggs">Eggs</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="specialty">Specialty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    defaultValue={product.description}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="organic" defaultChecked={product.organic} />
                  <Label htmlFor="organic">This is an organic product</Label>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Inventory & Availability</CardTitle>
                <CardDescription>
                  Manage stock and availability settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Available Stock</Label>
                    <Input 
                      id="stock" 
                      type="number" 
                      min="0" 
                      defaultValue={product.stock}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU/Item Code (Optional)</Label>
                    <Input 
                      id="sku" 
                      defaultValue={product.sku}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="harvest-date">Harvest Date</Label>
                    <Input 
                      id="harvest-date" 
                      type="date" 
                      defaultValue={product.harvestDate}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Best Before Date</Label>
                    <Input 
                      id="expiry-date" 
                      type="date" 
                      defaultValue={product.expiryDate}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Update photos of your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-2 bg-muted">
                  <img 
                    src="/placeholder.svg" 
                    alt="Product preview" 
                    className="w-full h-40 object-contain"
                  />
                </div>
                
                <div className="flex justify-between gap-2">
                  <Button variant="outline" type="button" size="sm" className="flex-1">
                    Replace
                  </Button>
                  <Button variant="outline" type="button" size="sm" className="flex-1">
                    Add More
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
                <CardDescription>
                  Extra details to highlight your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farming-practices">Farming Practices</Label>
                  <Textarea 
                    id="farming-practices" 
                    defaultValue={product.farmingPractices}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nutrition">Nutrition Information (Optional)</Label>
                  <Textarea 
                    id="nutrition" 
                    defaultValue={product.nutrition}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, Select, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function AddProduct() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Product added successfully!");
      setIsSubmitting(false);
      navigate("/farmer/dashboard");
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the core details about your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="e.g., Organic Tomatoes" required />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input id="price" type="number" step="0.01" min="0" placeholder="0.00" className="pl-7" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
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
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                    placeholder="Describe your product in detail. Include information about how it's grown, flavor profile, etc."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="organic" />
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
                    <Input id="stock" type="number" min="0" placeholder="Quantity available" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU/Item Code (Optional)</Label>
                    <Input id="sku" placeholder="e.g., ORG-TOM-001" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="harvest-date">Harvest Date</Label>
                    <Input id="harvest-date" type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Best Before Date</Label>
                    <Input id="expiry-date" type="date" />
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
                  Upload photos of your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-muted">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-muted-foreground"
                    >
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
                      <path d="M12 11v6" />
                      <path d="M9 14h6" />
                    </svg>
                  </div>
                  <div className="mt-4">
                    <Button variant="secondary" type="button">
                      Upload Images
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    PNG, JPG up to 5MB. First image will be the featured image.
                  </p>
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
                    placeholder="e.g., No synthetic pesticides, Sustainable irrigation"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="nutrition">Nutrition Information (Optional)</Label>
                  <Textarea 
                    id="nutrition" 
                    placeholder="e.g., Rich in vitamin C, Low in calories"
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
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}

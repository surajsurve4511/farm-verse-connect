
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  ArrowUpDown, Check, Filter, Plus, Search, Upload 
} from "lucide-react";
import { ProductItem } from "@/components/products/ProductItem";
import { ProductForm } from "@/components/products/ProductForm";

// Mock data
const products = [
  {
    id: "PROD-001",
    name: "Organic Tomatoes",
    price: 4.99,
    unit: "kg",
    category: "Vegetables",
    organic: true,
    inStock: 45,
    image: "/placeholder.svg",
  },
  {
    id: "PROD-002",
    name: "Fresh Carrots Bundle",
    price: 3.49,
    unit: "bundle",
    category: "Vegetables",
    organic: true,
    inStock: 12,
    image: "/placeholder.svg",
  },
  {
    id: "PROD-003",
    name: "Grass-fed Beef",
    price: 15.99,
    unit: "kg",
    category: "Meat",
    organic: false,
    inStock: 8,
    image: "/placeholder.svg",
  },
  {
    id: "PROD-004",
    name: "Free-range Eggs",
    price: 6.99,
    unit: "dozen",
    category: "Eggs",
    organic: true,
    inStock: 24,
    image: "/placeholder.svg",
  },
  {
    id: "PROD-005",
    name: "Organic Apple Basket",
    price: 8.99,
    unit: "basket",
    category: "Fruits",
    organic: true,
    inStock: 3,
    image: "/placeholder.svg",
  },
  {
    id: "PROD-006",
    name: "Freshly Baked Bread",
    price: 4.50,
    unit: "loaf",
    category: "Bakery",
    organic: false,
    inStock: 18,
    image: "/placeholder.svg",
  },
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">
          Manage your farm products inventory.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center w-full sm:w-auto space-x-2">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription>Fill in the details to add a new product to your inventory.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductForm onCancel={() => setShowForm(false)} />
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No products match your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="table" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-10 w-10 rounded-md object-cover" 
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="flex items-center mt-1">
                              {product.organic && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 mr-1">
                                  Organic
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)} / {product.unit}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={product.inStock < 5 ? "destructive" : product.inStock < 20 ? "outline" : "secondary"}
                        >
                          {product.inStock} in stock
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No products match your search criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

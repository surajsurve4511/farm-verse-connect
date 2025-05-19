
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  organic: boolean;
  inStock: number;
  image: string;
}

interface ProductItemProps {
  product: Product;
  onDelete?: (id: string) => void;
}

export function ProductItem({ product, onDelete }: ProductItemProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    navigate(`/products/edit/${product.id}`);
  };

  const handleDelete = async () => {
    if (!onDelete) {
      toast({
        title: "Action not available",
        description: "Delete functionality is not available in this view",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsDeleting(true);
      await onDelete(product.id);
      toast({
        title: "Product deleted",
        description: `${product.name} has been deleted successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full relative overflow-hidden">
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
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{product.name}</CardTitle>
          <Badge variant={product.inStock < 5 ? "destructive" : product.inStock < 20 ? "outline" : "secondary"}>
            {product.inStock} left
          </Badge>
        </div>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-xl font-bold">
          ${product.price.toFixed(2)} <span className="text-sm text-muted-foreground font-normal">/ {product.unit}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-red-500 hover:bg-red-50"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
}

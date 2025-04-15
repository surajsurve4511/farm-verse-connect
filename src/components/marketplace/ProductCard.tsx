
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Star } from "lucide-react";

export function ProductCard() {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-square">
        <img
          src="/placeholder.svg"
          alt="Product"
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute top-2 left-2 bg-green-100 text-green-800 flex items-center gap-1">
          <Leaf className="h-3 w-3" />
          Organic
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">Organic Tomatoes</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="ml-1 text-sm">4.8</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2">Green Valley Farms</p>
        <p className="font-bold">$4.99/kg</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}

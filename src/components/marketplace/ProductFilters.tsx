
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export function ProductFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Categories</h3>
          <div className="space-y-2">
            {["Vegetables", "Fruits", "Dairy", "Eggs", "Meat", "Bakery"].map((category) => (
              <div key={category} className="flex items-center">
                <Checkbox id={category.toLowerCase()} />
                <Label htmlFor={category.toLowerCase()} className="ml-2">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Price Range</h3>
          <Slider
            defaultValue={[0, 100]}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>$0</span>
            <span>$100</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Other Filters</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox id="organic" />
              <Label htmlFor="organic" className="ml-2">
                Organic Only
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="inStock" />
              <Label htmlFor="inStock" className="ml-2">
                In Stock
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const inventoryItems = [
  {
    id: "PROD-001",
    name: "Organic Tomatoes",
    quantity: 45,
    total: 100,
    status: "normal", // normal, low, critical
    category: "Vegetables",
    lastUpdated: "2025-04-05"
  },
  {
    id: "PROD-002",
    name: "Fresh Carrots Bundle",
    quantity: 12,
    total: 50,
    status: "low",
    category: "Vegetables",
    lastUpdated: "2025-04-05"
  },
  {
    id: "PROD-003",
    name: "Grass-fed Beef",
    quantity: 8,
    total: 50,
    status: "low",
    category: "Meat",
    lastUpdated: "2025-04-04"
  },
  {
    id: "PROD-004",
    name: "Free-range Eggs",
    quantity: 24,
    total: 100,
    status: "normal",
    category: "Eggs",
    lastUpdated: "2025-04-04"
  },
  {
    id: "PROD-005",
    name: "Organic Apple Basket",
    quantity: 3,
    total: 40,
    status: "critical",
    category: "Fruits",
    lastUpdated: "2025-04-03"
  },
];

export function InventoryStatus() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventoryItems.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>
              <Badge
                variant={
                  item.status === "critical" 
                  ? "destructive" 
                  : item.status === "low" 
                  ? "outline"
                  : "secondary"
                }
              >
                {item.status.toUpperCase()}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-full max-w-xs">
                  <Progress 
                    value={(item.quantity / item.total) * 100} 
                    className={
                      item.status === "critical" 
                      ? "bg-red-200" 
                      : item.status === "low" 
                      ? "bg-yellow-200"
                      : ""
                    }
                  />
                </div>
                <span className="text-xs whitespace-nowrap">
                  {item.quantity}/{item.total}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground text-sm">{item.lastUpdated}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

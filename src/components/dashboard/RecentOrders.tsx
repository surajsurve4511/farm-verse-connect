
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOrderStatusProps } from "@/lib/utils";

interface RecentOrdersProps {
  fullView?: boolean;
}

// Sample data
const recentOrders = [
  {
    id: "ORD-001",
    product: "Organic Tomatoes",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg"
    },
    status: "processing",
    date: "2025-04-05",
    amount: "$24.50",
  },
  {
    id: "ORD-002",
    product: "Fresh Carrots Bundle",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "/placeholder.svg"
    },
    status: "completed",
    date: "2025-04-04",
    amount: "$18.25",
  },
  {
    id: "ORD-003",
    product: "Grass-fed Beef",
    customer: {
      name: "Michael Wong",
      email: "michael.w@example.com",
      avatar: "/placeholder.svg"
    },
    status: "pending",
    date: "2025-04-03",
    amount: "$76.00",
  },
  {
    id: "ORD-004",
    product: "Free-range Eggs",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "/placeholder.svg"
    },
    status: "completed",
    date: "2025-04-02",
    amount: "$12.99",
  },
  {
    id: "ORD-005",
    product: "Organic Apple Basket",
    customer: {
      name: "Robert Brown",
      email: "robert.b@example.com",
      avatar: "/placeholder.svg"
    },
    status: "cancelled",
    date: "2025-04-01",
    amount: "$32.50",
  },
];

export function RecentOrders({ fullView = false }: RecentOrdersProps) {
  const displayedOrders = fullView ? recentOrders : recentOrders.slice(0, 4);
  
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                    <AvatarFallback>{order.customer.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-0.5 text-xs">
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-muted-foreground">{order.customer.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge {...getOrderStatusProps(order.status)} />
              </TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell className="text-right">{order.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {fullView && (
        <div className="flex justify-end">
          <Button>Download CSV</Button>
        </div>
      )}
      
      {!fullView && recentOrders.length > 4 && (
        <div className="flex justify-center">
          <Button variant="outline">View All Orders</Button>
        </div>
      )}
    </div>
  );
}

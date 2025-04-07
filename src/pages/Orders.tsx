
import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "@/components/ui/card";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Search } from "lucide-react";
import { GetOrderStatus } from "@/lib/utils";
import { OrderDetails } from "@/components/orders/OrderDetails";

// Sample data
const orders = [
  {
    id: "ORD-001",
    customer: {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "555-123-4567",
      address: "123 Main St, Farmville, CA 12345"
    },
    date: "2025-04-05",
    status: "processing",
    total: 24.50,
    items: [
      { name: "Organic Tomatoes", quantity: 2, price: 4.99, subtotal: 9.98 },
      { name: "Fresh Carrots Bundle", quantity: 1, price: 3.49, subtotal: 3.49 },
      { name: "Free-range Eggs", quantity: 1, price: 6.99, subtotal: 6.99 }
    ],
    shipping: 4.99,
    tax: 2.03
  },
  {
    id: "ORD-002",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      phone: "555-987-6543",
      address: "456 Oak Ave, Riverside, CA 67890"
    },
    date: "2025-04-04",
    status: "completed",
    total: 18.25,
    items: [
      { name: "Fresh Carrots Bundle", quantity: 2, price: 3.49, subtotal: 6.98 },
      { name: "Organic Apple Basket", quantity: 1, price: 8.99, subtotal: 8.99 }
    ],
    shipping: 4.99,
    tax: 1.51
  },
  {
    id: "ORD-003",
    customer: {
      name: "Michael Wong",
      email: "michael.w@example.com",
      phone: "555-456-7890",
      address: "789 Pine St, Hillside, CA 45678"
    },
    date: "2025-04-03",
    status: "pending",
    total: 76.00,
    items: [
      { name: "Grass-fed Beef", quantity: 3, price: 15.99, subtotal: 47.97 },
      { name: "Organic Tomatoes", quantity: 2, price: 4.99, subtotal: 9.98 },
      { name: "Freshly Baked Bread", quantity: 2, price: 4.50, subtotal: 9.00 }
    ],
    shipping: 4.99,
    tax: 6.29
  },
  {
    id: "ORD-004",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      phone: "555-789-0123",
      address: "321 Cedar Ln, Meadowbrook, CA 54321"
    },
    date: "2025-04-02",
    status: "completed",
    total: 12.99,
    items: [
      { name: "Free-range Eggs", quantity: 1, price: 6.99, subtotal: 6.99 },
      { name: "Freshly Baked Bread", quantity: 1, price: 4.50, subtotal: 4.50 }
    ],
    shipping: 4.99,
    tax: 1.07
  },
  {
    id: "ORD-005",
    customer: {
      name: "Robert Brown",
      email: "robert.b@example.com",
      phone: "555-234-5678",
      address: "654 Maple Dr, Sunnyside, CA 98765"
    },
    date: "2025-04-01",
    status: "cancelled",
    total: 32.50,
    items: [
      { name: "Organic Apple Basket", quantity: 2, price: 8.99, subtotal: 17.98 },
      { name: "Grass-fed Beef", quantity: 1, price: 15.99, subtotal: 15.99 }
    ],
    shipping: 4.99,
    tax: 2.69
  },
];

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const currentOrder = selectedOrder 
    ? orders.find(order => order.id === selectedOrder) 
    : null;

  return (
    <div className="flex flex-col space-y-6 p-6">
      {selectedOrder && currentOrder ? (
        <OrderDetails 
          order={currentOrder} 
          onBack={() => setSelectedOrder(null)} 
        />
      ) : (
        <>
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">
              View and manage customer orders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center w-full sm:w-auto space-x-2">
              <div className="relative w-full sm:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by order ID or customer..."
                  className="pl-8 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="recent">Recent Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>
                    You have a total of {orders.length} orders in your system.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div>
                              <div>{order.customer.name}</div>
                              <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <GetOrderStatus status={order.status} />
                          </TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedOrder(order.id)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {filteredOrders.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No orders match your search criteria.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Orders placed in the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.slice(0, 3).map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div>
                              <div>{order.customer.name}</div>
                              <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <GetOrderStatus status={order.status} />
                          </TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedOrder(order.id)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Orders</CardTitle>
                  <CardDescription>Orders awaiting processing.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders
                        .filter(order => order.status === "pending")
                        .map(order => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                              <div>
                                <div>{order.customer.name}</div>
                                <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedOrder(order.id)}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  
                  {filteredOrders.filter(order => order.status === "pending").length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No pending orders at the moment.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="processing" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Processing Orders</CardTitle>
                  <CardDescription>Orders currently being processed.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders
                        .filter(order => order.status === "processing")
                        .map(order => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                              <div>
                                <div>{order.customer.name}</div>
                                <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedOrder(order.id)}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  
                  {filteredOrders.filter(order => order.status === "processing").length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No orders being processed at the moment.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

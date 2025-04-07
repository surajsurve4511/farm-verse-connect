
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GetOrderStatus } from "@/lib/utils";
import { ArrowLeft, Mail, MapPin, Phone, Printer } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  customer: Customer;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  shipping: number;
  tax: number;
}

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
}

export function OrderDetails({ order, onBack }: OrderDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>Update Status</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">Order {order.id}</CardTitle>
                <CardDescription>Placed on {order.date}</CardDescription>
              </div>
              <GetOrderStatus status={order.status} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Order Items</h3>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="divide-x divide-border">
                        <th className="px-4 py-3.5 text-left text-sm font-semibold">
                          Product
                        </th>
                        <th className="px-4 py-3.5 text-center text-sm font-semibold">
                          Quantity
                        </th>
                        <th className="px-4 py-3.5 text-right text-sm font-semibold">
                          Price
                        </th>
                        <th className="px-4 py-3.5 text-right text-sm font-semibold">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {order.items.map((item, i) => (
                        <tr key={i} className="divide-x divide-border">
                          <td className="px-4 py-3.5 text-sm text-left">
                            {item.name}
                          </td>
                          <td className="px-4 py-3.5 text-sm text-center">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3.5 text-sm text-right">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3.5 text-sm text-right">
                            ${item.subtotal.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-4">Order Summary</h3>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>${order.items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span>${order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax:</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Contact Information</h3>
                <div className="rounded-md border p-3 space-y-3">
                  <div className="flex items-start">
                    <div className="mr-2 mt-0.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border">
                        <Mail className="h-3 w-3" />
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-2 mt-0.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border">
                        <Phone className="h-3 w-3" />
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Shipping Address</h3>
                <div className="rounded-md border p-3">
                  <div className="flex items-start">
                    <div className="mr-2 mt-0.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border">
                        <MapPin className="h-3 w-3" />
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {order.customer.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Payment Information</h3>
                <div className="rounded-md border p-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Method:</span>
                    <span>Credit Card</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Card:</span>
                    <span>**** **** **** 4242</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

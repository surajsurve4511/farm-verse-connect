
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { name: 'Jan', organic: 4000, conventional: 2400 },
  { name: 'Feb', organic: 3000, conventional: 1398 },
  { name: 'Mar', organic: 2000, conventional: 9800 },
  { name: 'Apr', organic: 2780, conventional: 3908 },
  { name: 'May', organic: 1890, conventional: 4800 },
  { name: 'Jun', organic: 2390, conventional: 3800 },
  { name: 'Jul', organic: 3490, conventional: 4300 },
];

const productCategoryData = [
  { name: 'Vegetables', value: 400 },
  { name: 'Fruits', value: 300 },
  { name: 'Dairy', value: 300 },
  { name: 'Meat', value: 200 },
  { name: 'Eggs', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function SalesSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
          <CardDescription>Monthly comparison of organic vs conventional sales</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={salesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="organic" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="conventional" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
          <CardDescription>Product category distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productCategoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {productCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`$${value}`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

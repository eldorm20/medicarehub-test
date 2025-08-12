import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  Clock, 
  CheckCircle, 
  MessageCircle,
  Search,
  Filter,
  Truck,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PharmacySellerDashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('orders');

  // Mock data for demonstration
  const dailyMetrics = {
    ordersToday: 24,
    completedOrders: 18,
    pendingOrders: 6,
    customersServed: 22,
    avgResponseTime: '3.2 min',
    satisfaction: 4.6
  };

  const recentOrders = [
    { 
      id: 'UZ001234', 
      customer: 'Amina Karimova', 
      items: 3, 
      total: 45.50, 
      status: 'pending', 
      time: '10 min ago',
      priority: 'normal'
    },
    { 
      id: 'UZ001235', 
      customer: 'Bekzod Rahimov', 
      items: 1, 
      total: 28.00, 
      status: 'preparing', 
      time: '15 min ago',
      priority: 'urgent'
    },
    { 
      id: 'UZ001236', 
      customer: 'Nargiza Tursunova', 
      items: 5, 
      total: 89.25, 
      status: 'ready', 
      time: '25 min ago',
      priority: 'normal'
    },
    { 
      id: 'UZ001237', 
      customer: 'Sardor Aliyev', 
      items: 2, 
      total: 36.75, 
      status: 'completed', 
      time: '1 hour ago',
      priority: 'normal'
    },
  ];

  const customerQueue = [
    { id: 1, name: 'Dilnoza Hamidova', issue: 'Prescription consultation', waitTime: '5 min', priority: 'high' },
    { id: 2, name: 'Jasur Abdullayev', issue: 'Product inquiry', waitTime: '12 min', priority: 'normal' },
    { id: 3, name: 'Malika Ergasheva', issue: 'Order status', waitTime: '8 min', priority: 'normal' },
  ];

  const performanceData = [
    { day: 'Mon', orders: 28, customers: 25 },
    { day: 'Tue', orders: 32, customers: 28 },
    { day: 'Wed', orders: 24, customers: 22 },
    { day: 'Thu', orders: 35, customers: 31 },
    { day: 'Fri', orders: 29, customers: 27 },
    { day: 'Sat', orders: 42, customers: 38 },
    { day: 'Sun', orders: 18, customers: 16 },
  ];

  const lowStockItems = [
    { name: 'Paracetamol 500mg', current: 8, minimum: 20, supplier: 'PharmaCorp' },
    { name: 'Amoxicillin 250mg', current: 3, minimum: 15, supplier: 'MedSupply' },
    { name: 'Blood Pressure Monitor', current: 1, minimum: 5, supplier: 'HealthTech' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pharmacy Operations</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName || 'Seller'}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <MessageCircle className="h-4 w-4 mr-2" />
            Customer Chat
          </Button>
          <Button>
            <Package className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Daily Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyMetrics.ordersToday}</div>
            <p className="text-xs text-green-600">{dailyMetrics.completedOrders} completed, {dailyMetrics.pendingOrders} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers Served</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyMetrics.customersServed}</div>
            <p className="text-xs text-muted-foreground">Average: 28/day</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyMetrics.avgResponseTime}</div>
            <p className="text-xs text-green-600">Below 5 min target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyMetrics.satisfaction}/5.0</div>
            <p className="text-xs text-green-600">+0.2 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Workspace */}
      <Card>
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription>Process and track customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="orders">Active Orders</TabsTrigger>
              <TabsTrigger value="customers">Customer Queue</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="orders" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Today's Orders</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Search orders..." className="w-64" />
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4">
                {recentOrders.map((order) => (
                  <Card key={order.id} className={`border-l-4 ${
                    order.priority === 'urgent' ? 'border-l-red-500' : 'border-l-blue-500'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-semibold">Order #{order.id}</h4>
                            <p className="text-sm text-muted-foreground">{order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.items} items • ${order.total}</p>
                          </div>
                          {order.priority === 'urgent' && (
                            <Badge variant="destructive">Urgent</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge variant={
                              order.status === 'completed' ? 'default' :
                              order.status === 'ready' ? 'secondary' :
                              order.status === 'preparing' ? 'outline' : 'destructive'
                            }>
                              {order.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{order.time}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">View</Button>
                            {order.status === 'pending' && (
                              <Button size="sm">Process</Button>
                            )}
                            {order.status === 'preparing' && (
                              <Button size="sm">Ready</Button>
                            )}
                            {order.status === 'ready' && (
                              <Button size="sm" variant="secondary">
                                <Truck className="h-4 w-4 mr-1" />
                                Dispatch
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="customers" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Customer Service Queue</h3>
                <Button>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Chat
                </Button>
              </div>
              
              <div className="grid gap-4">
                {customerQueue.map((customer) => (
                  <Card key={customer.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                            <Users className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{customer.name}</h4>
                            <p className="text-sm text-muted-foreground">{customer.issue}</p>
                            <p className="text-xs text-muted-foreground">Waiting: {customer.waitTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {customer.priority === 'high' && (
                            <Badge variant="destructive">High Priority</Badge>
                          )}
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Chat</Button>
                            <Button size="sm">Assist</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Inventory Alerts</h3>
                <Button variant="outline">
                  <Search className="h-4 w-4 mr-2" />
                  Search Inventory
                </Button>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <span>Low Stock Items</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Minimum Required</TableHead>
                        <TableHead>Supplier</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lowStockItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>
                            <Badge variant="destructive">{item.current}</Badge>
                          </TableCell>
                          <TableCell>{item.minimum}</TableCell>
                          <TableCell>{item.supplier}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">Reorder</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="orders" fill="#3b82f6" name="Orders" />
                          <Bar dataKey="customers" fill="#10b981" name="Customers" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Orders Processed</span>
                        <span className="font-bold">156 this week</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Customer Rating</span>
                        <span className="font-bold">4.6/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Response Time</span>
                        <span className="font-bold">3.2 min avg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy Rate</span>
                        <span className="font-bold">98.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sales Target</span>
                        <span className="font-bold text-green-600">112% achieved</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col space-y-2">
              <ShoppingCart className="h-6 w-6" />
              <span>Process Order</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Customer Support</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Package className="h-6 w-6" />
              <span>Check Inventory</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Search className="h-6 w-6" />
              <span>Find Medicine</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacySellerDashboard;
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Users, 
  DollarSign, 
  Package, 
  TrendingUp, 
  BarChart3,
  Store,
  UserCheck,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const PharmacyOwnerDashboard = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const pharmacyMetrics = {
    totalRevenue: 125000,
    totalOrders: 1250,
    branches: 3,
    employees: 15,
    monthlyGrowth: 12.5,
    lowStockItems: 8
  };

  const revenueData = [
    { month: 'Jan', revenue: 18000, orders: 180 },
    { month: 'Feb', revenue: 22000, orders: 220 },
    { month: 'Mar', revenue: 19000, orders: 190 },
    { month: 'Apr', revenue: 25000, orders: 250 },
    { month: 'May', revenue: 28000, orders: 280 },
    { month: 'Jun', revenue: 32000, orders: 320 },
  ];

  const topProducts = [
    { name: 'Paracetamol 500mg', sales: 450, revenue: 2250 },
    { name: 'Amoxicillin 250mg', sales: 320, revenue: 4800 },
    { name: 'Omeprazole 20mg', sales: 280, revenue: 5600 },
    { name: 'Metformin 500mg', sales: 250, revenue: 3750 },
    { name: 'Ibuprofen 400mg', sales: 220, revenue: 2640 },
  ];

  const branches = [
    { id: 1, name: 'Main Branch - Tashkent Center', orders: 145, revenue: 15200, status: 'active' },
    { id: 2, name: 'Branch 2 - Yunusabad', orders: 98, revenue: 10800, status: 'active' },
    { id: 3, name: 'Branch 3 - Chilanzar', orders: 76, revenue: 8500, status: 'active' },
  ];

  const employees = [
    { id: 1, name: 'Dr. Salima Karimova', role: 'Head Pharmacist', branch: 'Main Branch', performance: 95 },
    { id: 2, name: 'Ahmad Rahimov', role: 'Senior Pharmacist', branch: 'Main Branch', performance: 88 },
    { id: 3, name: 'Nilufar Tursunova', role: 'Pharmacist', branch: 'Yunusabad', performance: 92 },
    { id: 4, name: 'Bobur Aliyev', role: 'Pharmacy Technician', branch: 'Chilanzar', performance: 85 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pharmacy Management Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.firstName || 'Owner'}</p>
        </div>
        <div className="flex space-x-2">
          <Button>Add New Branch</Button>
          <Button variant="outline">Generate Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pharmacyMetrics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">+{pharmacyMetrics.monthlyGrowth}% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pharmacyMetrics.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all branches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Branches</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pharmacyMetrics.branches}</div>
            <p className="text-xs text-muted-foreground">All operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pharmacyMetrics.employees}</div>
            <p className="text-xs text-muted-foreground">12 active today</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>Business Analytics</CardTitle>
          <CardDescription>Track your pharmacy network performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="branches">Branches</TabsTrigger>
              <TabsTrigger value="employees">Employees</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>
            
            <TabsContent value="revenue" className="space-y-4">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
                    <Bar dataKey="orders" fill="#10b981" name="Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Top Selling Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${product.revenue}</p>
                            <p className="text-sm text-muted-foreground">Revenue</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Average Order Value</span>
                        <span className="font-bold">$98.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Customer Satisfaction</span>
                        <span className="font-bold">4.8/5.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Order Fulfillment Rate</span>
                        <span className="font-bold">98.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inventory Turnover</span>
                        <span className="font-bold">6.2x</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="branches" className="space-y-4">
              <div className="grid gap-4">
                {branches.map((branch) => (
                  <Card key={branch.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                            <Store className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{branch.name}</h3>
                            <p className="text-sm text-muted-foreground">{branch.orders} orders this month</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${branch.revenue.toLocaleString()}</p>
                          <Badge variant="default">Active</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="employees" className="space-y-4">
              <div className="grid gap-4">
                {employees.map((employee) => (
                  <Card key={employee.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                            <UserCheck className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{employee.name}</h3>
                            <p className="text-sm text-muted-foreground">{employee.role}</p>
                            <p className="text-xs text-muted-foreground">{employee.branch}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{employee.performance}%</p>
                          <p className="text-sm text-muted-foreground">Performance</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      <span>Low Stock Alerts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Amoxicillin 500mg</p>
                          <p className="text-sm text-muted-foreground">Main Branch</p>
                        </div>
                        <Badge variant="destructive">8 left</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Insulin Pen</p>
                          <p className="text-sm text-muted-foreground">Yunusabad</p>
                        </div>
                        <Badge variant="destructive">3 left</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Blood Pressure Monitor</p>
                          <p className="text-sm text-muted-foreground">Chilanzar</p>
                        </div>
                        <Badge variant="destructive">1 left</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Products</span>
                        <span className="font-bold">2,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span>In Stock</span>
                        <span className="font-bold text-green-600">2,380</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Low Stock</span>
                        <span className="font-bold text-orange-600">62</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Out of Stock</span>
                        <span className="font-bold text-red-600">8</span>
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
          <CardTitle>Quick Management Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col space-y-2">
              <Building className="h-6 w-6" />
              <span>Manage Branches</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Staff Management</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Package className="h-6 w-6" />
              <span>Inventory Control</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>Financial Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyOwnerDashboard;
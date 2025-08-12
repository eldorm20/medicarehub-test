import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Shield, 
  Users, 
  Building, 
  Activity, 
  TrendingUp, 
  Settings,
  Database,
  UserCheck,
  AlertTriangle,
  Globe,
  BarChart3,
  Lock
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const SuperAdminDashboard = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data for demonstration
  const platformMetrics = {
    totalUsers: 25000,
    totalPharmacies: 450,
    totalRevenue: 2500000,
    monthlyGrowth: 15.8,
    activeConsultations: 125,
    systemHealth: 99.2
  };

  const userGrowthData = [
    { month: 'Jan', users: 15000, pharmacies: 300 },
    { month: 'Feb', users: 17500, pharmacies: 320 },
    { month: 'Mar', users: 19000, pharmacies: 350 },
    { month: 'Apr', users: 21000, pharmacies: 380 },
    { month: 'May', users: 23000, pharmacies: 420 },
    { month: 'Jun', users: 25000, pharmacies: 450 },
  ];

  const systemMetrics = [
    { name: 'Server Load', value: 45, status: 'good' },
    { name: 'Database Performance', value: 92, status: 'excellent' },
    { name: 'API Response Time', value: 150, unit: 'ms', status: 'good' },
    { name: 'Uptime', value: 99.9, unit: '%', status: 'excellent' },
  ];

  const recentUsers = [
    { id: 1, name: 'Dr. Amina Karimova', email: 'amina@example.com', role: 'pharmacy_owner', status: 'active', joined: '2 hours ago' },
    { id: 2, name: 'Bekzod Rahimov', email: 'bekzod@example.com', role: 'client', status: 'active', joined: '5 hours ago' },
    { id: 3, name: 'Nargiza Tursunova', email: 'nargiza@example.com', role: 'pharmacy_seller', status: 'pending', joined: '1 day ago' },
    { id: 4, name: 'Sardor Aliyev', email: 'sardor@example.com', role: 'client', status: 'active', joined: '2 days ago' },
  ];

  const topPharmacies = [
    { id: 1, name: 'MedCenter Plus', location: 'Tashkent', orders: 2450, revenue: 125000, rating: 4.9 },
    { id: 2, name: 'Health Care Pharmacy', location: 'Samarkand', orders: 1980, revenue: 98000, rating: 4.8 },
    { id: 3, name: 'City Pharmacy Network', location: 'Bukhara', orders: 1750, revenue: 87500, rating: 4.7 },
    { id: 4, name: 'Green Cross Pharmacy', location: 'Nukus', orders: 1420, revenue: 71000, rating: 4.6 },
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High server load detected on Server-02', time: '5 minutes ago' },
    { id: 2, type: 'info', message: 'Database maintenance scheduled for tonight', time: '2 hours ago' },
    { id: 3, type: 'error', message: 'Payment gateway timeout reported', time: '3 hours ago' },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform management and oversight</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Platform Settings
          </Button>
          <Button>
            <Database className="h-4 w-4 mr-2" />
            System Health
          </Button>
        </div>
      </div>

      {/* Platform Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-green-600">+{platformMetrics.monthlyGrowth}% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Pharmacies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.totalPharmacies}</div>
            <p className="text-xs text-muted-foreground">425 verified, 25 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${platformMetrics.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">+18.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformMetrics.systemHealth}%</div>
            <p className="text-xs text-green-600">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Management</CardTitle>
          <CardDescription>Comprehensive platform administration and monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="pharmacies">Pharmacies</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={userGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Users" />
                          <Line type="monotone" dataKey="pharmacies" stroke="#10b981" strokeWidth={2} name="Pharmacies" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {systemAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <div className={`p-1 rounded-full ${
                            alert.type === 'error' ? 'bg-red-100 text-red-600' :
                            alert.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            <AlertTriangle className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{alert.message}</p>
                            <p className="text-sm text-muted-foreground">{alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">User Management</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Search users..." className="w-64" />
                  <Button>Add User</Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role.replace('_', ' ')}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">Block</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="pharmacies" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Pharmacy Management</h3>
                <div className="flex space-x-2">
                  <Input placeholder="Search pharmacies..." className="w-64" />
                  <Button>Verify Pending</Button>
                </div>
              </div>
              <div className="grid gap-4">
                {topPharmacies.map((pharmacy) => (
                  <Card key={pharmacy.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                            <Building className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{pharmacy.name}</h3>
                            <p className="text-sm text-muted-foreground">{pharmacy.location}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-sm">{pharmacy.orders} orders</span>
                              <span className="text-sm">${pharmacy.revenue.toLocaleString()} revenue</span>
                              <span className="text-sm">⭐ {pharmacy.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View Details</Button>
                          <Button size="sm">Manage</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="system" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {systemMetrics.map((metric, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="font-medium">{metric.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold">{metric.value}{metric.unit || ''}</span>
                            <Badge variant={
                              metric.status === 'excellent' ? 'default' :
                              metric.status === 'good' ? 'secondary' : 'destructive'
                            }>
                              {metric.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Security Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Failed Login Attempts</span>
                        <span className="font-bold text-orange-600">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Active Sessions</span>
                        <span className="font-bold text-green-600">1,245</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Security Incidents</span>
                        <span className="font-bold text-red-600">0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>SSL Certificate</span>
                        <Badge variant="default">Valid</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={userGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="users" fill="#3b82f6" name="New Users" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Platform Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Consultations</span>
                        <span className="font-bold">45,280</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prescriptions Processed</span>
                        <span className="font-bold">32,150</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Orders Completed</span>
                        <span className="font-bold">128,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span>User Satisfaction</span>
                        <span className="font-bold">4.7/5.0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Administrative Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Administrative Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col space-y-2">
              <Shield className="h-6 w-6" />
              <span>Security Settings</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Database className="h-6 w-6" />
              <span>Database Management</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Globe className="h-6 w-6" />
              <span>System Configuration</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>Generate Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
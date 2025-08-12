import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Pill, 
  Calendar, 
  TrendingUp, 
  MessageCircle, 
  FileText,
  ShoppingCart,
  Star,
  Activity,
  Clock
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ClientDashboard = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const healthMetrics = {
    consultations: 12,
    prescriptions: 8,
    orders: 15,
    loyaltyPoints: 850,
    loyaltyTier: 'Gold'
  };

  const recentActivity = [
    { id: 1, type: 'consultation', title: 'AI Health Consultation', date: '2 hours ago', status: 'completed' },
    { id: 2, type: 'order', title: 'Medicine Order #UZ1234', date: '1 day ago', status: 'delivered' },
    { id: 3, type: 'prescription', title: 'Prescription Analysis', date: '3 days ago', status: 'verified' },
    { id: 4, type: 'consultation', title: 'Symptom Check', date: '1 week ago', status: 'completed' },
  ];

  const chartData = [
    { month: 'Jan', consultations: 2, orders: 3 },
    { month: 'Feb', consultations: 3, orders: 4 },
    { month: 'Mar', consultations: 4, orders: 5 },
    { month: 'Apr', consultations: 3, orders: 2 },
    { month: 'May', consultations: 5, orders: 6 },
    { month: 'Jun', consultations: 4, orders: 3 },
  ];

  const healthScore = 85;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.firstName || 'User'}!</h1>
          <p className="text-muted-foreground">Here's your health dashboard overview</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {healthMetrics.loyaltyTier} Member
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Consultations</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthMetrics.consultations}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthMetrics.prescriptions}</div>
            <p className="text-xs text-muted-foreground">3 active prescriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medicine Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthMetrics.orders}</div>
            <p className="text-xs text-muted-foreground">1 order in transit</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loyalty Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthMetrics.loyaltyPoints}</div>
            <p className="text-xs text-muted-foreground">150 points to Platinum</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Score */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>Health Score</span>
            </CardTitle>
            <CardDescription>Based on your consultations and activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">{healthScore}</div>
              <p className="text-sm text-muted-foreground">Excellent Health</p>
            </div>
            <Progress value={healthScore} className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Poor</span>
              <span>Average</span>
              <span>Excellent</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                      {activity.type === 'consultation' && <MessageCircle className="h-4 w-4" />}
                      {activity.type === 'order' && <ShoppingCart className="h-4 w-4" />}
                      {activity.type === 'prescription' && <FileText className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Health Analytics</CardTitle>
          <CardDescription>Track your health journey over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="health">Health Trends</TabsTrigger>
              <TabsTrigger value="spending">Spending</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="consultations" fill="#3b82f6" name="Consultations" />
                    <Bar dataKey="orders" fill="#10b981" name="Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="health" className="space-y-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="consultations" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="spending" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Monthly Spending</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>January</span>
                      <span className="font-medium">$45</span>
                    </div>
                    <div className="flex justify-between">
                      <span>February</span>
                      <span className="font-medium">$62</span>
                    </div>
                    <div className="flex justify-between">
                      <span>March</span>
                      <span className="font-medium">$38</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Category Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Consultations</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medicines</span>
                      <span className="font-medium">55%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span className="font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Access your most used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <MessageCircle className="h-6 w-6" />
              <span>AI Consultation</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Pill className="h-6 w-6" />
              <span>Find Medicines</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span>Upload Prescription</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span>Book Appointment</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDashboard;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Building, 
  DollarSign, 
  Users, 
  Package,
  TrendingUp,
  BarChart3,
  ShoppingCart,
  AlertTriangle,
  UserCheck,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PharmacyOwnerDashboardProps {
  userId: string;
}

export function PharmacyOwnerDashboard({ userId }: PharmacyOwnerDashboardProps) {
  const { t } = useLanguage();

  // Mock data for demo
  const ownerStats = {
    totalRevenue: 15750000,
    monthlyGrowth: 12.5,
    totalOrders: 1247,
    averageRating: 4.8,
    totalEmployees: 8,
    lowStockItems: 15,
    topSellingMedicine: 'Paracetamol 500mg'
  };

  const monthlyData = [
    { month: 'Jan', revenue: 12000000, orders: 980 },
    { month: 'Feb', revenue: 13500000, orders: 1100 },
    { month: 'Mar', revenue: 15750000, orders: 1247 }
  ];

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <motion.div 
        className="grid md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-1">Monthly Revenue</p>
                <p className="text-3xl font-bold text-foreground dark:text-foreground">
                  {ownerStats.totalRevenue.toLocaleString()} UZS
                </p>
                <div className="flex items-center mt-2 text-green-600 dark:text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span className="text-xs">+{ownerStats.monthlyGrowth}% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-foreground dark:text-foreground">{ownerStats.totalOrders}</p>
                <div className="flex items-center mt-2">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  <span className="text-xs text-muted-foreground dark:text-muted-foreground">
                    {ownerStats.averageRating} rating
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-1">Staff Members</p>
                <p className="text-3xl font-bold text-foreground dark:text-foreground">{ownerStats.totalEmployees}</p>
                <div className="flex items-center mt-2 text-blue-600 dark:text-blue-400">
                  <UserCheck className="h-3 w-3 mr-1" />
                  <span className="text-xs">All active</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary dark:bg-primary rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-1">Low Stock Items</p>
                <p className="text-3xl font-bold text-foreground dark:text-foreground">{ownerStats.lowStockItems}</p>
                <div className="flex items-center mt-2 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span className="text-xs">Needs attention</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-amber-500 dark:bg-amber-600 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analytics and Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50 dark:bg-muted/20">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background dark:data-[state=active]:bg-background">
              Overview
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-background dark:data-[state=active]:bg-background">
              Inventory
            </TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-background dark:data-[state=active]:bg-background">
              Staff
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-background dark:data-[state=active]:bg-background">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-card dark:bg-card border-border dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground dark:text-foreground">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={data.month} className="flex items-center justify-between p-3 bg-muted/30 dark:bg-muted/10 rounded-lg">
                        <div>
                          <p className="font-medium text-foreground dark:text-foreground">{data.month}</p>
                          <p className="text-sm text-muted-foreground dark:text-muted-foreground">{data.orders} orders</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground dark:text-foreground">{data.revenue.toLocaleString()} UZS</p>
                          {index > 0 && (
                            <p className="text-sm text-green-600 dark:text-green-400">
                              +{((data.revenue - monthlyData[index-1].revenue) / monthlyData[index-1].revenue * 100).toFixed(1)}%
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card dark:bg-card border-border dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground dark:text-foreground">
                    <Package className="h-5 w-5 mr-2 text-amber-500" />
                    Top Performing Products
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/30 dark:bg-muted/10 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground dark:text-foreground">Paracetamol 500mg</p>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">324 units sold</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        #1
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 dark:bg-muted/10 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground dark:text-foreground">Ibuprofen 400mg</p>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">298 units sold</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        #2
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 dark:bg-muted/10 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground dark:text-foreground">Aspirin 325mg</p>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">276 units sold</p>
                      </div>
                      <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                        #3
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground dark:text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                    Inventory Management
                  </h3>
                  <p className="text-muted-foreground dark:text-muted-foreground mb-4">
                    Detailed inventory tracking and management features
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    View Inventory
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="staff">
            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground dark:text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                    Staff Management
                  </h3>
                  <p className="text-muted-foreground dark:text-muted-foreground mb-4">
                    Manage staff schedules, permissions, and performance
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Manage Staff
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-muted-foreground dark:text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                    Analytics & Reports
                  </h3>
                  <p className="text-muted-foreground dark:text-muted-foreground mb-4">
                    Detailed analytics and business intelligence reports
                  </p>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    View Reports
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Truck
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PharmacySellerDashboardProps {
  userId: string;
}

export function PharmacySellerDashboard({ userId }: PharmacySellerDashboardProps) {
  const { t } = useLanguage();

  // Mock data for demo - in production this would come from API
  const sellerStats = {
    pendingOrders: 23,
    completedToday: 45,
    totalCustomers: 312,
    revenue: 2850000
  };

  const mockOrders = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerName: 'John Doe',
      items: 3,
      total: 125000,
      status: 'pending',
      createdAt: new Date().toISOString(),
      deliveryMethod: 'pharmacy_pickup'
    },
    {
      id: '2', 
      orderNumber: 'ORD-002',
      customerName: 'Jane Smith',
      items: 2,
      total: 89000,
      status: 'preparing',
      createdAt: new Date().toISOString(),
      deliveryMethod: 'yandex_delivery'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'ready':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
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
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-1">Pending Orders</p>
                <p className="text-3xl font-bold text-foreground dark:text-foreground">{sellerStats.pendingOrders}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500 dark:bg-amber-600 rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-1">Completed Today</p>
                <p className="text-3xl font-bold text-foreground dark:text-foreground">{sellerStats.completedToday}</p>
              </div>
              <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-1">Total Customers</p>
                <p className="text-3xl font-bold text-foreground dark:text-foreground">{sellerStats.totalCustomers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-1">Revenue Today</p>
                <p className="text-3xl font-bold text-foreground dark:text-foreground">{sellerStats.revenue.toLocaleString()} UZS</p>
              </div>
              <div className="w-12 h-12 bg-primary dark:bg-primary rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Orders Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-card dark:bg-card border-border dark:border-border">
          <CardHeader>
            <CardTitle className="flex items-center text-foreground dark:text-foreground">
              <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div 
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-muted/50 dark:bg-muted/20 rounded-xl border border-border/50 dark:border-border/30"
                  data-testid={`order-${order.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground dark:text-foreground">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                        {order.customerName} • {order.items} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-medium text-foreground dark:text-foreground">{order.total.toLocaleString()} UZS</p>
                      <Badge className={getStatusColor(order.status)} variant="secondary">
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline" className="border-border dark:border-border text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      Process
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border dark:border-border">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="view-all-orders">
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
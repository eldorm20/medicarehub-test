import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Search,
  Filter,
  Package,
  Truck,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { motion } from 'framer-motion';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: number;
  totalAmount: number;
  status: 'pending' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  deliveryMethod: 'pharmacy_pickup' | 'yandex_delivery';
  createdAt: string;
  updatedAt: string;
}

export default function Orders() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('created_date');

  const handleExportOrders = () => {
    // Filter and format orders for export
    const exportData = filteredOrders.map(order => ({
      'Order Number': order.orderNumber,
      'Customer Name': order.customerName,
      'Customer Email': order.customerEmail,
      'Items Count': order.items,
      'Total Amount (UZS)': order.totalAmount,
      'Status': order.status.toUpperCase(),
      'Delivery Method': order.deliveryMethod === 'pharmacy_pickup' ? 'Pharmacy Pickup' : 'Yandex Delivery',
      'Order Date': new Date(order.createdAt).toLocaleDateString(),
      'Last Updated': new Date(order.updatedAt).toLocaleDateString()
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const colWidths = [
      { wch: 15 }, // Order Number
      { wch: 20 }, // Customer Name
      { wch: 25 }, // Customer Email
      { wch: 10 }, // Items Count
      { wch: 15 }, // Total Amount
      { wch: 15 }, // Status
      { wch: 18 }, // Delivery Method
      { wch: 12 }, // Order Date
      { wch: 12 }  // Last Updated
    ];
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');

    // Generate filename with current date
    const filename = `orders_export_${new Date().toISOString().split('T')[0]}.xlsx`;

    // Download file
    XLSX.writeFile(wb, filename);
  };

  // Mock orders data - in production this would come from API
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      customerName: 'Akmal Karimov',
      customerEmail: 'akmal@email.com',
      items: 3,
      totalAmount: 125000,
      status: 'pending',
      deliveryMethod: 'pharmacy_pickup',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      customerName: 'Malika Nazarova',
      customerEmail: 'malika@email.com',
      items: 2,
      totalAmount: 89000,
      status: 'preparing',
      deliveryMethod: 'yandex_delivery',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date(Date.now() - 1800000).toISOString()
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      customerName: 'Bobur Toshmatov',
      customerEmail: 'bobur@email.com',
      items: 5,
      totalAmount: 234000,
      status: 'delivered',
      deliveryMethod: 'yandex_delivery',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      customerName: 'Nilufar Yusupova',
      customerEmail: 'nilufar@email.com',
      items: 1,
      totalAmount: 45000,
      status: 'ready',
      deliveryMethod: 'pharmacy_pickup',
      createdAt: new Date(Date.now() - 10800000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString()
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'preparing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'ready':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'out_for_delivery':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'preparing':
        return <Package className="h-4 w-4" />;
      case 'ready':
        return <CheckCircle className="h-4 w-4" />;
      case 'out_for_delivery':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return t('orders.pending') || 'Pending';
      case 'preparing':
        return t('orders.preparing') || 'Preparing';
      case 'ready':
        return t('orders.ready') || 'Ready';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return t('orders.delivered') || 'Delivered';
      case 'cancelled':
        return t('orders.cancelled') || 'Cancelled';
      default:
        return status;
    }
  };

  // Filter orders based on search and status
  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    preparing: mockOrders.filter(o => o.status === 'preparing').length,
    ready: mockOrders.filter(o => o.status === 'ready').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground dark:text-foreground">
                {t('orders.title') || 'Orders'}
              </h1>
              <p className="text-muted-foreground dark:text-muted-foreground mt-2">
                {t('orders.all_orders') || 'Manage and track all orders'}
              </p>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground" 
              data-testid="export-orders"
              onClick={handleExportOrders}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-5 gap-4">
            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold text-foreground dark:text-foreground">{orderStats.total}</p>
                  </div>
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-foreground dark:text-foreground">{orderStats.pending}</p>
                  </div>
                  <Clock className="h-8 w-8 text-amber-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">Preparing</p>
                    <p className="text-2xl font-bold text-foreground dark:text-foreground">{orderStats.preparing}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">Ready</p>
                    <p className="text-2xl font-bold text-foreground dark:text-foreground">{orderStats.ready}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground">Delivered</p>
                    <p className="text-2xl font-bold text-foreground dark:text-foreground">{orderStats.delivered}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-card dark:bg-card border-border dark:border-border">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search orders, customers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground"
                      data-testid="search-orders"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48 bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background dark:bg-background border-border dark:border-border">
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-background dark:bg-background border-border dark:border-border">
                    <SelectItem value="created_date">Created Date</SelectItem>
                    <SelectItem value="order_number">Order Number</SelectItem>
                    <SelectItem value="customer_name">Customer Name</SelectItem>
                    <SelectItem value="total_amount">Total Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orders List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-card dark:bg-card border-border dark:border-border">
            <CardContent className="p-6">
              {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-muted-foreground dark:text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                    {t('orders.no_orders') || 'No orders found'}
                  </h3>
                  <p className="text-muted-foreground dark:text-muted-foreground">
                    Try adjusting your search criteria or filters.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-muted/30 dark:bg-muted/10 rounded-xl border border-border/50 dark:border-border/30 hover:shadow-md transition-shadow"
                      data-testid={`order-${order.id}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                            <p className="font-semibold text-foreground dark:text-foreground">
                              {order.orderNumber}
                            </p>
                            <Badge className={getStatusColor(order.status)} variant="secondary">
                              {getStatusLabel(order.status)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                            {order.customerName} • {order.customerEmail}
                          </p>
                          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                            {order.items} items • {order.deliveryMethod === 'yandex_delivery' ? 'Yandex Delivery' : 'Pharmacy Pickup'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-bold text-foreground dark:text-foreground">
                            {order.totalAmount.toLocaleString()} UZS
                          </p>
                          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-border dark:border-border text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent"
                            data-testid={`view-order-${order.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-border dark:border-border text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
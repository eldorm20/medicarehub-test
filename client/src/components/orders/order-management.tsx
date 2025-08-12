import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone,
  Search,
  Filter,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: any[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready_for_pickup' | 'out_for_delivery' | 'delivered' | 'cancelled';
  deliveryMethod: 'pickup' | 'yandex_delivery';
  deliveryAddress?: string;
  phone?: string;
  createdAt: string;
  estimatedDelivery?: string;
}

const orderStatuses = {
  pending: { label: 'Pending', color: 'bg-yellow-500', progress: 10 },
  confirmed: { label: 'Confirmed', color: 'bg-blue-500', progress: 25 },
  preparing: { label: 'Preparing', color: 'bg-orange-500', progress: 50 },
  ready_for_pickup: { label: 'Ready for Pickup', color: 'bg-green-500', progress: 75 },
  out_for_delivery: { label: 'Out for Delivery', color: 'bg-purple-500', progress: 90 },
  delivered: { label: 'Delivered', color: 'bg-green-600', progress: 100 },
  cancelled: { label: 'Cancelled', color: 'bg-red-500', progress: 0 },
};

export const OrderManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock orders data - in production this would come from API
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'UZ001234',
      customerName: 'Amina Karimova',
      items: [
        { name: 'Paracetamol 500mg', quantity: 2, price: 15.00 },
        { name: 'Amoxicillin 250mg', quantity: 1, price: 30.50 }
      ],
      totalAmount: 45.50,
      status: 'preparing',
      deliveryMethod: 'yandex_delivery',
      deliveryAddress: '123 Navoi Street, Tashkent',
      phone: '+998901234567',
      createdAt: '2024-01-15T10:30:00Z',
      estimatedDelivery: '2024-01-15T14:00:00Z'
    },
    {
      id: '2',
      orderNumber: 'UZ001235',
      customerName: 'Bekzod Rahimov',
      items: [
        { name: 'Blood Pressure Monitor', quantity: 1, price: 75.00 }
      ],
      totalAmount: 75.00,
      status: 'ready_for_pickup',
      deliveryMethod: 'pickup',
      phone: '+998901234568',
      createdAt: '2024-01-15T09:15:00Z'
    },
    {
      id: '3',
      orderNumber: 'UZ001236',
      customerName: 'Nargiza Tursunova',
      items: [
        { name: 'Insulin Pen', quantity: 3, price: 45.00 },
        { name: 'Test Strips', quantity: 2, price: 25.00 }
      ],
      totalAmount: 115.00,
      status: 'delivered',
      deliveryMethod: 'yandex_delivery',
      deliveryAddress: '456 Amir Timur Avenue, Tashkent',
      phone: '+998901234569',
      createdAt: '2024-01-14T16:20:00Z'
    }
  ];

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      // In production, this would update via API
      return { orderId, status };
    },
    onSuccess: () => {
      toast({
        title: 'Order Updated',
        description: 'Order status has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: () => {
      toast({
        title: 'Update Failed',
        description: 'Failed to update order status.',
        variant: 'destructive',
      });
    },
  });

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || order.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  const getStatusActions = (order: Order) => {
    switch (order.status) {
      case 'pending':
        return (
          <Button 
            size="sm" 
            onClick={() => updateOrderStatus.mutate({ orderId: order.id, status: 'confirmed' })}
          >
            Confirm
          </Button>
        );
      case 'confirmed':
        return (
          <Button 
            size="sm" 
            onClick={() => updateOrderStatus.mutate({ orderId: order.id, status: 'preparing' })}
          >
            Start Preparing
          </Button>
        );
      case 'preparing':
        return (
          <Button 
            size="sm" 
            onClick={() => updateOrderStatus.mutate({ 
              orderId: order.id, 
              status: order.deliveryMethod === 'pickup' ? 'ready_for_pickup' : 'out_for_delivery' 
            })}
          >
            {order.deliveryMethod === 'pickup' ? 'Mark Ready' : 'Dispatch'}
          </Button>
        );
      case 'out_for_delivery':
        return (
          <Button 
            size="sm" 
            onClick={() => updateOrderStatus.mutate({ orderId: order.id, status: 'delivered' })}
          >
            Mark Delivered
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Order Management</h2>
          <p className="text-muted-foreground">Track and manage customer orders</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search by order number or customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Order Status Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="ready_for_pickup">Ready</TabsTrigger>
          <TabsTrigger value="out_for_delivery">Delivery</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Order #{order.orderNumber}</CardTitle>
                    <CardDescription>
                      {order.customerName} • {new Date(order.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={`${orderStatuses[order.status].color} text-white`}
                    >
                      {orderStatuses[order.status].label}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Order Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Order Progress</span>
                    <span>{orderStatuses[order.status].progress}%</span>
                  </div>
                  <Progress value={orderStatuses[order.status].progress} className="w-full" />
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Order Items</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t pt-1 flex justify-between font-medium">
                        <span>Total</span>
                        <span>${order.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Delivery Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4" />
                        <span className="capitalize">{order.deliveryMethod.replace('_', ' ')}</span>
                      </div>
                      {order.deliveryAddress && (
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-4 w-4 mt-0.5" />
                          <span>{order.deliveryAddress}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{order.phone}</span>
                      </div>
                      {order.estimatedDelivery && (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Est. {new Date(order.estimatedDelivery).toLocaleTimeString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Contact Customer
                  </Button>
                  {getStatusActions(order)}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredOrders.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
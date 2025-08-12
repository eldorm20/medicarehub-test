import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  MapPin, 
  Clock, 
  CheckCircle,
  Truck,
  Store,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  pharmacy: string;
}

interface CheckoutFlowProps {
  cartItems: CartItem[];
  onPaymentSuccess?: (orderId: string) => void;
}

export const CheckoutFlow: React.FC<CheckoutFlowProps> = ({ 
  cartItems, 
  onPaymentSuccess 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phone, setPhone] = useState('');

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryMethod === 'yandex_delivery' ? 5.00 : 0;
  const grandTotal = totalAmount + deliveryFee;

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      return await apiRequest('POST', '/api/orders', orderData);
    },
    onSuccess: (data) => {
      toast({
        title: 'Order Created Successfully',
        description: `Order #${data.orderNumber} has been created.`,
      });
      setStep(3);
      if (onPaymentSuccess) {
        onPaymentSuccess(data.id);
      }
    },
    onError: () => {
      toast({
        title: 'Order Failed',
        description: 'Failed to create order. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const processPaymentMutation = useMutation({
    mutationFn: async (paymentData: any) => {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      return { success: true, transactionId: `TXN${Date.now()}` };
    },
    onSuccess: () => {
      const orderData = {
        userId: user?.id,
        pharmacyId: cartItems[0]?.pharmacy || 'pharmacy1',
        deliveryMethod,
        paymentMethod,
        totalAmount: grandTotal,
        deliveryAddress: deliveryMethod === 'yandex_delivery' ? deliveryAddress : undefined,
        items: cartItems.map(item => ({
          medicineId: item.id,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
        }))
      };
      createOrderMutation.mutate(orderData);
    },
    onError: () => {
      toast({
        title: 'Payment Failed',
        description: 'Payment processing failed. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handlePayment = () => {
    if (!paymentMethod || !deliveryMethod) {
      toast({
        title: 'Missing Information',
        description: 'Please select payment and delivery methods.',
        variant: 'destructive',
      });
      return;
    }

    if (deliveryMethod === 'yandex_delivery' && !deliveryAddress) {
      toast({
        title: 'Missing Address',
        description: 'Please provide delivery address.',
        variant: 'destructive',
      });
      return;
    }

    setStep(2);
    processPaymentMutation.mutate({
      amount: grandTotal,
      method: paymentMethod,
      userId: user?.id,
    });
  };

  const paymentMethods = [
    {
      id: 'click',
      name: 'Click',
      icon: CreditCard,
      description: 'Pay with Click mobile payment',
      available: true,
    },
    {
      id: 'payme',
      name: 'Payme',
      icon: Smartphone,
      description: 'Pay with Payme wallet',
      available: true,
    },
    {
      id: 'cash',
      name: 'Cash on Delivery',
      icon: Store,
      description: 'Pay when you receive your order',
      available: deliveryMethod === 'yandex_delivery',
    },
  ];

  const deliveryMethods = [
    {
      id: 'pickup',
      name: 'Pharmacy Pickup',
      icon: Store,
      description: 'Pick up from pharmacy location',
      fee: 0,
      time: '30 minutes',
    },
    {
      id: 'yandex_delivery',
      name: 'Yandex Delivery',
      icon: Truck,
      description: 'Home delivery via Yandex',
      fee: 5.00,
      time: '1-2 hours',
    },
  ];

  if (step === 2) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Processing Payment</CardTitle>
          <CardDescription>Please wait while we process your payment...</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-muted-foreground">
            Securely processing your ${grandTotal.toFixed(2)} payment via {paymentMethod}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (step === 3) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-green-600">Payment Successful!</CardTitle>
          <CardDescription>Your order has been confirmed and is being processed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold">${grandTotal.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Payment completed via {paymentMethod}</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Order Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total Paid:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full" onClick={() => window.location.href = '/orders'}>
            Track Your Order
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delivery Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
            {deliveryMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <method.icon className="h-5 w-5" />
                    <Label htmlFor={method.id} className="font-medium">
                      {method.name}
                    </Label>
                    {method.fee > 0 && (
                      <Badge variant="outline">${method.fee}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {method.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>

          {deliveryMethod === 'yandex_delivery' && (
            <div className="mt-4 space-y-3">
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                placeholder="Enter your full address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+998 XX XXX XX XX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            {paymentMethods.map((method) => (
              <div 
                key={method.id} 
                className={`flex items-center space-x-3 p-3 border rounded-lg ${
                  !method.available ? 'opacity-50' : ''
                }`}
              >
                <RadioGroupItem 
                  value={method.id} 
                  id={method.id} 
                  disabled={!method.available}
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <method.icon className="h-5 w-5" />
                    <Label htmlFor={method.id} className="font-medium">
                      {method.name}
                    </Label>
                    <Shield className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Button 
        className="w-full" 
        size="lg" 
        onClick={handlePayment}
        disabled={processPaymentMutation.isPending || createOrderMutation.isPending}
      >
        {processPaymentMutation.isPending ? (
          'Processing Payment...'
        ) : (
          `Complete Payment - $${grandTotal.toFixed(2)}`
        )}
      </Button>
    </div>
  );
};
import { OrderManagement } from '@/components/orders/order-management';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

export default function Orders() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/auth/login');
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <OrderManagement />
    </div>
  );
}
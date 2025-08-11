import React, { useState } from 'react';
import { MedicineSearch } from '@/components/medicine/medicine-search';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { i18n } from '@/lib/i18n';
import { ShoppingCart, Package, Trash2, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Medicine, CartItem } from '@/types/medicine';

export default function MedicineSearchPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = (medicine: Medicine) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.medicine.id === medicine.id);
      if (existingItem) {
        return prev.map(item =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { medicine, quantity: 1 }];
      }
    });
    
    toast({
      title: i18n.t('common.success'),
      description: `${medicine.title} added to cart`,
    });
  };

  const updateQuantity = (medicineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    
    setCart(prev =>
      prev.map(item =>
        item.medicine.id === medicineId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (medicineId: string) => {
    setCart(prev => prev.filter(item => item.medicine.id !== medicineId));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.medicine.price || 50000; // Default price if not set
      return total + (price * item.quantity);
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Search Area */}
          <div className="lg:col-span-3">
            <MedicineSearch onAddToCart={addToCart} />
          </div>

          {/* Shopping Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
                      Shopping Cart
                    </div>
                    {getTotalItems() > 0 && (
                      <Badge className="bg-primary text-primary-foreground">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">Your cart is empty</p>
                      <p className="text-sm text-muted-foreground">
                        Search for medicines and add them to your cart
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Cart Items */}
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        <AnimatePresence>
                          {cart.map((item) => (
                            <motion.div
                              key={item.medicine.id}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="p-3 border border-border rounded-lg"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium text-sm text-foreground leading-tight">
                                  {item.medicine.title}
                                </h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(item.medicine.id)}
                                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <p className="text-xs text-muted-foreground mb-3">
                                {item.medicine.manufacturer}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}
                                    className="h-7 w-7 p-0"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="text-sm font-medium w-8 text-center">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}
                                    className="h-7 w-7 p-0"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                                <div className="text-sm font-medium text-foreground">
                                  {formatCurrency((item.medicine.price || 50000) * item.quantity)}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>

                      {/* Cart Summary */}
                      <div className="border-t border-border pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-semibold text-foreground">Total:</span>
                          <span className="font-bold text-lg text-foreground">
                            {formatCurrency(getTotalPrice())}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <Button className="w-full bg-primary hover:bg-primary/90">
                            Proceed to Checkout
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setCart([])}
                          >
                            Clear Cart
                          </Button>
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="bg-muted/30 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex justify-between">
                            <span>Items:</span>
                            <span>{getTotalItems()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery:</span>
                            <span>15,000 UZS</span>
                          </div>
                          <div className="flex justify-between font-medium text-foreground">
                            <span>Final Total:</span>
                            <span>{formatCurrency(getTotalPrice() + 15000)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Upload Prescription
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    View Order History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

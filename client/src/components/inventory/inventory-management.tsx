import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Package, 
  AlertTriangle, 
  Plus, 
  Edit, 
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface InventoryItem {
  id: string;
  medicineName: string;
  currentStock: number;
  minimumStock: number;
  maxStock: number;
  unitPrice: number;
  supplier: string;
  expiryDate: string;
  batchNumber: string;
  location: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';
}

export const InventoryManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    medicineName: '',
    currentStock: 0,
    minimumStock: 0,
    maxStock: 0,
    unitPrice: 0,
    supplier: '',
    expiryDate: '',
    batchNumber: '',
    location: '',
  });

  // Mock inventory data
  const mockInventory: InventoryItem[] = [
    {
      id: '1',
      medicineName: 'Paracetamol 500mg',
      currentStock: 150,
      minimumStock: 50,
      maxStock: 500,
      unitPrice: 0.25,
      supplier: 'Pharmstandard',
      expiryDate: '2025-12-31',
      batchNumber: 'PAR2024001',
      location: 'Shelf A1',
      status: 'in_stock',
    },
    {
      id: '2',
      medicineName: 'Amoxicillin 250mg',
      currentStock: 25,
      minimumStock: 30,
      maxStock: 200,
      unitPrice: 0.75,
      supplier: 'Belupo',
      expiryDate: '2025-06-30',
      batchNumber: 'AMX2024002',
      location: 'Shelf B2',
      status: 'low_stock',
    },
    {
      id: '3',
      medicineName: 'Insulin Pen',
      currentStock: 0,
      minimumStock: 10,
      maxStock: 50,
      unitPrice: 15.00,
      supplier: 'Novo Nordisk',
      expiryDate: '2025-03-31',
      batchNumber: 'INS2024003',
      location: 'Refrigerator R1',
      status: 'out_of_stock',
    },
    {
      id: '4',
      medicineName: 'Ibuprofen 400mg',
      currentStock: 45,
      minimumStock: 40,
      maxStock: 300,
      unitPrice: 0.35,
      supplier: 'Pharmstandard',
      expiryDate: '2024-01-31',
      batchNumber: 'IBU2023004',
      location: 'Shelf A3',
      status: 'expired',
    },
  ];

  const updateStockMutation = useMutation({
    mutationFn: async ({ itemId, newStock }: { itemId: string; newStock: number }) => {
      // In production, this would update via API
      return { itemId, newStock };
    },
    onSuccess: () => {
      toast({
        title: 'Stock Updated',
        description: 'Inventory has been updated successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
    onError: () => {
      toast({
        title: 'Update Failed',
        description: 'Failed to update inventory.',
        variant: 'destructive',
      });
    },
  });

  const addNewItemMutation = useMutation({
    mutationFn: async (item: any) => {
      // In production, this would add via API
      return { ...item, id: Date.now().toString() };
    },
    onSuccess: () => {
      toast({
        title: 'Item Added',
        description: 'New inventory item has been added successfully.',
      });
      setIsAddDialogOpen(false);
      setNewItem({
        medicineName: '',
        currentStock: 0,
        minimumStock: 0,
        maxStock: 0,
        unitPrice: 0,
        supplier: '',
        expiryDate: '',
        batchNumber: '',
        location: '',
      });
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    },
  });

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || item.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_stock':
        return <Badge variant="default">In Stock</Badge>;
      case 'low_stock':
        return <Badge variant="destructive">Low Stock</Badge>;
      case 'out_of_stock':
        return <Badge variant="secondary">Out of Stock</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const inventorySummary = {
    totalItems: mockInventory.length,
    inStock: mockInventory.filter(item => item.status === 'in_stock').length,
    lowStock: mockInventory.filter(item => item.status === 'low_stock').length,
    outOfStock: mockInventory.filter(item => item.status === 'out_of_stock').length,
    expired: mockInventory.filter(item => item.status === 'expired').length,
    totalValue: mockInventory.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-muted-foreground">Monitor and manage your pharmacy inventory</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>
                  Enter the details for the new medicine or product.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="medicineName">Medicine Name</Label>
                  <Input
                    id="medicineName"
                    value={newItem.medicineName}
                    onChange={(e) => setNewItem({...newItem, medicineName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input
                    id="supplier"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={newItem.currentStock}
                    onChange={(e) => setNewItem({...newItem, currentStock: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minimumStock">Minimum Stock</Label>
                  <Input
                    id="minimumStock"
                    type="number"
                    value={newItem.minimumStock}
                    onChange={(e) => setNewItem({...newItem, minimumStock: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Unit Price ($)</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    value={newItem.unitPrice}
                    onChange={(e) => setNewItem({...newItem, unitPrice: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batchNumber">Batch Number</Label>
                  <Input
                    id="batchNumber"
                    value={newItem.batchNumber}
                    onChange={(e) => setNewItem({...newItem, batchNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) => setNewItem({...newItem, expiryDate: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Storage Location</Label>
                  <Input
                    id="location"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => addNewItemMutation.mutate(newItem)}>
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Inventory Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventorySummary.totalItems}</div>
            <p className="text-xs text-muted-foreground">Different products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{inventorySummary.lowStock}</div>
            <p className="text-xs text-muted-foreground">Need reordering</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{inventorySummary.outOfStock}</div>
            <p className="text-xs text-muted-foreground">Urgent restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${inventorySummary.totalValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Inventory worth</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search by medicine name, batch number, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="in_stock">In Stock</TabsTrigger>
          <TabsTrigger value="low_stock">Low Stock</TabsTrigger>
          <TabsTrigger value="out_of_stock">Out of Stock</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab}>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>
                {filteredInventory.length} items found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.medicineName}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.location} • {item.batchNumber}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.currentStock}</span>
                            <span className="text-muted-foreground">
                              /{item.maxStock}
                            </span>
                          </div>
                          <Progress 
                            value={getStockPercentage(item.currentStock, item.maxStock)} 
                            className="w-20" 
                          />
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>
                        <span className={new Date(item.expiryDate) < new Date() ? 'text-red-600' : ''}>
                          {new Date(item.expiryDate).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              const newStock = prompt(`Enter new stock level for ${item.medicineName}:`, item.currentStock.toString());
                              if (newStock) {
                                updateStockMutation.mutate({ 
                                  itemId: item.id, 
                                  newStock: parseInt(newStock) 
                                });
                              }
                            }}
                          >
                            Update Stock
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
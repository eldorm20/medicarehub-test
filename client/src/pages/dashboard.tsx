import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ClientDashboard } from '@/components/dashboard/client-dashboard';
import { AnalyticsDashboard } from '@/components/dashboard/analytics-dashboard';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Store, 
  Building, 
  Crown,
  Activity,
  BarChart3,
  Package,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { user, isLoading } = useAuth();

  // Mock user for demo - in production this would come from auth
  const mockUser = {
    id: 'user123',
    role: 'super_admin' as const,
    firstName: 'John',
    lastName: 'Doe',
  };

  const currentUser = user || mockUser;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'client':
        return User;
      case 'pharmacy_seller':
        return Store;
      case 'pharmacy_owner':
        return Building;
      case 'super_admin':
        return Crown;
      default:
        return User;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'client':
        return 'Client Dashboard';
      case 'pharmacy_seller':
        return 'Pharmacy Seller Dashboard';
      case 'pharmacy_owner':
        return 'Pharmacy Owner Dashboard';
      case 'super_admin':
        return 'SuperAdmin Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const RoleIcon = getRoleIcon(currentUser.role);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-600 rounded-xl flex items-center justify-center">
              <RoleIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {getRoleLabel(currentUser.role)}
              </h1>
              <p className="text-muted-foreground">
                Welcome back, {currentUser.firstName} {currentUser.lastName}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Role-based Dashboard Content */}
        {currentUser.role === 'client' && (
          <ClientDashboard userId={currentUser.id} />
        )}

        {(currentUser.role === 'pharmacy_seller' || 
          currentUser.role === 'pharmacy_owner' || 
          currentUser.role === 'super_admin') && (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Inventory</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="analytics">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="inventory">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Inventory Management
                    </h3>
                    <p className="text-muted-foreground">
                      Inventory management features would be implemented here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      User Management
                    </h3>
                    <p className="text-muted-foreground">
                      User management features would be implemented here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

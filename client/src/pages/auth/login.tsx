import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Stethoscope, User, Building, Shield } from 'lucide-react';

const Login = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'client' as 'client' | 'pharmacy_seller' | 'pharmacy_owner' | 'super_admin'
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login - in production this would authenticate against your backend
    try {
      // Store user data in localStorage for demo
      const userData = {
        id: `user_${Date.now()}`,
        email: formData.email,
        role: formData.role,
        firstName: 'Demo',
        lastName: 'User',
      };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('userRole', userData.role);

      toast({
        title: 'Login Successful',
        description: `Welcome back as ${formData.role.replace('_', ' ')}!`,
      });

      // Redirect to appropriate dashboard based on role
      switch (formData.role) {
        case 'super_admin':
          setLocation('/admin-dashboard');
          break;
        case 'pharmacy_owner':
          setLocation('/owner-dashboard');
          break;
        case 'pharmacy_seller':
          setLocation('/seller-dashboard');
          break;
        default:
          setLocation('/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    }
  };

  const roles = [
    {
      value: 'client',
      label: 'Client',
      description: 'Access medical consultations and purchase medicines',
      icon: User,
    },
    {
      value: 'pharmacy_seller',
      label: 'Pharmacy Seller',
      description: 'Manage orders and customer service',
      icon: Stethoscope,
    },
    {
      value: 'pharmacy_owner',
      label: 'Pharmacy Owner',
      description: 'Manage pharmacy operations and staff',
      icon: Building,
    },
    {
      value: 'super_admin',
      label: 'Super Admin',
      description: 'Platform administration and oversight',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">UzPharm Digital</CardTitle>
          <CardDescription>
            Sign in to access your healthcare platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Select Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as any })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center space-x-2">
                        <role.icon className="h-4 w-4" />
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo Credentials:</p>
            <p>Email: demo@uzpharm.uz</p>
            <p>Password: demo123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
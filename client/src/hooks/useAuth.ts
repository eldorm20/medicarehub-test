import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'client' | 'pharmacy_seller' | 'pharmacy_owner' | 'super_admin';
  firstName?: string;
  lastName?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    setUser(null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
  };
}

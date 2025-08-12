import React from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/ui/language-selector';
import { useTheme } from '@/components/ui/theme-provider';
import { useAuth } from '@/hooks/useAuth';
import { i18n } from '@/lib/i18n';
import { Moon, Sun, Heart, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export function Header() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getNavigationForRole = (role: string) => {
    const baseNavigation = [
      { name: i18n.t('navigation.home'), href: '/' },
      { name: i18n.t('navigation.dashboard'), href: '/dashboard' },
    ];

    switch (role) {
      case 'super_admin':
        return [
          ...baseNavigation,
          { name: 'User Management', href: '/admin-dashboard' },
          { name: 'Platform Analytics', href: '/analytics' },
          { name: 'System Settings', href: '/settings' },
        ];
      case 'pharmacy_owner':
        return [
          ...baseNavigation,
          { name: 'Branch Management', href: '/branches' },
          { name: 'Staff Management', href: '/staff' },
          { name: 'Financial Reports', href: '/reports' },
          { name: 'Inventory', href: '/inventory' },
        ];
      case 'pharmacy_seller':
        return [
          ...baseNavigation,
          { name: 'Orders', href: '/orders' },
          { name: 'Customer Chat', href: '/chat' },
          { name: 'Inventory', href: '/inventory' },
        ];
      default: // client
        return [
          ...baseNavigation,
          { name: i18n.t('navigation.medicines'), href: '/medicines' },
          { name: i18n.t('navigation.consultation'), href: '/consultation' },
          { name: i18n.t('navigation.orders'), href: '/orders' },
          { name: 'Symptom Checker', href: '/symptom-checker' },
        ];
    }
  };

  const navigation = user ? getNavigationForRole(user.role) : [];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {i18n.t('header.title')}
              </h1>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {i18n.t('header.subtitle')}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  location === item.href
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-700/50 backdrop-blur-sm"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-yellow-500" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </Button>

            {/* User Profile */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-700/50 backdrop-blur-sm"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {user.firstName || 'User'}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user.role.replace('_', ' ')}
                      </p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center text-red-600 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200 dark:border-slate-700">
            <div className="pt-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location === item.href
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

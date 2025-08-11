import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { i18n } from '@/lib/i18n';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Search, Filter, ShoppingCart, AlertCircle, Package, Building, Calendar, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Medicine, MedicineSearchFilters } from '@/types/medicine';

interface MedicineSearchProps {
  onAddToCart?: (medicine: Medicine) => void;
  compact?: boolean;
}

export function MedicineSearch({ onAddToCart, compact = false }: MedicineSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<MedicineSearchFilters>({});
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { toast } = useToast();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: medicines = [], isLoading, error } = useQuery({
    queryKey: ['/api/medicines/search', debouncedQuery, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        q: debouncedQuery,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== undefined && value !== '')
        )
      });
      
      const response = await apiRequest('GET', `/api/medicines/search?${params}`);
      return response.json() as Promise<Medicine[]>;
    },
    enabled: debouncedQuery.length > 2 || Object.keys(filters).some(key => filters[key as keyof MedicineSearchFilters]),
  });

  const handleAddToCart = (medicine: Medicine) => {
    if (onAddToCart) {
      onAddToCart(medicine);
      toast({
        title: i18n.t('common.success'),
        description: `${medicine.title} added to cart`,
      });
    }
  };

  const getAvailabilityStatus = (medicine: Medicine) => {
    if (!medicine.isAvailable) {
      return { text: i18n.t('medicines.outOfStock'), color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' };
    }
    // In a real implementation, this would check actual inventory
    const randomStock = Math.random();
    if (randomStock > 0.7) {
      return { text: i18n.t('medicines.available'), color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' };
    } else {
      return { text: i18n.t('medicines.lowStock'), color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' };
    }
  };

  if (compact) {
    return (
      <div className="space-y-4">
        {/* Compact Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={i18n.t('medicines.searchPlaceholder')}
            className="pl-10"
          />
        </div>

        {/* Quick Results */}
        {isLoading && (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        )}

        {medicines.length > 0 && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {medicines.slice(0, 5).map((medicine) => {
              const status = getAvailabilityStatus(medicine);
              return (
                <Card key={medicine.id} className="p-3 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{medicine.title}</p>
                      <p className="text-xs text-muted-foreground">{medicine.manufacturer}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={status.color} variant="secondary">
                        {status.text}
                      </Badge>
                      {medicine.isAvailable && onAddToCart && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(medicine);
                          }}
                          data-testid={`add-to-cart-${medicine.id}`}
                        >
                          <ShoppingCart className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {i18n.t('medicines.title')}
        </h2>
        <p className="text-lg text-muted-foreground">
          {i18n.t('medicines.subtitle')}
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        {/* Main Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={i18n.t('medicines.searchPlaceholder')}
            className="pl-12 pr-20 py-4 text-lg"
          />
          <Button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4">
          <Select onValueChange={(value) => setFilters(prev => ({ ...prev, country: value === 'all' ? undefined : value }))}>
            <SelectTrigger>
              <SelectValue placeholder={i18n.t('medicines.allCountries')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{i18n.t('medicines.allCountries')}</SelectItem>
              <SelectItem value="Узбекистон">Узбекистон</SelectItem>
              <SelectItem value="Россия">Россия</SelectItem>
              <SelectItem value="Китай">Китай</SelectItem>
              <SelectItem value="Германия">Германия</SelectItem>
              <SelectItem value="Индия">Индия</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setFilters(prev => ({ ...prev, year: value === 'all' ? undefined : value }))}>
            <SelectTrigger>
              <SelectValue placeholder={i18n.t('medicines.allYears')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{i18n.t('medicines.allYears')}</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setFilters(prev => ({ ...prev, manufacturer: value === 'all' ? undefined : value }))}>
            <SelectTrigger>
              <SelectValue placeholder={i18n.t('medicines.allManufacturers')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{i18n.t('medicines.allManufacturers')}</SelectItem>
              <SelectItem value="OZKIMYOFARM">OZKIMYOFARM OAJ</SelectItem>
              <SelectItem value="Dentafill">Dentafill Plyus</SelectItem>
              <SelectItem value="Remedy">Remedy Group</SelectItem>
              <SelectItem value="Amaliy">Amaliy Med Farm</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            className="flex items-center space-x-2"
            onClick={() => setFilters({})}
          >
            <Filter className="h-4 w-4" />
            <span>Clear Filters</span>
          </Button>
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {error && (
          <Card className="p-6">
            <div className="flex items-center space-x-3 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <p>{i18n.t('errors.serverError')}</p>
            </div>
          </Card>
        )}

        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <AnimatePresence>
          {medicines.map((medicine) => {
            const status = getAvailabilityStatus(medicine);
            return (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {medicine.title}
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Building className="h-4 w-4" />
                              <span className="font-medium">{i18n.t('medicines.manufacturer')}:</span>
                              <span>{medicine.manufacturer}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Package className="h-4 w-4" />
                              <span className="font-medium">{i18n.t('medicines.country')}:</span>
                              <span>{medicine.country}</span>
                            </div>
                            {medicine.dosage && (
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <FileText className="h-4 w-4" />
                                <span className="font-medium">Dosage:</span>
                                <span>{medicine.dosage}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <FileText className="h-4 w-4" />
                              <span className="font-medium">{i18n.t('medicines.registration')}:</span>
                              <span>{medicine.regNum}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span className="font-medium">{i18n.t('medicines.certificateDate')}:</span>
                              <span>{medicine.certDate}</span>
                            </div>
                            {medicine.form && (
                              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Package className="h-4 w-4" />
                                <span className="font-medium">Form:</span>
                                <span>{medicine.form}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-6">
                        <Badge className={status.color} variant="secondary">
                          {status.text}
                        </Badge>
                        
                        {medicine.isAvailable && onAddToCart && (
                          <Button
                            onClick={() => handleAddToCart(medicine)}
                            className="bg-primary hover:bg-primary/90"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {i18n.t('medicines.addToCart')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* No Results */}
        {!isLoading && medicines.length === 0 && (debouncedQuery.length > 2 || Object.keys(filters).some(key => filters[key as keyof MedicineSearchFilters])) && (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No medicines found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setFilters({});
            }}>
              Clear search
            </Button>
          </Card>
        )}

        {/* Pagination */}
        {medicines.length > 0 && (
          <div className="flex items-center justify-between pt-6">
            <p className="text-sm text-muted-foreground">
              {i18n.t('medicines.showing', { start: 1, end: medicines.length, total: '462,002' })}
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button className="bg-primary text-primary-foreground">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

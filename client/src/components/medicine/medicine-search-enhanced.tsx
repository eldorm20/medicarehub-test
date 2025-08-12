import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ShoppingCart, 
  Info,
  Pill,
  Building,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface Medicine {
  id: string;
  title: string;
  manufacturer: string;
  activeIngredient: string;
  dosage: string;
  form: string;
  packaging: string;
  price: number;
  country: string;
  isAvailable: boolean;
  pharmacies: Array<{
    id: string;
    name: string;
    distance: number;
    rating: number;
    stock: number;
    price: number;
  }>;
}

export const MedicineSearchEnhanced = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    manufacturer: '',
    form: '',
    priceRange: ''
  });
  const [selectedTab, setSelectedTab] = useState('search');
  const { toast } = useToast();

  const { data: medicines, isLoading, refetch } = useQuery({
    queryKey: ['medicines', searchQuery, filters],
    queryFn: async () => {
      if (!searchQuery && Object.values(filters).every(f => !f)) {
        return [];
      }
      const params = new URLSearchParams({
        q: searchQuery,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v))
      });
      return await apiRequest('GET', `/api/medicines/search?${params}`);
    },
    enabled: searchQuery.length > 2 || Object.values(filters).some(f => f),
  });

  const mockMedicines: Medicine[] = [
    {
      id: '1',
      title: 'Paracetamol 500mg',
      manufacturer: 'Pharmstandard',
      activeIngredient: 'Paracetamol',
      dosage: '500mg',
      form: 'Tablet',
      packaging: '20 tablets',
      price: 8.50,
      country: 'Uzbekistan',
      isAvailable: true,
      pharmacies: [
        { id: '1', name: 'MedCenter Plus', distance: 0.5, rating: 4.8, stock: 50, price: 8.50 },
        { id: '2', name: 'Health Care Pharmacy', distance: 1.2, rating: 4.6, stock: 30, price: 9.00 },
      ]
    },
    {
      id: '2',
      title: 'Amoxicillin 250mg',
      manufacturer: 'Belupo',
      activeIngredient: 'Amoxicillin',
      dosage: '250mg',
      form: 'Capsule',
      packaging: '16 capsules',
      price: 15.75,
      country: 'Croatia',
      isAvailable: true,
      pharmacies: [
        { id: '1', name: 'MedCenter Plus', distance: 0.5, rating: 4.8, stock: 25, price: 15.75 },
        { id: '3', name: 'City Pharmacy', distance: 2.1, rating: 4.5, stock: 40, price: 16.00 },
      ]
    }
  ];

  const handleSearch = () => {
    if (searchQuery.length < 3) {
      toast({
        title: 'Search Query Too Short',
        description: 'Please enter at least 3 characters to search.',
        variant: 'destructive',
      });
      return;
    }
    refetch();
  };

  const addToCart = (medicine: Medicine, pharmacy: any) => {
    toast({
      title: 'Added to Cart',
      description: `${medicine.title} from ${pharmacy.name} added to your cart.`,
    });
  };

  const displayMedicines = medicines || mockMedicines;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Medicine Search</h2>
          <p className="text-muted-foreground">Find medicines from verified pharmacies across Uzbekistan</p>
        </div>
      </div>

      {/* Search Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Pill className="h-5 w-5" />
            <span>Search Medicines</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search by medicine name, active ingredient, or manufacturer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={filters.country} onValueChange={(value) => setFilters({...filters, country: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Countries</SelectItem>
                <SelectItem value="Uzbekistan">Uzbekistan</SelectItem>
                <SelectItem value="Russia">Russia</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="Croatia">Croatia</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.manufacturer} onValueChange={(value) => setFilters({...filters, manufacturer: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Manufacturer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Manufacturers</SelectItem>
                <SelectItem value="Pharmstandard">Pharmstandard</SelectItem>
                <SelectItem value="Belupo">Belupo</SelectItem>
                <SelectItem value="Julphar">Julphar</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.form} onValueChange={(value) => setFilters({...filters, form: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Form" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Forms</SelectItem>
                <SelectItem value="Tablet">Tablet</SelectItem>
                <SelectItem value="Capsule">Capsule</SelectItem>
                <SelectItem value="Syrup">Syrup</SelectItem>
                <SelectItem value="Injection">Injection</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.priceRange} onValueChange={(value) => setFilters({...filters, priceRange: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Prices</SelectItem>
                <SelectItem value="0-10">$0 - $10</SelectItem>
                <SelectItem value="10-25">$10 - $25</SelectItem>
                <SelectItem value="25-50">$25 - $50</SelectItem>
                <SelectItem value="50+">$50+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="search">Search Results</TabsTrigger>
          <TabsTrigger value="popular">Popular Medicines</TabsTrigger>
          <TabsTrigger value="nearby">Nearby Pharmacies</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : displayMedicines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayMedicines.map((medicine) => (
                <Card key={medicine.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{medicine.title}</CardTitle>
                        <CardDescription>
                          {medicine.manufacturer} • {medicine.form} • {medicine.packaging}
                        </CardDescription>
                      </div>
                      <Badge variant={medicine.isAvailable ? 'default' : 'secondary'}>
                        {medicine.isAvailable ? 'Available' : 'Out of Stock'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Active Ingredient:</span>
                        <p>{medicine.activeIngredient}</p>
                      </div>
                      <div>
                        <span className="font-medium">Dosage:</span>
                        <p>{medicine.dosage}</p>
                      </div>
                      <div>
                        <span className="font-medium">Country:</span>
                        <p>{medicine.country}</p>
                      </div>
                      <div>
                        <span className="font-medium">Starting Price:</span>
                        <p className="text-lg font-bold text-green-600">${medicine.price}</p>
                      </div>
                    </div>

                    {medicine.pharmacies && medicine.pharmacies.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <Building className="h-4 w-4 mr-1" />
                          Available at ({medicine.pharmacies.length} pharmacies)
                        </h4>
                        <div className="space-y-2">
                          {medicine.pharmacies.slice(0, 2).map((pharmacy) => (
                            <div key={pharmacy.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex-1">
                                <p className="font-medium">{pharmacy.name}</p>
                                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                                  <span className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {pharmacy.distance} km
                                  </span>
                                  <span className="flex items-center">
                                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                                    {pharmacy.rating}
                                  </span>
                                  <span className="flex items-center">
                                    <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                                    {pharmacy.stock} in stock
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold">${pharmacy.price}</p>
                                <Button 
                                  size="sm" 
                                  className="mt-1"
                                  onClick={() => addToCart(medicine, pharmacy)}
                                >
                                  <ShoppingCart className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Info className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                      <Button size="sm" className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Compare Prices
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No medicines found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Popular Medicines</CardTitle>
              <CardDescription>Most frequently ordered medicines this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Paracetamol 500mg', 'Ibuprofen 400mg', 'Amoxicillin 250mg', 'Omeprazole 20mg'].map((medicine, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{medicine}</p>
                      <p className="text-sm text-muted-foreground">Ordered {250 - index * 30} times</p>
                    </div>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nearby" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nearby Pharmacies</CardTitle>
              <CardDescription>Pharmacies closest to your location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'MedCenter Plus', distance: '0.5 km', rating: 4.8, open: true },
                  { name: 'Health Care Pharmacy', distance: '1.2 km', rating: 4.6, open: true },
                  { name: 'City Pharmacy Network', distance: '2.1 km', rating: 4.5, open: false },
                ].map((pharmacy, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{pharmacy.name}</p>
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <span>{pharmacy.distance}</span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                          {pharmacy.rating}
                        </span>
                        <Badge variant={pharmacy.open ? 'default' : 'secondary'}>
                          {pharmacy.open ? 'Open' : 'Closed'}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <MapPin className="h-4 w-4 mr-1" />
                      Directions
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
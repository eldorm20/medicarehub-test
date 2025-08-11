import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { i18n } from '@/lib/i18n';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Bell, 
  Shield, 
  Heart,
  Award,
  Gift,
  FileText,
  Settings,
  Save,
  Edit,
  Camera,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock user data for demo
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+998901234567',
    dateOfBirth: '1990-01-01',
    address: 'Tashkent, Uzbekistan',
    loyaltyPoints: 2450,
    loyaltyTier: 'silver',
    role: 'client',
    language: 'en',
    notifications: {
      email: true,
      sms: false,
      push: true,
      orderUpdates: true,
      healthReminders: true,
      promotions: false,
    },
    privacy: {
      shareHealthData: false,
      allowAnalytics: true,
      publicProfile: false,
    },
  });

  const [healthData] = useState({
    allergies: ['Penicillin', 'Peanuts'],
    chronicConditions: ['Hypertension'],
    emergencyContact: {
      name: 'Jane Doe',
      relationship: 'Spouse',
      phone: '+998901234568',
    },
    bloodType: 'A+',
    weight: '75 kg',
    height: '175 cm',
  });

  const [activityStats] = useState({
    consultations: 12,
    prescriptions: 8,
    orders: 15,
    savedMedicines: 6,
  });

  const handleSave = () => {
    // In production, this would make an API call
    toast({
      title: i18n.t('common.success'),
      description: 'Profile updated successfully',
    });
    setIsEditing(false);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const handlePrivacyChange = (key: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }));
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold':
        return 'from-yellow-400 to-yellow-500';
      case 'silver':
        return 'from-gray-300 to-gray-400';
      default:
        return 'from-amber-600 to-amber-700';
    }
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
              <p className="text-muted-foreground">Manage your account and preferences</p>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
              className={isEditing ? "" : "bg-primary hover:bg-primary/90"}
            >
              {isEditing ? (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  View Mode
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-primary to-primary-600 rounded-full mx-auto flex items-center justify-center">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {profileData.firstName} {profileData.lastName}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{profileData.email}</p>
                
                {/* Loyalty Status */}
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <div className={`w-4 h-4 bg-gradient-to-r ${getTierColor(profileData.loyaltyTier)} rounded-full`}></div>
                    <span className="text-sm font-medium text-foreground capitalize">
                      {profileData.loyaltyTier} Member
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Gift className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {profileData.loyaltyPoints} points
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sm">Activity Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">AI Consultations</span>
                  <Badge variant="secondary">{activityStats.consultations}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Prescriptions</span>
                  <Badge variant="secondary">{activityStats.prescriptions}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Orders</span>
                  <Badge variant="secondary">{activityStats.orders}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Saved Medicines</span>
                  <Badge variant="secondary">{activityStats.savedMedicines}</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Personal</span>
                </TabsTrigger>
                <TabsTrigger value="health" className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Health</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Privacy</span>
                </TabsTrigger>
              </TabsList>

              {/* Personal Information */}
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-primary" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={profileData.dateOfBirth}
                            onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Preferred Language</Label>
                        <Select
                          value={profileData.language}
                          onValueChange={(value) => setProfileData(prev => ({ ...prev, language: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="uz">🇺🇿 O'zbek</SelectItem>
                            <SelectItem value="ru">🇷🇺 Русский</SelectItem>
                            <SelectItem value="en">🇺🇸 English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-3">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Health Information */}
              <TabsContent value="health">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-red-500" />
                        Health Profile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label>Blood Type</Label>
                          <Input value={healthData.bloodType} disabled={!isEditing} />
                        </div>
                        <div className="space-y-2">
                          <Label>Weight</Label>
                          <Input value={healthData.weight} disabled={!isEditing} />
                        </div>
                        <div className="space-y-2">
                          <Label>Height</Label>
                          <Input value={healthData.height} disabled={!isEditing} />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Allergies</h4>
                        <div className="flex flex-wrap gap-2">
                          {healthData.allergies.map((allergy, index) => (
                            <Badge key={index} variant="destructive">
                              {allergy}
                            </Badge>
                          ))}
                          {isEditing && (
                            <Button variant="outline" size="sm">
                              Add Allergy
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium text-foreground">Chronic Conditions</h4>
                        <div className="flex flex-wrap gap-2">
                          {healthData.chronicConditions.map((condition, index) => (
                            <Badge key={index} variant="secondary">
                              {condition}
                            </Badge>
                          ))}
                          {isEditing && (
                            <Button variant="outline" size="sm">
                              Add Condition
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Emergency Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Contact Name</Label>
                          <Input value={healthData.emergencyContact.name} disabled={!isEditing} />
                        </div>
                        <div className="space-y-2">
                          <Label>Relationship</Label>
                          <Input value={healthData.emergencyContact.relationship} disabled={!isEditing} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input value={healthData.emergencyContact.phone} disabled={!isEditing} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Notifications */}
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-primary" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Communication Channels</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Email Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                          </div>
                          <Switch
                            checked={profileData.notifications.email}
                            onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">SMS Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                          </div>
                          <Switch
                            checked={profileData.notifications.sms}
                            onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Push Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                          </div>
                          <Switch
                            checked={profileData.notifications.push}
                            onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Notification Types</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Order Updates</p>
                            <p className="text-sm text-muted-foreground">Updates about your orders and deliveries</p>
                          </div>
                          <Switch
                            checked={profileData.notifications.orderUpdates}
                            onCheckedChange={(checked) => handleNotificationChange('orderUpdates', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Health Reminders</p>
                            <p className="text-sm text-muted-foreground">Medication reminders and health tips</p>
                          </div>
                          <Switch
                            checked={profileData.notifications.healthReminders}
                            onCheckedChange={(checked) => handleNotificationChange('healthReminders', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Promotions & Offers</p>
                            <p className="text-sm text-muted-foreground">Special offers and promotional content</p>
                          </div>
                          <Switch
                            checked={profileData.notifications.promotions}
                            onCheckedChange={(checked) => handleNotificationChange('promotions', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy */}
              <TabsContent value="privacy">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      Privacy & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Data Sharing</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Share Health Data</p>
                            <p className="text-sm text-muted-foreground">Allow sharing anonymized health data for research</p>
                          </div>
                          <Switch
                            checked={profileData.privacy.shareHealthData}
                            onCheckedChange={(checked) => handlePrivacyChange('shareHealthData', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Analytics</p>
                            <p className="text-sm text-muted-foreground">Help improve our services with usage analytics</p>
                          </div>
                          <Switch
                            checked={profileData.privacy.allowAnalytics}
                            onCheckedChange={(checked) => handlePrivacyChange('allowAnalytics', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">Public Profile</p>
                            <p className="text-sm text-muted-foreground">Make basic profile information visible to others</p>
                          </div>
                          <Switch
                            checked={profileData.privacy.publicProfile}
                            onCheckedChange={(checked) => handlePrivacyChange('publicProfile', checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Account Security</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Change Password</Label>
                          <div className="flex space-x-2">
                            <div className="relative flex-1">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                disabled={!isEditing}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <Button variant="outline" disabled={!isEditing}>
                              Update
                            </Button>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full" disabled={!isEditing}>
                          Enable Two-Factor Authentication
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground text-red-600">Danger Zone</h4>
                      <div className="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                        <p className="text-sm text-red-800 dark:text-red-300 mb-4">
                          These actions are permanent and cannot be undone.
                        </p>
                        <div className="space-y-2">
                          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            Export My Data
                          </Button>
                          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

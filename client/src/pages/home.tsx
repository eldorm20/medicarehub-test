import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AIChatInterface } from '@/components/ai/ai-chat-interface';
import { LoyaltyProgram } from '@/components/loyalty/loyalty-program';
import { i18n } from '@/lib/i18n';
import { 
  Heart, 
  Bot, 
  Search, 
  Shield, 
  Clock, 
  Star,
  Truck,
  Store,
  CreditCard,
  Smartphone,
  Award,
  Users,
  BarChart3,
  Stethoscope
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center uzbek-pattern">
        <div className="absolute inset-0 medical-gradient opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Content */}
            <motion.div 
              className="text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect mb-6">
                <Bot className="h-4 w-4 text-amber-warm" />
                <span className="text-sm font-medium">AI-Powered Healthcare Platform</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {i18n.t('hero.title')}
                <span className="bg-gradient-to-r from-amber-warm to-yellow-300 bg-clip-text text-transparent block">
                  {i18n.t('hero.subtitle')}
                </span>
              </h1>
              
              <p className="text-xl text-slate-200 mb-8 leading-relaxed">
                {i18n.t('hero.description')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-warm">462K+</div>
                  <div className="text-sm text-slate-300">Registered Medicines</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-warm">24/7</div>
                  <div className="text-sm text-slate-300">AI Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-warm">100%</div>
                  <div className="text-sm text-slate-300">Legal Compliance</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/consultation">
                  <Button 
                    size="lg"
                    className="px-8 py-4 bg-amber-warm hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                  >
                    <Bot className="mr-2 h-5 w-5" />
                    {i18n.t('hero.startConsultation')}
                  </Button>
                </Link>
                <Link href="/medicines">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 glass-effect hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300 border-white/20"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    {i18n.t('hero.searchMedicines')}
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* AI Chat Interface */}
            <motion.div 
              className="h-[600px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AIChatInterface />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Comprehensive Healthcare Platform
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Everything you need for modern healthcare management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* AI Consultation */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-medical-teal/10 to-medical-mint/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-medical-teal to-medical-mint rounded-xl flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <CardTitle>AI Medical Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get instant medical advice powered by LLAMA AI technology
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-green-500 mr-2" />
                    Symptom analysis
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 text-green-500 mr-2" />
                    24/7 availability
                  </li>
                  <li className="flex items-center">
                    <Stethoscope className="h-4 w-4 text-green-500 mr-2" />
                    Professional guidance
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Medicine Search */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-uzbek-blue/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-uzbek-blue to-primary-500 rounded-xl flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Medicine Database</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Search through 462,000+ registered medicines from UzPharm registry
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-green-500 mr-2" />
                    Government verified
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 text-green-500 mr-2" />
                    Real-time availability
                  </li>
                  <li className="flex items-center">
                    <BarChart3 className="h-4 w-4 text-green-500 mr-2" />
                    Price comparison
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Prescription Analysis */}
            <Card className="relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-warm/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-amber-warm to-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Prescription Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Upload and verify prescriptions with AI-powered analysis
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-green-500 mr-2" />
                    Dosage verification
                  </li>
                  <li className="flex items-center">
                    <Clock className="h-4 w-4 text-green-500 mr-2" />
                    Drug interaction checks
                  </li>
                  <li className="flex items-center">
                    <Star className="h-4 w-4 text-green-500 mr-2" />
                    Safety warnings
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment & Delivery Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {i18n.t('payment.title')}
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              {i18n.t('payment.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Payment Methods */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                {i18n.t('payment.methods')}
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {i18n.t('payment.click')}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {i18n.t('payment.clickDesc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {i18n.t('payment.payme')}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {i18n.t('payment.paymeDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Options */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                {i18n.t('payment.deliveryOptions')}
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Truck className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {i18n.t('payment.yandexDelivery')}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {i18n.t('payment.yandexDesc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Store className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {i18n.t('payment.pharmacyPickup')}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {i18n.t('payment.pickupDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loyalty Program Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <LoyaltyProgram />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-slate-900 dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Government Licensed</h3>
              <p className="text-sm text-slate-400">Ministry of Health approved</p>
            </div>
            
            <div className="text-white">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">250+ Pharmacies</h3>
              <p className="text-sm text-slate-400">Nationwide network</p>
            </div>
            
            <div className="text-white">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-slate-400">LLAMA medical intelligence</p>
            </div>
            
            <div className="text-white">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Assured</h3>
              <p className="text-sm text-slate-400">ISO certified processes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

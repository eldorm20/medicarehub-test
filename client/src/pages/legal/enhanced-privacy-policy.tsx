import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, Calendar, Lock, Eye, Database, UserCheck, Globe, Phone, Mail, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            <Shield className="w-4 h-4 mr-2" />
            {t('legal.privacy_policy')}
          </Badge>
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {t('legal.privacy_policy')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            {t('legal.last_updated')}: December 15, 2024
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('legal.effective_date')}: January 1, 2025
          </p>
        </div>

        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <Shield className="h-4 w-4" />
          <AlertDescription className="text-gray-700 dark:text-gray-300">
            {t('legal.privacy_intro')}
          </AlertDescription>
        </Alert>

        <div className="grid gap-6">
          <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
                <Database className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                {t('legal.information_collection')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.personal_info')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.medical_info')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.usage_data')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.device_info')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
                <UserCheck className="w-5 h-5 mr-3 text-green-600 dark:text-green-400" />
                {t('legal.data_usage')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.service_provision')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.consultation_improvement')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.communication')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.legal_compliance')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
                <Lock className="w-5 h-5 mr-3 text-red-600 dark:text-red-400" />
                {t('legal.data_protection')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {t('legal.security_measures')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
                <Eye className="w-5 h-5 mr-3 text-indigo-600 dark:text-indigo-400" />
                {t('legal.user_rights')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.access_data')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.correct_data')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.delete_data')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300">{t('legal.data_portability')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800 dark:text-gray-200">
                <Mail className="w-5 h-5 mr-3 text-blue-600 dark:text-blue-400" />
                {t('legal.contact_info')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {t('legal.contact_privacy')}: 
                <a 
                  href="mailto:privacy@uzpharm.digital" 
                  className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                >
                  privacy@uzpharm.digital
                </a>
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            UzPharm Digital © 2024 - Uzbekistan Ministry of Health Licensed
          </p>
        </div>
      </motion.div>
    </div>
  );
}
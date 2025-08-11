import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AIChatInterface } from '@/components/ai/ai-chat-interface';
import { useToast } from '@/hooks/use-toast';
import { i18n } from '@/lib/i18n';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Camera, 
  Upload, 
  FileText, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Bot,
  Stethoscope,
  Shield,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AIConsultationPage() {
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const prescriptionMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('prescription', file);
      formData.append('userId', 'guest'); // In production, get from auth
      
      const response = await apiRequest('POST', '/api/ai/analyze-prescription', formData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: i18n.t('common.success'),
        description: 'Prescription analyzed successfully',
      });
    },
    onError: (error) => {
      console.error('Prescription analysis error:', error);
      toast({
        title: i18n.t('common.error'),
        description: i18n.t('errors.serverError'),
        variant: 'destructive',
      });
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPrescriptionFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrescriptionAnalysis = () => {
    if (prescriptionFile) {
      prescriptionMutation.mutate(prescriptionFile);
    }
  };

  const quickActions = [
    {
      title: 'Symptom Analysis',
      description: 'Describe your symptoms for AI analysis',
      icon: Activity,
      color: 'from-medical-mint to-medical-sage',
      action: () => toast({ title: 'Feature', description: 'Use the chat interface below' }),
    },
    {
      title: 'Drug Interaction Check',
      description: 'Check for medicine interactions',
      icon: Shield,
      color: 'from-amber-500 to-orange-500',
      action: () => toast({ title: 'Feature', description: 'Upload prescription or list medicines' }),
    },
    {
      title: 'Dosage Calculator',
      description: 'Calculate proper dosage',
      icon: Stethoscope,
      color: 'from-uzbek-blue to-primary-600',
      action: () => toast({ title: 'Feature', description: 'Coming soon' }),
    },
    {
      title: 'Emergency Assessment',
      description: 'Urgent symptom evaluation',
      icon: Zap,
      color: 'from-red-500 to-red-600',
      action: () => toast({ title: 'Emergency', description: 'For emergencies, call 103 immediately' }),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-effect mb-6 bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Medical Consultation</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Medical Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get expert medical advice powered by advanced AI. Upload prescriptions, 
            describe symptoms, or ask health-related questions.
          </p>
        </motion.div>

        {/* Emergency Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Alert className="mb-8 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-300">
              <strong>Medical Emergency:</strong> For life-threatening situations, 
              call 103 immediately or visit your nearest emergency room. 
              This AI assistant is not a substitute for professional medical care.
            </AlertDescription>
          </Alert>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Prescription Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-primary" />
                  Upload Prescription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!uploadPreview ? (
                    <div 
                      className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload prescription image
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports JPG, PNG files up to 5MB
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="relative">
                        <img 
                          src={uploadPreview} 
                          alt="Prescription preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            setPrescriptionFile(null);
                            setUploadPreview(null);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                      <Button
                        onClick={handlePrescriptionAnalysis}
                        disabled={prescriptionMutation.isPending}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {prescriptionMutation.isPending ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <FileText className="h-4 w-4 mr-2" />
                            Analyze Prescription
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Quick Actions</h3>
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-md transition-shadow duration-300"
                    onClick={action.action}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <action.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-foreground mb-1">
                            {action.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Health Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Health Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Take medications as prescribed by your doctor
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Keep a record of your medications and allergies
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Consult healthcare professionals for serious symptoms
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">
                      Never ignore persistent or worsening symptoms
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Chat Interface */}
          <motion.div 
            className="lg:col-span-2 h-[800px]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AIChatInterface />
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-300">
              <strong>Medical Disclaimer:</strong> This AI assistant provides general health information only 
              and is not a substitute for professional medical advice, diagnosis, or treatment. 
              Always consult qualified healthcare providers for medical concerns. 
              In case of emergency, contact emergency services immediately.
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>
    </div>
  );
}

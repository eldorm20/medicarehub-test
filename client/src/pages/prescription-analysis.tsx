import React, { useState, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Pill,
  Activity,
  Shield,
  Eye,
  Heart,
  Bot,
  Stethoscope
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';

interface AnalysisResult {
  success: boolean;
  medicines: Array<{
    name: string;
    dosage: string;
    frequency: string;
    instructions: string;
    available: boolean;
    interactions: string[];
    duration?: string;
  }>;
  warnings: string[];
  confidence: number;
  prescriptionText: string;
}

export default function PrescriptionAnalysis() {
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      handleAnalyze(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false
  });

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      // Simulate progress
      const intervals = [15, 35, 60, 80, 95, 100];
      for (const progress of intervals) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setAnalysisProgress(progress);
      }

      const formData = new FormData();
      formData.append('prescription', file);

      const response = await fetch('/api/ai/analyze-prescription', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setAnalysisResult(result);
      } else {
        throw new Error(result.message || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResult({
        success: false,
        medicines: [],
        warnings: ['Failed to analyze prescription. Please try again or contact support.'],
        confidence: 0,
        prescriptionText: ''
      });
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  };

  const handleCameraCapture = () => {
    // In a real app, this would open camera interface
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setUploadedFile(file);
        handleAnalyze(file);
      }
    };
    input.click();
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setUploadedFile(null);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              <FileText className="w-4 h-4 mr-2" />
              AI Prescription Analysis
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-foreground dark:text-foreground">
              Smart Prescription Analysis
            </h1>
            <p className="text-lg text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
              Upload your prescription and get instant AI-powered analysis, medicine identification, and safety information
            </p>
          </div>

          {/* Important Notice */}
          <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-amber-700 dark:text-amber-300">
              <strong>Medical Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. 
              Always consult with your healthcare provider before making any changes to your medication regimen.
            </AlertDescription>
          </Alert>

          {!analysisResult ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <Card className="bg-card dark:bg-card border-border dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground dark:text-foreground">
                    <Upload className="w-5 h-5 mr-2 text-primary" />
                    Upload Prescription
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isAnalyzing ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <Bot className="w-8 h-8 text-primary animate-pulse" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground dark:text-foreground">
                        Analyzing Prescription...
                      </h3>
                      <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4">
                        Our AI is reading and analyzing your prescription
                      </p>
                      <Progress value={analysisProgress} className="mb-2" />
                      <p className="text-xs text-muted-foreground dark:text-muted-foreground">
                        {analysisProgress}% Complete
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Drag and Drop Area */}
                      <div
                        {...getRootProps()}
                        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                          isDragActive
                            ? 'border-primary bg-primary/5'
                            : 'border-muted-foreground/20 hover:border-primary/50'
                        }`}
                      >
                        <input {...getInputProps()} />
                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold text-foreground dark:text-foreground mb-2">
                          {isDragActive ? 'Drop your prescription here' : 'Drag & drop your prescription'}
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4">
                          Or click to select from your device
                        </p>
                        <Button variant="outline" data-testid="select-file-btn">
                          Select File
                        </Button>
                      </div>

                      {/* Camera Button */}
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4">
                          Or take a photo directly
                        </p>
                        <Button
                          onClick={handleCameraCapture}
                          className="w-full"
                          data-testid="camera-capture-btn"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>

                      {/* File Requirements */}
                      <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                        <p className="font-medium mb-1">Requirements:</p>
                        <ul className="space-y-1">
                          <li>• Supported formats: JPEG, PNG, JPG</li>
                          <li>• Maximum file size: 5MB</li>
                          <li>• Ensure prescription is clearly visible</li>
                          <li>• Avoid glare and shadows</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Features Section */}
              <Card className="bg-card dark:bg-card border-border dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground dark:text-foreground">
                    <Activity className="w-5 h-5 mr-2 text-primary" />
                    Analysis Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground dark:text-foreground">OCR Text Recognition</h4>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                          Advanced optical character recognition to extract text from prescriptions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Pill className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground dark:text-foreground">Medicine Identification</h4>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                          Identify medications from Uzbekistan's 462K+ medicine database
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground dark:text-foreground">Safety Analysis</h4>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                          Check for drug interactions and safety warnings
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground dark:text-foreground">Dosage Verification</h4>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                          Verify proper dosage and administration instructions
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Analysis Results */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground dark:text-foreground">
                  Analysis Results
                </h2>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {analysisResult.confidence}% Confidence
                  </Badge>
                  <Button variant="outline" onClick={resetAnalysis} data-testid="analyze-new-btn">
                    Analyze New
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="medicines" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="medicines">Medicines</TabsTrigger>
                  <TabsTrigger value="warnings">Warnings</TabsTrigger>
                  <TabsTrigger value="original">Original Text</TabsTrigger>
                </TabsList>

                <TabsContent value="medicines" className="space-y-4">
                  {analysisResult.medicines.map((medicine, index) => (
                    <Card key={index} className="bg-card dark:bg-card border-border dark:border-border">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground dark:text-foreground">
                              {medicine.name}
                            </h3>
                            <p className="text-muted-foreground dark:text-muted-foreground">
                              {medicine.dosage}
                            </p>
                          </div>
                          <Badge className={medicine.available 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }>
                            {medicine.available ? 'Available' : 'Not Available'}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-foreground dark:text-foreground mb-1">
                              Frequency
                            </p>
                            <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                              {medicine.frequency}
                            </p>
                          </div>
                          {medicine.duration && (
                            <div>
                              <p className="text-sm font-medium text-foreground dark:text-foreground mb-1">
                                Duration
                              </p>
                              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                                {medicine.duration}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-medium text-foreground dark:text-foreground mb-1">
                            Instructions
                          </p>
                          <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                            {medicine.instructions}
                          </p>
                        </div>

                        {medicine.interactions.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium text-foreground dark:text-foreground mb-2">
                              Interactions & Precautions
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {medicine.interactions.map((interaction, idx) => (
                                <Badge key={idx} variant="destructive">
                                  {interaction}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="warnings" className="space-y-4">
                  {analysisResult.warnings.map((warning, index) => (
                    <Alert key={index} className="border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-amber-700 dark:text-amber-300">
                        {warning}
                      </AlertDescription>
                    </Alert>
                  ))}
                </TabsContent>

                <TabsContent value="original">
                  <Card className="bg-card dark:bg-card border-border dark:border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground dark:text-foreground">
                        Extracted Text
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="whitespace-pre-wrap text-sm text-muted-foreground dark:text-muted-foreground">
                        {analysisResult.prescriptionText}
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
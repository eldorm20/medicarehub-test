import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Upload,
  Camera,
  FileImage,
  X,
  CheckCircle,
  AlertTriangle,
  Bot,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface PrescriptionUploadProps {
  onAnalysisComplete?: (analysis: any) => void;
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'uploading' | 'analyzing' | 'completed' | 'error';
  analysis?: {
    medications: Array<{
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
    }>;
    doctorName?: string;
    dateIssued?: string;
    patientInfo?: {
      name?: string;
      age?: string;
    };
    warnings?: string[];
    confidence: number;
  };
}

export function PrescriptionUpload({ onAnalysisComplete }: PrescriptionUploadProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    handleFiles(droppedFiles);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };

  const handleFiles = async (fileList: File[]) => {
    if (files.length + fileList.length > 3) {
      toast({
        title: "Too many files",
        description: "You can upload up to 3 prescription images at once.",
        variant: "destructive",
      });
      return;
    }

    const newFiles: UploadedFile[] = fileList.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading'
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file upload and AI analysis
    for (const uploadedFile of newFiles) {
      try {
        // Simulate upload
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, status: 'analyzing' }
            : f
        ));

        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock analysis results
        const mockAnalysis = {
          medications: [
            {
              name: "Paracetamol 500mg",
              dosage: "500mg",
              frequency: "3 times daily",
              duration: "7 days"
            },
            {
              name: "Ibuprofen 400mg", 
              dosage: "400mg",
              frequency: "2 times daily",
              duration: "5 days"
            }
          ],
          doctorName: "Dr. Ahmad Karimov",
          dateIssued: new Date().toISOString().split('T')[0],
          patientInfo: {
            name: "Patient Name",
            age: "35"
          },
          warnings: [
            "Take with food to avoid stomach irritation",
            "Do not exceed recommended dosage"
          ],
          confidence: 94
        };

        setFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, status: 'completed', analysis: mockAnalysis }
            : f
        ));

        if (onAnalysisComplete) {
          onAnalysisComplete(mockAnalysis);
        }

        toast({
          title: "Analysis Complete",
          description: "Prescription has been analyzed successfully.",
        });

      } catch (error) {
        setFiles(prev => prev.map(f => 
          f.id === uploadedFile.id 
            ? { ...f, status: 'error' }
            : f
        ));

        toast({
          title: "Analysis Failed",
          description: "Failed to analyze prescription. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const capturePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // This would open camera interface - simplified for demo
      toast({
        title: "Camera Access",
        description: "Camera feature would open here in full implementation.",
      });
    } catch (error) {
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access or upload an image file.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="bg-card dark:bg-card border-border dark:border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground dark:text-foreground">
            <Upload className="h-5 w-5 mr-2 text-primary" />
            {t('ai.uploadPrescription') || 'Upload Prescription'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragOver
                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                : 'border-border dark:border-border hover:border-primary/50'
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            data-testid="prescription-upload-area"
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <FileImage className="h-16 w-16 text-muted-foreground dark:text-muted-foreground" />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground dark:text-foreground mb-2">
                  Upload prescription images
                </h3>
                <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4">
                  Drag and drop prescription images here, or click to browse
                </p>
              </div>

              <div className="flex justify-center space-x-4">
                <Button variant="outline" asChild className="border-border dark:border-border">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Browse Files
                  </label>
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  data-testid="file-input"
                />
                
                <Button 
                  variant="outline" 
                  onClick={capturePhoto}
                  className="border-border dark:border-border"
                  data-testid="camera-capture"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>

              <div className="text-xs text-muted-foreground dark:text-muted-foreground">
                Supported formats: JPG, PNG, WEBP • Max size: 10MB • Up to 3 files
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardHeader>
                <CardTitle className="text-foreground dark:text-foreground">
                  Uploaded Prescriptions ({files.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {files.map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex items-start space-x-4 p-4 bg-muted/30 dark:bg-muted/10 rounded-xl border border-border/50 dark:border-border/30"
                      data-testid={`uploaded-file-${file.id}`}
                    >
                      <div className="relative">
                        <img
                          src={file.preview}
                          alt="Prescription"
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        {file.status === 'completed' && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-foreground dark:text-foreground truncate">
                              {file.file.name}
                            </p>
                            <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                              {(file.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(file.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Status */}
                        <div className="mt-2">
                          {file.status === 'uploading' && (
                            <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Uploading...</span>
                            </div>
                          )}
                          
                          {file.status === 'analyzing' && (
                            <div className="flex items-center space-x-2 text-sm text-amber-600 dark:text-amber-400">
                              <Bot className="h-4 w-4" />
                              <span>AI is analyzing prescription...</span>
                            </div>
                          )}

                          {file.status === 'error' && (
                            <div className="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400">
                              <AlertTriangle className="h-4 w-4" />
                              <span>Analysis failed</span>
                            </div>
                          )}

                          {file.status === 'completed' && file.analysis && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm font-medium text-foreground dark:text-foreground">
                                  Analysis Complete ({file.analysis.confidence}% confidence)
                                </span>
                              </div>
                              
                              <div className="text-sm">
                                <p className="text-muted-foreground dark:text-muted-foreground mb-1">
                                  Doctor: {file.analysis.doctorName || 'Not specified'}
                                </p>
                                <p className="text-muted-foreground dark:text-muted-foreground mb-2">
                                  Medications found: {file.analysis.medications.length}
                                </p>
                                
                                {file.analysis.warnings && file.analysis.warnings.length > 0 && (
                                  <Alert className="mt-2">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertDescription>
                                      <div className="space-y-1">
                                        {file.analysis.warnings.map((warning, index) => (
                                          <p key={index} className="text-sm">{warning}</p>
                                        ))}
                                      </div>
                                    </AlertDescription>
                                  </Alert>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
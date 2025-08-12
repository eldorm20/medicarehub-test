import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDropzone } from 'react-dropzone';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, 
  FileText, 
  Camera, 
  CheckCircle, 
  AlertTriangle, 
  X,
  Eye,
  Download,
  Share,
  Pill,
  Clock
} from 'lucide-react';

interface AnalyzedPrescription {
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    warnings: string[];
    interactions: string[];
  }>;
  doctorInfo: {
    name: string;
    specialty: string;
    license: string;
  };
  patientInfo: {
    name: string;
    age: string;
  };
  validity: {
    isValid: boolean;
    issues: string[];
  };
  confidence: number;
}

export default function PrescriptionAnalysis() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzedPrescription | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles(acceptedFiles);
    toast({
      title: 'File Uploaded',
      description: `${acceptedFiles.length} file(s) uploaded successfully.`,
    });
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const analyzePrescription = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: 'No Files Selected',
        description: 'Please upload prescription images to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        medications: [
          {
            name: 'Amoxicillin 500mg',
            dosage: '500mg',
            frequency: '3 times daily',
            duration: '7 days',
            warnings: ['Take with food', 'Complete full course'],
            interactions: ['Warfarin - Monitor INR']
          },
          {
            name: 'Paracetamol 500mg',
            dosage: '500mg',
            frequency: 'As needed, max 4 times daily',
            duration: '5 days',
            warnings: ['Do not exceed 4g daily', 'Avoid alcohol'],
            interactions: []
          }
        ],
        doctorInfo: {
          name: 'Dr. Salima Karimova',
          specialty: 'General Practitioner',
          license: 'UZ-MP-12345'
        },
        patientInfo: {
          name: 'Patient Name',
          age: '35 years'
        },
        validity: {
          isValid: true,
          issues: []
        },
        confidence: 94
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Prescription Analysis</h1>
          <p className="text-muted-foreground">
            Upload prescription images for AI-powered verification and analysis
          </p>
        </div>

        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload Prescription</span>
            </CardTitle>
            <CardDescription>
              Drag and drop prescription images or PDFs, or click to select files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-4">
                <div className="flex justify-center">
                  {isDragActive ? (
                    <Upload className="h-12 w-12 text-primary animate-bounce" />
                  ) : (
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-lg font-medium">
                    {isDragActive ? 'Drop files here' : 'Upload prescription files'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports JPEG, PNG, WebP, and PDF files up to 10MB
                  </p>
                </div>
                <Button variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Select Files
                </Button>
              </div>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="font-medium">Uploaded Files:</p>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button 
              onClick={analyzePrescription}
              disabled={uploadedFiles.length === 0 || isAnalyzing}
              className="w-full mt-4"
            >
              {isAnalyzing ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Prescription...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Analyze Prescription
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">AI Analysis in Progress</span>
                </div>
                <Progress value={66} className="w-full" />
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>✓ Image processing complete</p>
                  <p>✓ Text extraction complete</p>
                  <p>⏳ Medication verification in progress...</p>
                  <p>⏳ Drug interaction analysis...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-4">
            {/* Confidence Score */}
            <Alert className={analysisResult.confidence > 90 ? 'border-green-500' : 'border-orange-500'}>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Analysis Confidence: {analysisResult.confidence}%</strong>
                <br />
                {analysisResult.validity.isValid 
                  ? 'Prescription appears to be valid and properly formatted.'
                  : 'Issues detected with prescription validity.'}
              </AlertDescription>
            </Alert>

            {/* Prescription Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Doctor Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span>
                    <p>{analysisResult.doctorInfo.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Specialty:</span>
                    <p>{analysisResult.doctorInfo.specialty}</p>
                  </div>
                  <div>
                    <span className="font-medium">License:</span>
                    <p className="font-mono">{analysisResult.doctorInfo.license}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <span className="font-medium">Name:</span>
                    <p>{analysisResult.patientInfo.name}</p>
                  </div>
                  <div>
                    <span className="font-medium">Age:</span>
                    <p>{analysisResult.patientInfo.age}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Medications */}
            <Card>
              <CardHeader>
                <CardTitle>Prescribed Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisResult.medications.map((med, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-lg">{med.name}</h4>
                        <Badge variant="outline">{med.dosage}</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Frequency:</span>
                          <p>{med.frequency}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">Duration:</span>
                          <p>{med.duration}</p>
                        </div>
                      </div>

                      {med.warnings.length > 0 && (
                        <div className="mb-3">
                          <span className="text-sm font-medium text-orange-600">Warnings:</span>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {med.warnings.map((warning, i) => (
                              <li key={i} className="text-orange-600">{warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {med.interactions.length > 0 && (
                        <div>
                          <span className="text-sm font-medium text-red-600">Drug Interactions:</span>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {med.interactions.map((interaction, i) => (
                              <li key={i} className="text-red-600">{interaction}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button className="h-20 flex flex-col space-y-2">
                    <Pill className="h-6 w-6" />
                    <span>Find Medicines</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Download className="h-6 w-6" />
                    <span>Download Report</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Share className="h-6 w-6" />
                    <span>Share with Doctor</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col space-y-2">
                    <Clock className="h-6 w-6" />
                    <span>Set Reminders</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Disclaimer */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Medical Disclaimer:</strong> This analysis is for informational purposes only. 
            Always verify prescriptions with qualified healthcare providers and pharmacists before 
            taking any medication.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
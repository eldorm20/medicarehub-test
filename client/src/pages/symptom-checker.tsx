import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus, 
  X, 
  Activity, 
  AlertTriangle, 
  Heart,
  Thermometer,
  Brain,
  Stethoscope,
  Clock
} from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: 'mild' | 'moderate' | 'severe';
}

const commonSymptoms: Symptom[] = [
  { id: '1', name: 'Headache', category: 'Neurological', severity: 'mild' },
  { id: '2', name: 'Fever', category: 'General', severity: 'moderate' },
  { id: '3', name: 'Cough', category: 'Respiratory', severity: 'mild' },
  { id: '4', name: 'Chest Pain', category: 'Cardiovascular', severity: 'severe' },
  { id: '5', name: 'Nausea', category: 'Gastrointestinal', severity: 'mild' },
  { id: '6', name: 'Dizziness', category: 'Neurological', severity: 'moderate' },
  { id: '7', name: 'Shortness of Breath', category: 'Respiratory', severity: 'severe' },
  { id: '8', name: 'Fatigue', category: 'General', severity: 'mild' },
];

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedSymptoms.find(s => s.id === symptom.id)
  );

  const addSymptom = (symptom: Symptom) => {
    setSelectedSymptoms([...selectedSymptoms, symptom]);
    setSearchQuery('');
  };

  const removeSymptom = (symptomId: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s.id !== symptomId));
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: 'No Symptoms Selected',
        description: 'Please select at least one symptom to analyze.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const severityScore = selectedSymptoms.reduce((acc, symptom) => {
        return acc + (symptom.severity === 'severe' ? 3 : symptom.severity === 'moderate' ? 2 : 1);
      }, 0);

      const riskLevel = severityScore > 6 ? 'high' : severityScore > 3 ? 'medium' : 'low';

      setAnalysisResult({
        riskLevel,
        possibleConditions: [
          'Common Cold',
          'Viral Infection',
          'Stress-related symptoms',
          'Dehydration'
        ],
        recommendations: [
          'Get adequate rest',
          'Stay hydrated',
          'Monitor symptoms',
          'Consider consulting a healthcare provider if symptoms persist'
        ],
        urgency: riskLevel === 'high' ? 'Seek immediate medical attention' : 
                riskLevel === 'medium' ? 'Schedule appointment within 24-48 hours' : 
                'Monitor symptoms and rest'
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return 'bg-red-500';
      case 'moderate':
        return 'bg-orange-500';
      default:
        return 'bg-green-500';
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      default:
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">AI Symptom Checker</h1>
          <p className="text-muted-foreground">
            Describe your symptoms and get AI-powered health insights
          </p>
        </div>

        {/* Symptom Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Select Your Symptoms</span>
            </CardTitle>
            <CardDescription>
              Search and add symptoms you're experiencing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Search symptoms (e.g., headache, fever, cough)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>

            {/* Search Results */}
            {searchQuery && filteredSymptoms.length > 0 && (
              <div className="border rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">Available symptoms:</p>
                <div className="space-y-2">
                  {filteredSymptoms.slice(0, 5).map((symptom) => (
                    <div
                      key={symptom.id}
                      className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                      onClick={() => addSymptom(symptom)}
                    >
                      <div className="flex items-center space-x-3">
                        <span>{symptom.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {symptom.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getSeverityColor(symptom.severity)}`}></div>
                        <Plus className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Symptoms */}
            {selectedSymptoms.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map((symptom) => (
                    <Badge
                      key={symptom.id}
                      variant="secondary"
                      className="flex items-center space-x-2 pr-1"
                    >
                      <span>{symptom.name}</span>
                      <button
                        onClick={() => removeSymptom(symptom.id)}
                        className="ml-1 hover:bg-muted rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={analyzeSymptoms}
              disabled={selectedSymptoms.length === 0 || isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Symptoms...
                </>
              ) : (
                <>
                  <Stethoscope className="mr-2 h-4 w-4" />
                  Analyze Symptoms
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Loading */}
        {isAnalyzing && (
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">AI Analysis in Progress</span>
                </div>
                <Progress value={33} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Our AI is analyzing your symptoms and comparing them with medical databases...
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-4">
            <Alert className={getRiskLevelColor(analysisResult.riskLevel)}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Risk Level: {analysisResult.riskLevel.toUpperCase()}</strong>
                <br />
                {analysisResult.urgency}
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span>Possible Conditions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.possibleConditions.map((condition: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Thermometer className="h-5 w-5 text-green-500" />
                    <span>Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button asChild className="h-20 flex flex-col space-y-2">
                    <Link href="/consultation">
                      <Stethoscope className="h-6 w-6" />
                      <span>{i18n.t('symptomChecker.consultDoctor')}</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex flex-col space-y-2">
                    <Link href="/medicines">
                      <Search className="h-6 w-6" />
                      <span>Find Medicines</span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="h-20 flex flex-col space-y-2">
                    <Link href="/orders">
                      <Clock className="h-6 w-6" />
                      <span>Order History</span>
                    </Link>
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
            <strong>Medical Disclaimer:</strong> This symptom checker is for informational purposes only 
            and should not replace professional medical advice. Always consult with a healthcare provider 
            for proper diagnosis and treatment.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
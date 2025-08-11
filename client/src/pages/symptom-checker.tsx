import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Thermometer,
  Heart,
  Brain,
  Activity,
  Shield,
  Bot,
  Stethoscope,
  Phone,
  User,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Symptom {
  id: string;
  name: string;
  category: string;
  severity: 'mild' | 'moderate' | 'severe';
}

interface Assessment {
  condition: string;
  probability: number;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  description: string;
  recommendations: string[];
  seekImmediateCare: boolean;
}

export default function SymptomChecker() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAssessing, setIsAssessing] = useState(false);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  
  const [userInfo, setUserInfo] = useState({
    age: '',
    gender: '',
    duration: '',
    severity: '',
    description: ''
  });

  const symptomCategories = [
    {
      name: 'General',
      icon: Activity,
      color: 'from-blue-500 to-cyan-600',
      symptoms: [
        { id: '1', name: 'Fever', category: 'General', severity: 'moderate' },
        { id: '2', name: 'Fatigue', category: 'General', severity: 'mild' },
        { id: '3', name: 'Weakness', category: 'General', severity: 'mild' },
        { id: '4', name: 'Chills', category: 'General', severity: 'moderate' },
        { id: '5', name: 'Night sweats', category: 'General', severity: 'moderate' }
      ]
    },
    {
      name: 'Respiratory',
      icon: Activity,
      color: 'from-green-500 to-teal-600',
      symptoms: [
        { id: '6', name: 'Cough', category: 'Respiratory', severity: 'mild' },
        { id: '7', name: 'Shortness of breath', category: 'Respiratory', severity: 'severe' },
        { id: '8', name: 'Chest pain', category: 'Respiratory', severity: 'severe' },
        { id: '9', name: 'Sore throat', category: 'Respiratory', severity: 'mild' },
        { id: '10', name: 'Runny nose', category: 'Respiratory', severity: 'mild' }
      ]
    },
    {
      name: 'Digestive',
      icon: Heart,
      color: 'from-orange-500 to-red-600',
      symptoms: [
        { id: '11', name: 'Nausea', category: 'Digestive', severity: 'moderate' },
        { id: '12', name: 'Vomiting', category: 'Digestive', severity: 'moderate' },
        { id: '13', name: 'Diarrhea', category: 'Digestive', severity: 'moderate' },
        { id: '14', name: 'Stomach pain', category: 'Digestive', severity: 'moderate' },
        { id: '15', name: 'Loss of appetite', category: 'Digestive', severity: 'mild' }
      ]
    },
    {
      name: 'Neurological',
      icon: Brain,
      color: 'from-purple-500 to-violet-600',
      symptoms: [
        { id: '16', name: 'Headache', category: 'Neurological', severity: 'moderate' },
        { id: '17', name: 'Dizziness', category: 'Neurological', severity: 'moderate' },
        { id: '18', name: 'Confusion', category: 'Neurological', severity: 'severe' },
        { id: '19', name: 'Memory problems', category: 'Neurological', severity: 'moderate' },
        { id: '20', name: 'Seizures', category: 'Neurological', severity: 'severe' }
      ]
    }
  ];

  const allSymptoms = symptomCategories.flatMap(category => category.symptoms);
  const filteredSymptoms = allSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSymptom = (symptom: Symptom) => {
    setSelectedSymptoms(prev => {
      const exists = prev.find(s => s.id === symptom.id);
      if (exists) {
        return prev.filter(s => s.id !== symptom.id);
      }
      return [...prev, symptom];
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'severe':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const handleAssessment = async () => {
    setIsAssessing(true);
    
    // Simulate AI assessment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock assessment result
    const mockAssessment: Assessment = {
      condition: 'Common Cold',
      probability: 78,
      severity: selectedSymptoms.some(s => s.severity === 'severe') ? 'high' : 'medium',
      description: 'Based on your symptoms, you may be experiencing a common cold or upper respiratory infection.',
      recommendations: [
        'Get plenty of rest and stay hydrated',
        'Consider over-the-counter pain relievers for aches',
        'Use a humidifier or breathe steam to ease congestion',
        'Gargle with warm salt water for sore throat',
        'Monitor symptoms and seek care if they worsen'
      ],
      seekImmediateCare: selectedSymptoms.some(s => 
        ['Shortness of breath', 'Chest pain', 'Confusion', 'Seizures'].includes(s.name)
      )
    };
    
    setAssessment(mockAssessment);
    setIsAssessing(false);
    setStep(4);
  };

  const resetChecker = () => {
    setStep(1);
    setSelectedSymptoms([]);
    setSearchQuery('');
    setAssessment(null);
    setUserInfo({
      age: '',
      gender: '',
      duration: '',
      severity: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              <Stethoscope className="w-4 h-4 mr-2" />
              AI Symptom Checker
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-foreground dark:text-foreground">
              Symptom Assessment
            </h1>
            <p className="text-lg text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
              Get personalized health insights based on your symptoms using advanced AI analysis
            </p>
          </div>

          {/* Important Disclaimer */}
          <Alert className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800 mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-700 dark:text-red-300">
              <strong>Emergency Warning:</strong> If you're experiencing chest pain, difficulty breathing, severe bleeding, 
              loss of consciousness, or other life-threatening symptoms, call 103 immediately or go to the nearest emergency room.
            </AlertDescription>
          </Alert>

          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-8 h-0.5 ${
                      step > stepNumber ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Symptom Selection */}
          {step === 1 && (
            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground dark:text-foreground">
                  <Search className="w-5 h-5 mr-2 text-primary" />
                  Select Your Symptoms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search symptoms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="symptom-search-input"
                  />
                </div>

                {/* Selected Symptoms */}
                {selectedSymptoms.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground dark:text-foreground">Selected Symptoms:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <Badge
                          key={symptom.id}
                          className="cursor-pointer hover:bg-destructive"
                          onClick={() => toggleSymptom(symptom)}
                        >
                          {symptom.name} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Symptom Categories */}
                <div className="space-y-6">
                  {searchQuery ? (
                    <div>
                      <h3 className="font-medium mb-3 text-foreground dark:text-foreground">Search Results:</h3>
                      <div className="grid gap-2">
                        {filteredSymptoms.map((symptom) => (
                          <div
                            key={symptom.id}
                            className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedSymptoms.find(s => s.id === symptom.id)
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => toggleSymptom(symptom)}
                          >
                            <div className="flex items-center space-x-3">
                              <Checkbox 
                                checked={selectedSymptoms.some(s => s.id === symptom.id)}
                                readOnly
                              />
                              <span className="text-foreground dark:text-foreground">{symptom.name}</span>
                            </div>
                            <Badge className={getSeverityColor(symptom.severity)}>
                              {symptom.severity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    symptomCategories.map((category, index) => (
                      <div key={index}>
                        <h3 className="flex items-center font-medium mb-3 text-foreground dark:text-foreground">
                          <div className={`w-6 h-6 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-2`}>
                            <category.icon className="w-3 h-3 text-white" />
                          </div>
                          {category.name}
                        </h3>
                        <div className="grid gap-2">
                          {category.symptoms.map((symptom) => (
                            <div
                              key={symptom.id}
                              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                selectedSymptoms.find(s => s.id === symptom.id)
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => toggleSymptom(symptom)}
                            >
                              <div className="flex items-center space-x-3">
                                <Checkbox 
                                  checked={selectedSymptoms.some(s => s.id === symptom.id)}
                                  readOnly
                                />
                                <span className="text-foreground dark:text-foreground">{symptom.name}</span>
                              </div>
                              <Badge className={getSeverityColor(symptom.severity)}>
                                {symptom.severity}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => setStep(2)}
                  disabled={selectedSymptoms.length === 0}
                  data-testid="continue-to-details-btn"
                >
                  Continue ({selectedSymptoms.length} symptoms selected)
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Additional Information */}
          {step === 2 && (
            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground dark:text-foreground">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                      Age
                    </label>
                    <Input
                      placeholder="Enter your age"
                      value={userInfo.age}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, age: e.target.value }))}
                      data-testid="age-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                      Gender
                    </label>
                    <Select onValueChange={(value) => setUserInfo(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger data-testid="gender-select">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                      How long have you had these symptoms?
                    </label>
                    <Select onValueChange={(value) => setUserInfo(prev => ({ ...prev, duration: value }))}>
                      <SelectTrigger data-testid="duration-select">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hours">A few hours</SelectItem>
                        <SelectItem value="1-day">1 day</SelectItem>
                        <SelectItem value="2-3-days">2-3 days</SelectItem>
                        <SelectItem value="week">About a week</SelectItem>
                        <SelectItem value="weeks">Several weeks</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                      Overall severity
                    </label>
                    <Select onValueChange={(value) => setUserInfo(prev => ({ ...prev, severity: value }))}>
                      <SelectTrigger data-testid="severity-select">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mild">Mild - Doesn't interfere with daily activities</SelectItem>
                        <SelectItem value="moderate">Moderate - Some impact on daily activities</SelectItem>
                        <SelectItem value="severe">Severe - Significant impact on daily activities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                    Additional details (optional)
                  </label>
                  <Textarea
                    placeholder="Describe any additional symptoms, when they started, what makes them better or worse..."
                    rows={4}
                    value={userInfo.description}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, description: e.target.value }))}
                    data-testid="description-textarea"
                  />
                </div>

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(1)} data-testid="back-to-symptoms-btn">
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => setStep(3)} data-testid="continue-to-review-btn">
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <Card className="bg-card dark:bg-card border-border dark:border-border">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground dark:text-foreground">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                  Review Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Symptoms Review */}
                <div>
                  <h3 className="font-medium mb-3 text-foreground dark:text-foreground">Selected Symptoms:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map((symptom) => (
                      <Badge key={symptom.id} className={getSeverityColor(symptom.severity)}>
                        {symptom.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* User Info Review */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2 text-foreground dark:text-foreground">Personal Information:</h3>
                    <ul className="text-sm text-muted-foreground dark:text-muted-foreground space-y-1">
                      <li>Age: {userInfo.age || 'Not provided'}</li>
                      <li>Gender: {userInfo.gender || 'Not provided'}</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-foreground dark:text-foreground">Symptom Details:</h3>
                    <ul className="text-sm text-muted-foreground dark:text-muted-foreground space-y-1">
                      <li>Duration: {userInfo.duration || 'Not provided'}</li>
                      <li>Severity: {userInfo.severity || 'Not provided'}</li>
                    </ul>
                  </div>
                </div>

                {userInfo.description && (
                  <div>
                    <h3 className="font-medium mb-2 text-foreground dark:text-foreground">Additional Details:</h3>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground p-3 bg-muted rounded-lg">
                      {userInfo.description}
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button variant="outline" onClick={() => setStep(2)} data-testid="back-to-details-btn">
                    Back
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={handleAssessment}
                    disabled={isAssessing}
                    data-testid="get-assessment-btn"
                  >
                    {isAssessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Analyzing...
                      </>
                    ) : (
                      'Get AI Assessment'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Assessment Results */}
          {step === 4 && assessment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Emergency Warning */}
              {assessment.seekImmediateCare && (
                <Alert className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-red-700 dark:text-red-300">
                    <strong>Seek Immediate Medical Care:</strong> Your symptoms may require immediate attention. 
                    Contact a healthcare provider or call 103 if this is an emergency.
                  </AlertDescription>
                </Alert>
              )}

              {/* Assessment Result */}
              <Card className="bg-card dark:bg-card border-border dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-foreground dark:text-foreground">
                    <div className="flex items-center">
                      <Bot className="w-5 h-5 mr-2 text-primary" />
                      AI Assessment Results
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      {assessment.probability}% Match
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-foreground">
                      Possible Condition: {assessment.condition}
                    </h3>
                    <p className="text-muted-foreground dark:text-muted-foreground">
                      {assessment.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-foreground dark:text-foreground">Recommendations:</h4>
                    <ul className="space-y-2">
                      {assessment.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground dark:text-muted-foreground">
                            {recommendation}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <Button onClick={resetChecker} data-testid="new-assessment-btn">
                      New Assessment
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/ai-consultation'} data-testid="ai-consultation-btn">
                      <Bot className="w-4 h-4 mr-2" />
                      Get AI Consultation
                    </Button>
                    <Button variant="outline" onClick={() => window.open('tel:+998711234567')} data-testid="call-support-btn">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
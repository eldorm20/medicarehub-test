import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Calendar, 
  Stethoscope, 
  Bot,
  Phone,
  Clock,
  Shield,
  Heart,
  FileText,
  UserCheck,
  Globe,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MedicalDisclaimerPage() {
  const lastUpdated = "December 1, 2024";

  const emergencyNumbers = [
    { service: "Emergency Medical Services", number: "103", description: "Life-threatening emergencies" },
    { service: "Ambulance", number: "103", description: "Medical emergencies requiring immediate transport" },
    { service: "Poison Control", number: "103", description: "Poisoning and toxic substance emergencies" },
    { service: "Mental Health Crisis", number: "1051", description: "Mental health emergencies" }
  ];

  const warningBoxes = [
    {
      title: "Emergency Situations",
      icon: AlertTriangle,
      color: "border-red-500 bg-red-50 dark:bg-red-900/20",
      content: "For life-threatening emergencies, chest pain, difficulty breathing, severe bleeding, or loss of consciousness, call 103 immediately or go to the nearest emergency room."
    },
    {
      title: "AI Limitations",
      icon: Bot,
      color: "border-amber-500 bg-amber-50 dark:bg-amber-900/20",
      content: "Our AI assistant cannot replace professional medical diagnosis, physical examination, or emergency medical care. It provides general information only."
    },
    {
      title: "Prescription Safety",
      icon: Shield,
      color: "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
      content: "Never start, stop, or change medications without consulting your healthcare provider. Always verify prescriptions with licensed pharmacists."
    }
  ];

  const sections = [
    {
      title: "Nature of AI Medical Assistant",
      icon: Bot,
      content: [
        "The AI medical assistant provided by UzPharm Digital is an artificial intelligence system designed to provide general health information and educational content.",
        "The AI system is trained on medical literature and data but cannot replace the expertise, judgment, and personal care of licensed healthcare professionals.",
        "AI responses are generated based on patterns in training data and may not account for individual medical history, current health status, or unique circumstances.",
        "The AI cannot perform physical examinations, order diagnostic tests, or provide definitive medical diagnoses.",
        "All AI recommendations should be discussed with qualified healthcare providers before making any medical decisions."
      ]
    },
    {
      title: "Not a Substitute for Professional Medical Care",
      icon: Stethoscope,
      content: [
        "The information provided through our platform is not intended to diagnose, treat, cure, or prevent any disease or medical condition.",
        "Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
        "Never disregard professional medical advice or delay in seeking it because of information received through our platform.",
        "If you think you may have a medical emergency, call your doctor or emergency services immediately.",
        "The relationship between you and UzPharm Digital does not constitute a doctor-patient relationship."
      ]
    },
    {
      title: "Prescription and Medication Guidance",
      icon: Shield,
      content: [
        "All prescription medications require valid prescriptions from licensed healthcare providers.",
        "Medication information provided is for educational purposes only and should not replace pharmacist consultation.",
        "Always read medication labels, warnings, and consult with pharmacists before taking any medication.",
        "Report any adverse drug reactions to your healthcare provider and relevant authorities immediately.",
        "Dosage recommendations from AI should always be verified with healthcare professionals.",
        "Drug interaction checks are informational and may not be comprehensive; consult pharmacists for complete analysis."
      ]
    },
    {
      title: "Emergency Medical Situations",
      icon: AlertTriangle,
      content: [
        "Our platform is not designed for emergency medical situations or urgent care needs.",
        "If you are experiencing a medical emergency, call 103 immediately or go to your nearest emergency room.",
        "Signs of medical emergency include but are not limited to: chest pain, difficulty breathing, severe bleeding, loss of consciousness, stroke symptoms, or severe allergic reactions.",
        "Do not use our platform for time-sensitive medical decisions that require immediate professional intervention.",
        "Emergency medical services should always be your first choice in life-threatening situations."
      ]
    },
    {
      title: "Accuracy and Currency of Information",
      icon: FileText,
      content: [
        "While we strive to provide accurate and up-to-date information, medical knowledge is constantly evolving.",
        "Information on our platform may not reflect the most current medical research or clinical guidelines.",
        "Individual responses to treatments and medications can vary significantly from general information provided.",
        "We cannot guarantee the accuracy, completeness, or currency of all medical information on our platform.",
        "Always verify important medical information with current medical literature or healthcare professionals."
      ]
    },
    {
      title: "Individual Health Considerations",
      icon: UserCheck,
      content: [
        "The AI system cannot account for your complete medical history, current medications, allergies, or other individual factors.",
        "Medical recommendations that may be appropriate for one person may not be suitable for another.",
        "Pre-existing medical conditions, pregnancy, age, and other factors can significantly affect medical recommendations.",
        "Always inform healthcare providers about all medications, supplements, and health conditions before following any recommendations.",
        "Genetic factors, lifestyle, and environmental considerations are not fully assessed by our AI system."
      ]
    },
    {
      title: "Mental Health Considerations",
      icon: Heart,
      content: [
        "Our platform is not designed to provide mental health crisis intervention or emergency psychiatric care.",
        "If you are experiencing thoughts of self-harm or suicide, contact emergency services (103) or mental health crisis services (1051) immediately.",
        "Mental health information provided is educational and cannot replace professional psychiatric or psychological evaluation.",
        "Mental health conditions require specialized care from qualified mental health professionals.",
        "Our AI cannot assess mental health status or provide therapy or counseling services."
      ]
    },
    {
      title: "Regulatory Compliance",
      icon: Globe,
      content: [
        "UzPharm Digital operates under the regulatory framework of the Republic of Uzbekistan.",
        "All pharmacy partners are licensed by the Ministry of Health of the Republic of Uzbekistan.",
        "Medicine information is based on the State Register of Medicines and Medical Devices of Uzbekistan.",
        "Healthcare recommendations may not be applicable in other countries with different medical standards.",
        "Always ensure compliance with local laws and regulations regarding medication use and healthcare practices."
      ]
    },
    {
      title: "Limitation of Liability",
      icon: Shield,
      content: [
        "UzPharm Digital and its partners shall not be liable for any decisions made or actions taken based on information provided through our platform.",
        "We do not assume responsibility for any adverse effects, complications, or outcomes resulting from use of our platform.",
        "Users assume full responsibility for consulting with appropriate healthcare professionals before making medical decisions.",
        "Our platform provides information and tools but cannot be held responsible for medical outcomes.",
        "Always maintain appropriate medical insurance and healthcare provider relationships independent of our platform."
      ]
    }
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
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-medium text-red-600">Important Medical Information</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Medical Disclaimer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Important information about the limitations of our AI medical assistant 
            and the importance of professional healthcare.
          </p>
        </motion.div>

        {/* Emergency Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Alert className="mb-8 border-red-500 bg-red-50 dark:bg-red-900/20">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-red-800 dark:text-red-300">MEDICAL EMERGENCY:</strong>
                  <span className="text-red-700 dark:text-red-400 ml-2">
                    For life-threatening situations, call 103 immediately or visit your nearest emergency room. 
                    This platform is not for emergency medical care.
                  </span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-red-600 hover:bg-red-700 text-white ml-4 flex items-center space-x-1"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call 103</span>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Warning Boxes */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {warningBoxes.map((warning, index) => (
            <Alert key={index} className={warning.color}>
              <warning.icon className="h-5 w-5" />
              <AlertDescription>
                <h4 className="font-semibold mb-2">{warning.title}</h4>
                <p className="text-sm">{warning.content}</p>
              </AlertDescription>
            </Alert>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Emergency Information Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="sticky top-24 space-y-6">
              {/* Emergency Numbers */}
              <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center text-red-800 dark:text-red-300">
                    <Phone className="h-4 w-4 mr-2" />
                    Emergency Numbers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {emergencyNumbers.map((emergency, index) => (
                    <div key={index} className="p-3 bg-white dark:bg-slate-800 rounded-lg border">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{emergency.service}</span>
                        <Badge variant="destructive" className="font-bold">{emergency.number}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{emergency.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Last Updated */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Last Updated: {lastUpdated}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Important Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report Emergency
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Find Healthcare Provider
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Disclaimer Content */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {/* Introduction */}
                  <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                      Important Medical Disclaimer
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      The UzPharm Digital platform provides health information and AI-powered assistance for educational 
                      and informational purposes only. This disclaimer outlines the important limitations of our services 
                      and emphasizes the critical importance of professional medical care. Please read this information 
                      carefully before using our platform.
                    </p>
                  </div>

                  {/* Sections */}
                  <div className="space-y-8">
                    {sections.map((section, index) => (
                      <div key={index}>
                        <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border flex items-center">
                          <section.icon className="h-5 w-5 mr-2 text-primary" />
                          {section.title}
                        </h3>
                        <div className="space-y-3">
                          {section.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-muted-foreground text-sm leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Final Warning */}
                  <div className="mt-12 p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-3 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Final Important Notice
                    </h3>
                    <p className="text-red-700 dark:text-red-400 text-sm leading-relaxed mb-4">
                      By using the UzPharm Digital platform, you acknowledge that you have read, understood, 
                      and agree to this medical disclaimer. You understand that our AI assistant and platform 
                      cannot replace professional medical care and that you should always consult with qualified 
                      healthcare providers for medical advice, diagnosis, and treatment.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-red-600" />
                        <span className="text-red-700 dark:text-red-400">Emergency: 103</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-red-600" />
                        <span className="text-red-700 dark:text-red-400">Medical questions: consult your healthcare provider</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-red-600" />
                        <span className="text-red-700 dark:text-red-400">Our AI is available 24/7 for general information only</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Stethoscope, Phone, FileText } from 'lucide-react';

export default function MedicalDisclaimer() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Medical Disclaimer</h1>
          <p className="text-muted-foreground">
            Important information about UzPharm Digital's healthcare services
          </p>
        </div>

        {/* Emergency Notice */}
        <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>EMERGENCY NOTICE:</strong> If you are experiencing a medical emergency, 
            call 103 (Emergency Services) immediately. Do not use UzPharm Digital for emergency situations.
          </AlertDescription>
        </Alert>

        {/* Main Disclaimer */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Stethoscope className="h-5 w-5" />
              <span>Medical Disclaimer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>General Medical Disclaimer</h2>
            <p>
              <strong>UzPharm Digital is a healthcare technology platform that provides educational 
              information and connects users with licensed healthcare services. Our AI-powered consultation 
              service is designed to provide general health information and should NOT be considered 
              a substitute for professional medical advice, diagnosis, or treatment.</strong>
            </p>

            <h2>AI Consultation Service Limitations</h2>
            <p>
              Our AI medical assistant has specific limitations that users must understand:
            </p>

            <h3>What Our AI CAN Do:</h3>
            <ul>
              <li>Provide general health education and information</li>
              <li>Help you understand common symptoms and conditions</li>
              <li>Suggest when you should seek professional medical care</li>
              <li>Offer general wellness tips and preventive care guidance</li>
              <li>Help you prepare questions for your healthcare provider</li>
              <li>Provide medication information and general drug interactions</li>
            </ul>

            <h3>What Our AI CANNOT Do:</h3>
            <ul>
              <li><strong>Diagnose medical conditions</strong> - Only licensed physicians can provide diagnoses</li>
              <li><strong>Prescribe medications</strong> - Only authorized healthcare providers can prescribe drugs</li>
              <li><strong>Replace emergency care</strong> - Cannot handle urgent or life-threatening situations</li>
              <li><strong>Provide personalized treatment</strong> - Cannot account for individual medical complexity</li>
              <li><strong>Perform physical examinations</strong> - Cannot assess physical symptoms or conditions</li>
              <li><strong>Interpret medical tests</strong> - Cannot analyze lab results, X-rays, or other diagnostics</li>
            </ul>

            <h2>When to Seek Professional Medical Care</h2>
            <p>
              <strong>Always consult with qualified healthcare providers for:</strong>
            </p>

            <h3>Immediate Medical Attention Required:</h3>
            <ul>
              <li>Chest pain or difficulty breathing</li>
              <li>Severe allergic reactions</li>
              <li>Loss of consciousness or altered mental state</li>
              <li>Severe bleeding or trauma</li>
              <li>Signs of stroke (sudden numbness, confusion, severe headache)</li>
              <li>Severe abdominal pain</li>
              <li>High fever with severe symptoms</li>
            </ul>

            <h3>Professional Medical Consultation Needed:</h3>
            <ul>
              <li>Persistent or worsening symptoms</li>
              <li>New or unusual symptoms</li>
              <li>Chronic health conditions</li>
              <li>Mental health concerns</li>
              <li>Pregnancy-related questions</li>
              <li>Medication changes or side effects</li>
              <li>Preventive care and health screenings</li>
            </ul>

            <h2>Prescription and Medication Warnings</h2>
            <p>
              <strong>Important medication safety information:</strong>
            </p>

            <h3>Prescription Verification:</h3>
            <ul>
              <li>Our prescription analysis is for informational purposes only</li>
              <li>Always verify prescriptions with licensed pharmacists</li>
              <li>Prescription authenticity must be confirmed by healthcare providers</li>
              <li>Never take medications without proper medical supervision</li>
            </ul>

            <h3>Drug Interactions and Allergies:</h3>
            <ul>
              <li>AI-generated drug interaction warnings are not comprehensive</li>
              <li>Always inform pharmacists of all medications you're taking</li>
              <li>Disclose all allergies and previous adverse reactions</li>
              <li>Consult healthcare providers before starting new medications</li>
            </ul>

            <h2>Liability and Responsibility</h2>
            <p>
              <strong>User Responsibility:</strong>
            </p>
            <ul>
              <li>You are responsible for your own healthcare decisions</li>
              <li>Information provided is for educational purposes only</li>
              <li>You must seek professional medical advice for health concerns</li>
              <li>You should not delay seeking medical care based on AI consultations</li>
            </ul>

            <p>
              <strong>Platform Limitations:</strong>
            </p>
            <ul>
              <li>UzPharm Digital does not practice medicine or provide medical diagnoses</li>
              <li>We cannot guarantee the accuracy of AI-generated information</li>
              <li>We are not responsible for healthcare outcomes or treatment decisions</li>
              <li>Partner pharmacies are independently responsible for their services</li>
            </ul>

            <h2>Special Populations</h2>
            <p>
              <strong>Enhanced caution advised for:</strong>
            </p>

            <h3>Pregnant and Nursing Women:</h3>
            <ul>
              <li>Always consult obstetricians or healthcare providers</li>
              <li>Medication safety during pregnancy requires professional guidance</li>
              <li>Many medications are not safe during pregnancy or breastfeeding</li>
            </ul>

            <h3>Children and Adolescents:</h3>
            <ul>
              <li>Pediatric healthcare requires specialized medical attention</li>
              <li>Medication dosing for children must be professionally calculated</li>
              <li>Parental supervision required for all health-related decisions</li>
            </ul>

            <h3>Elderly Patients:</h3>
            <ul>
              <li>Increased risk of medication interactions and complications</li>
              <li>Chronic conditions require ongoing medical supervision</li>
              <li>Age-related changes affect medication metabolism</li>
            </ul>

            <h2>Regulatory Compliance</h2>
            <p>
              UzPharm Digital operates under the regulatory framework of the Republic of Uzbekistan:
            </p>
            <ul>
              <li>Licensed by the Ministry of Health of the Republic of Uzbekistan</li>
              <li>Compliant with pharmaceutical and healthcare regulations</li>
              <li>Partner pharmacies hold valid operating licenses</li>
              <li>Subject to regular regulatory oversight and compliance audits</li>
            </ul>

            <h2>Information Accuracy</h2>
            <p>
              While we strive to provide accurate and up-to-date information:
            </p>
            <ul>
              <li>Medical knowledge is constantly evolving</li>
              <li>AI responses are based on training data and may not reflect latest developments</li>
              <li>Individual medical situations vary greatly</li>
              <li>Information should be verified with current medical literature and professionals</li>
            </ul>

            <h2>Contact Information for Medical Emergencies</h2>
            <p>
              <strong>Emergency Services in Uzbekistan:</strong>
            </p>
            <ul>
              <li><strong>Emergency Medical Services:</strong> 103</li>
              <li><strong>Poison Control:</strong> Contact nearest hospital emergency department</li>
              <li><strong>Mental Health Crisis:</strong> Contact local mental health services</li>
            </ul>

            <p>
              <strong>For Non-Emergency Medical Questions:</strong>
            </p>
            <ul>
              <li>Consult your primary healthcare provider</li>
              <li>Contact your pharmacy for medication questions</li>
              <li>Use UzPharm Digital's platform for general health education</li>
            </ul>
          </CardContent>
        </Card>

        {/* Final Warning */}
        <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-900/20">
          <Phone className="h-5 w-5 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            <strong>Remember:</strong> When in doubt about your health, always err on the side of caution 
            and seek professional medical advice. Your health and safety are paramount.
          </AlertDescription>
        </Alert>

        {/* Acknowledgment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>User Acknowledgment</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              By using UzPharm Digital's services, you acknowledge that you have read, understood, 
              and agree to this Medical Disclaimer. You understand the limitations of our AI consultation 
              service and agree to seek appropriate professional medical care when needed.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              <strong>Last Updated:</strong> January 15, 2024<br />
              <strong>Contact:</strong> medical-disclaimer@uzpharm.digital
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
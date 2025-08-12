import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Privacy Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Your privacy and the security of your medical information are our top priorities. 
            This policy explains how we collect, use, and protect your personal data.
          </AlertDescription>
        </Alert>

        {/* Privacy Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5" />
              <span>Privacy Policy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information to provide better healthcare services and improve your experience 
              on UzPharm Digital:
            </p>

            <h3>Personal Information</h3>
            <ul>
              <li><strong>Account Information:</strong> Name, email, phone number, date of birth</li>
              <li><strong>Address Information:</strong> Delivery and billing addresses</li>
              <li><strong>Payment Information:</strong> Payment method details (processed securely)</li>
              <li><strong>Identification:</strong> Government ID for prescription verification</li>
            </ul>

            <h3>Health Information</h3>
            <ul>
              <li><strong>Consultation Data:</strong> Symptoms, health concerns, AI consultation history</li>
              <li><strong>Prescription Information:</strong> Uploaded prescriptions and analysis results</li>
              <li><strong>Medical History:</strong> Previous consultations and health records (with consent)</li>
              <li><strong>Medication Data:</strong> Current medications and allergy information</li>
            </ul>

            <h3>Technical Information</h3>
            <ul>
              <li><strong>Device Data:</strong> Device type, operating system, browser information</li>
              <li><strong>Usage Analytics:</strong> How you interact with our platform</li>
              <li><strong>Location Data:</strong> General location for pharmacy recommendations</li>
              <li><strong>Cookies:</strong> Preferences and session management</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use your information solely for providing healthcare services and improving our platform:
            </p>

            <h3>Service Provision</h3>
            <ul>
              <li>Provide AI medical consultations and health guidance</li>
              <li>Process prescription analysis and verification</li>
              <li>Connect you with licensed pharmacies and healthcare providers</li>
              <li>Facilitate medicine orders and delivery coordination</li>
              <li>Maintain your health records and consultation history</li>
            </ul>

            <h3>Safety and Compliance</h3>
            <ul>
              <li>Verify prescriptions and prevent medication errors</li>
              <li>Check for drug interactions and allergies</li>
              <li>Comply with pharmaceutical regulations and licensing requirements</li>
              <li>Detect and prevent fraudulent activities</li>
            </ul>

            <h3>Platform Improvement</h3>
            <ul>
              <li>Analyze usage patterns to improve our AI algorithms</li>
              <li>Enhance user experience and platform functionality</li>
              <li>Develop new features and services</li>
              <li>Conduct research to advance digital healthcare (anonymized data only)</li>
            </ul>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>
              We share your information only when necessary for service provision or as required by law:
            </p>

            <h3>Healthcare Partners</h3>
            <ul>
              <li><strong>Licensed Pharmacies:</strong> Prescription and delivery information</li>
              <li><strong>Healthcare Providers:</strong> With your explicit consent only</li>
              <li><strong>Medical Professionals:</strong> For complex consultation cases (anonymized)</li>
            </ul>

            <h3>Service Providers</h3>
            <ul>
              <li><strong>Payment Processors:</strong> Click, Payme, and authorized payment services</li>
              <li><strong>Delivery Partners:</strong> Yandex Delivery and logistics providers</li>
              <li><strong>Technology Partners:</strong> Secure cloud hosting and AI services</li>
            </ul>

            <h3>Legal Requirements</h3>
            <ul>
              <li>Compliance with Uzbekistan's healthcare regulations</li>
              <li>Response to valid legal requests and court orders</li>
              <li>Protection of rights, safety, and security</li>
              <li>Regulatory reporting as required by law</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement comprehensive security measures to protect your sensitive health information:
            </p>

            <h3>Technical Safeguards</h3>
            <ul>
              <li><strong>Encryption:</strong> End-to-end encryption for all medical data</li>
              <li><strong>Secure Storage:</strong> SOC 2 compliant cloud infrastructure</li>
              <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
              <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
            </ul>

            <h3>Operational Safeguards</h3>
            <ul>
              <li>Staff training on privacy and security protocols</li>
              <li>Regular software updates and security patches</li>
              <li>Incident response and breach notification procedures</li>
              <li>Data backup and disaster recovery plans</li>
            </ul>

            <h2>5. Your Privacy Rights</h2>
            <p>
              You have significant control over your personal and health information:
            </p>

            <h3>Access and Control</h3>
            <ul>
              <li><strong>View Your Data:</strong> Access all information we have about you</li>
              <li><strong>Update Information:</strong> Correct or update your personal details</li>
              <li><strong>Download Data:</strong> Export your health records and consultation history</li>
              <li><strong>Delete Account:</strong> Request complete account and data deletion</li>
            </ul>

            <h3>Consent Management</h3>
            <ul>
              <li>Withdraw consent for data processing at any time</li>
              <li>Control which healthcare providers can access your information</li>
              <li>Manage communication preferences and notifications</li>
              <li>Opt out of research and analytics (anonymized data)</li>
            </ul>

            <h2>6. Data Retention</h2>
            <p>
              We retain your information only as long as necessary for service provision and legal compliance:
            </p>
            <ul>
              <li><strong>Active Accounts:</strong> Data retained while account is active</li>
              <li><strong>Medical Records:</strong> 7 years as required by healthcare regulations</li>
              <li><strong>Prescription Data:</strong> 5 years for pharmaceutical compliance</li>
              <li><strong>Payment Records:</strong> 3 years for financial and tax purposes</li>
              <li><strong>Anonymous Analytics:</strong> Indefinitely for research and improvement</li>
            </ul>

            <h2>7. International Data Transfers</h2>
            <p>
              Your data is primarily stored and processed within Uzbekistan. When international 
              transfers are necessary:
            </p>
            <ul>
              <li>Transfers are limited to trusted partners with adequate protections</li>
              <li>All transfers comply with Uzbekistan's data protection laws</li>
              <li>Data processing agreements ensure equivalent protection standards</li>
              <li>You will be notified of any significant changes to data location</li>
            </ul>

            <h2>8. Children's Privacy</h2>
            <p>
              UzPharm Digital is not intended for children under 18 without parental supervision:
            </p>
            <ul>
              <li>Parental consent required for users under 18</li>
              <li>Parents have access to and control over their children's accounts</li>
              <li>Enhanced privacy protections for minors</li>
              <li>Special procedures for handling children's health information</li>
            </ul>

            <h2>9. Cookies and Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for platform functionality</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              <li><strong>Analytics Cookies:</strong> Help us improve our services (optional)</li>
              <li><strong>Security Cookies:</strong> Protect against fraud and unauthorized access</li>
            </ul>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy to reflect changes in our practices or legal requirements:
            </p>
            <ul>
              <li>Material changes will be communicated via email and platform notifications</li>
              <li>Non-material changes will be posted with updated effective dates</li>
              <li>Continued use after changes constitutes acceptance</li>
              <li>Historical versions are archived and available upon request</li>
            </ul>

            <h2>11. Contact Us</h2>
            <p>
              For privacy-related questions, concerns, or requests:
            </p>
            <ul>
              <li><strong>Privacy Officer:</strong> privacy@uzpharm.digital</li>
              <li><strong>Data Protection:</strong> dpo@uzpharm.digital</li>
              <li><strong>Phone:</strong> +998 71 123 45 67 (Privacy Department)</li>
              <li><strong>Mail:</strong> Privacy Department, UzPharm Digital, Innovation District, Building 42, Tashkent 100084, Uzbekistan</li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert>
            <Eye className="h-4 w-4" />
            <AlertDescription>
              <strong>Transparency:</strong> We believe in clear, honest communication about your data. 
              If you have questions, we're here to help.
            </AlertDescription>
          </Alert>

          <Alert>
            <FileText className="h-4 w-4" />
            <AlertDescription>
              <strong>Your Rights:</strong> You have comprehensive rights over your personal data. 
              Contact us to exercise these rights at any time.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
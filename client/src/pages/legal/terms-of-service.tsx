import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, FileText } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: January 15, 2024
          </p>
        </div>

        {/* Important Notice */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> By using UzPharm Digital services, you agree to these terms. 
            Please read them carefully as they contain important information about your rights and obligations.
          </AlertDescription>
        </Alert>

        {/* Terms Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Terms and Conditions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using UzPharm Digital ("the Platform"), you accept and agree to be bound by 
              these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              UzPharm Digital is a healthcare technology platform that provides:
            </p>
            <ul>
              <li>AI-powered medical consultation services</li>
              <li>Medicine search and pharmacy connectivity</li>
              <li>Prescription analysis and verification</li>
              <li>Medicine ordering and delivery coordination</li>
              <li>Healthcare information and education</li>
            </ul>

            <h2>3. Medical Disclaimer</h2>
            <p>
              <strong>IMPORTANT MEDICAL DISCLAIMER:</strong> UzPharm Digital's AI consultation service 
              is designed to provide general health information and should not be considered a substitute 
              for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified 
              healthcare providers with any questions you may have regarding medical conditions.
            </p>
            <ul>
              <li>Our AI assistant provides educational information only</li>
              <li>Emergency medical situations require immediate professional care</li>
              <li>Prescription medications should only be taken under medical supervision</li>
              <li>Drug interactions and allergies must be verified with healthcare professionals</li>
            </ul>

            <h2>4. User Responsibilities</h2>
            <p>As a user of UzPharm Digital, you agree to:</p>
            <ul>
              <li>Provide accurate and truthful information</li>
              <li>Use the platform for lawful purposes only</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Report any suspected unauthorized use of your account</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>

            <h2>5. Privacy and Data Protection</h2>
            <p>
              We are committed to protecting your privacy and personal health information. Our data 
              practices are governed by:
            </p>
            <ul>
              <li>Uzbekistan's personal data protection laws</li>
              <li>International healthcare privacy standards</li>
              <li>Our comprehensive Privacy Policy</li>
              <li>Medical data encryption and security protocols</li>
            </ul>

            <h2>6. Pharmacy Partner Network</h2>
            <p>
              UzPharm Digital partners with licensed pharmacies across Uzbekistan. We verify that all 
              partner pharmacies:
            </p>
            <ul>
              <li>Hold valid operating licenses from the Ministry of Health</li>
              <li>Comply with pharmaceutical regulations and standards</li>
              <li>Maintain proper medicine storage and handling protocols</li>
              <li>Employ qualified pharmaceutical professionals</li>
            </ul>

            <h2>7. Payment Terms</h2>
            <p>
              Payment for medicines and services is processed through secure channels:
            </p>
            <ul>
              <li>Payments are processed via Click, Payme, or authorized payment providers</li>
              <li>All transactions are encrypted and secure</li>
              <li>Refunds are subject to pharmacy and delivery partner policies</li>
              <li>Consultation fees are non-refundable once service is provided</li>
            </ul>

            <h2>8. Delivery and Fulfillment</h2>
            <p>
              Medicine delivery is coordinated through our partner network:
            </p>
            <ul>
              <li>Delivery times are estimates and may vary based on location and availability</li>
              <li>Prescription medications require proper identification and verification</li>
              <li>We are not responsible for delays caused by weather, traffic, or external factors</li>
              <li>Damaged or incorrect orders should be reported immediately</li>
            </ul>

            <h2>9. Intellectual Property</h2>
            <p>
              The UzPharm Digital platform, including its AI technology, content, and design, is protected 
              by intellectual property laws. You may not:
            </p>
            <ul>
              <li>Copy, modify, or distribute our proprietary technology</li>
              <li>Reverse engineer our AI algorithms or systems</li>
              <li>Use our trademarks or branding without permission</li>
              <li>Create derivative works based on our platform</li>
            </ul>

            <h2>10. Limitation of Liability</h2>
            <p>
              UzPharm Digital operates as a technology platform connecting users with healthcare services. 
              Our liability is limited as follows:
            </p>
            <ul>
              <li>We are not responsible for medical outcomes or treatment decisions</li>
              <li>Pharmacy partners are independently responsible for medicine quality and delivery</li>
              <li>AI consultations are educational tools, not medical diagnoses</li>
              <li>Total liability is limited to the amount paid for services</li>
            </ul>

            <h2>11. Regulatory Compliance</h2>
            <p>
              UzPharm Digital complies with Uzbekistan's healthcare and pharmaceutical regulations:
            </p>
            <ul>
              <li>Licensed under the Ministry of Health's digital health initiatives</li>
              <li>Registered with the Agency for Development of the Pharmaceutical Industry</li>
              <li>Compliant with pharmaceutical e-commerce regulations</li>
              <li>Subject to regular regulatory audits and compliance reviews</li>
            </ul>

            <h2>12. Termination</h2>
            <p>
              Either party may terminate this agreement:
            </p>
            <ul>
              <li>Users may close their accounts at any time</li>
              <li>We may suspend accounts for violations of these terms</li>
              <li>Termination does not affect completed transactions</li>
              <li>Data retention is subject to our Privacy Policy</li>
            </ul>

            <h2>13. Changes to Terms</h2>
            <p>
              We may update these terms to reflect changes in our services or legal requirements. 
              Significant changes will be communicated through:
            </p>
            <ul>
              <li>Email notifications to registered users</li>
              <li>Prominent notices on our platform</li>
              <li>Updated version dates on this page</li>
            </ul>

            <h2>14. Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us:
            </p>
            <ul>
              <li><strong>Email:</strong> legal@uzpharm.digital</li>
              <li><strong>Phone:</strong> +998 71 123 45 67</li>
              <li><strong>Address:</strong> Innovation District, Building 42, Tashkent 100084, Uzbekistan</li>
            </ul>
          </CardContent>
        </Card>

        {/* Footer Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            These terms are governed by the laws of the Republic of Uzbekistan. Any disputes will be 
            resolved through the appropriate courts of Uzbekistan.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Calendar, 
  Lock, 
  Eye,
  Database,
  UserCheck,
  Globe,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  const lastUpdated = "December 1, 2024";
  const effectiveDate = "January 1, 2025";

  const sections = [
    {
      title: "1. Information We Collect",
      icon: Database,
      content: [
        "Personal Information: Name, email address, phone number, date of birth, address, and profile photo.",
        "Health Information: Medical history, prescription information, allergies, chronic conditions, and AI consultation data.",
        "Usage Data: Information about how you use our platform, including search queries, page views, and feature usage.",
        "Device Information: IP address, browser type, device type, operating system, and unique device identifiers.",
        "Location Data: General location information for delivery services and pharmacy recommendations.",
        "Payment Information: Payment method details (processed securely by our payment partners)."
      ]
    },
    {
      title: "2. How We Use Your Information",
      icon: UserCheck,
      content: [
        "Provide AI-powered medical consultations and health recommendations.",
        "Process medicine orders and manage prescription verification.",
        "Connect you with licensed pharmacies and healthcare providers.",
        "Personalize your experience and improve our services.",
        "Send important notifications about your orders and health reminders.",
        "Ensure platform security and prevent fraudulent activities.",
        "Comply with legal obligations and regulatory requirements.",
        "Analyze usage patterns to improve our AI algorithms and platform functionality."
      ]
    },
    {
      title: "3. Health Information Protection",
      icon: Lock,
      content: [
        "All health information is encrypted both in transit and at rest using industry-standard AES-256 encryption.",
        "Access to health data is strictly limited to authorized personnel on a need-to-know basis.",
        "We implement role-based access controls to ensure only relevant staff can access specific types of information.",
        "Health data is stored separately from other personal information with additional security measures.",
        "We maintain detailed audit logs of all access to and changes made to health information.",
        "Regular security assessments and penetration testing are conducted to ensure data protection.",
        "We comply with international healthcare data protection standards and Uzbekistan's personal data protection laws."
      ]
    },
    {
      title: "4. Information Sharing and Disclosure",
      icon: Eye,
      content: [
        "Licensed Pharmacies: Order information necessary to fulfill your medicine purchases.",
        "Healthcare Providers: Prescription and health information when you choose to share it.",
        "AI Service Providers: Anonymized data for improving AI algorithms (no personal identifiers).",
        "Payment Processors: Transaction information necessary to process payments (Click, Payme).",
        "Delivery Services: Contact and address information for order delivery (Yandex Delivery).",
        "Legal Compliance: When required by law, court order, or regulatory authorities.",
        "We never sell your personal or health information to third parties for marketing purposes.",
        "All data sharing is governed by strict data processing agreements that ensure the same level of protection."
      ]
    },
    {
      title: "5. Data Retention",
      icon: FileText,
      content: [
        "Personal account information is retained while your account is active and for 7 years after account closure.",
        "Health consultation data is retained for 10 years to support continuity of care and legal requirements.",
        "Prescription information is retained for 5 years as required by Uzbekistan pharmaceutical regulations.",
        "Order history is retained for 3 years for customer service and warranty purposes.",
        "Anonymous usage analytics may be retained indefinitely for service improvement.",
        "You can request deletion of certain data types, subject to legal and regulatory requirements.",
        "We automatically delete temporary data (such as session tokens) according to security best practices."
      ]
    },
    {
      title: "6. Your Rights and Choices",
      icon: UserCheck,
      content: [
        "Access: Request a copy of the personal information we have about you.",
        "Correction: Update or correct inaccurate personal information.",
        "Deletion: Request deletion of your personal information (subject to legal requirements).",
        "Portability: Request your data in a structured, machine-readable format.",
        "Restriction: Request limitation of processing of your personal information.",
        "Objection: Object to certain types of processing, such as for marketing purposes.",
        "Consent Withdrawal: Withdraw consent for processing that is based on consent.",
        "Complaint: File a complaint with relevant data protection authorities."
      ]
    },
    {
      title: "7. Cookies and Tracking Technologies",
      icon: Globe,
      content: [
        "Essential Cookies: Required for platform functionality, security, and user authentication.",
        "Analytics Cookies: Help us understand how users interact with our platform to improve services.",
        "Preference Cookies: Remember your settings and preferences for a personalized experience.",
        "Marketing Cookies: Used to deliver relevant advertisements and measure their effectiveness.",
        "Third-party Cookies: Some features may use cookies from trusted partners (Google Analytics, payment processors).",
        "You can control cookie preferences through your browser settings.",
        "Disabling certain cookies may limit platform functionality."
      ]
    },
    {
      title: "8. International Data Transfers",
      icon: Globe,
      content: [
        "Your data is primarily stored and processed in Uzbekistan.",
        "Some services (AI processing, analytics) may involve transfers to countries with adequate data protection laws.",
        "All international transfers are protected by appropriate safeguards such as Standard Contractual Clauses.",
        "We ensure that any country receiving your data has adequate data protection standards.",
        "You have the right to request information about international transfers affecting your data."
      ]
    },
    {
      title: "9. Children's Privacy",
      icon: Shield,
      content: [
        "Our platform is not intended for children under 16 years of age.",
        "We do not knowingly collect personal information from children under 16.",
        "If we become aware that a child under 16 has provided us with personal information, we will delete it.",
        "Parents or guardians can create accounts for children under their supervision.",
        "Special protections apply to any health information of minors.",
        "If you believe a child has provided us with personal information, please contact us immediately."
      ]
    },
    {
      title: "10. Security Measures",
      icon: Lock,
      content: [
        "End-to-end encryption for all sensitive health communications.",
        "Multi-factor authentication for account access and sensitive operations.",
        "Regular security audits and vulnerability assessments.",
        "Employee training on data protection and privacy best practices.",
        "Incident response procedures for potential data breaches.",
        "Network security measures including firewalls and intrusion detection systems.",
        "Secure development practices and code review processes.",
        "Regular backups with encryption and secure storage."
      ]
    },
    {
      title: "11. AI and Algorithm Transparency",
      icon: Database,
      content: [
        "Our AI systems are trained on anonymized and aggregated health data.",
        "We use explainable AI techniques to provide transparent health recommendations.",
        "AI decisions are always labeled as such and include appropriate disclaimers.",
        "Users can request information about how AI recommendations are generated.",
        "We continuously monitor AI systems for bias and accuracy.",
        "AI training data is carefully curated and does not include personal identifiers.",
        "We maintain human oversight over AI recommendations, especially for critical health matters."
      ]
    },
    {
      title: "12. Breach Notification",
      icon: Shield,
      content: [
        "We will notify you within 72 hours of discovering any data breach that may affect your personal information.",
        "Notifications will include the nature of the breach, the data involved, and steps being taken to address it.",
        "We will also notify relevant authorities as required by Uzbekistan data protection laws.",
        "In case of a health data breach, we will provide additional support and guidance.",
        "We maintain a comprehensive incident response plan to minimize the impact of any security incidents."
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
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Privacy & Data Protection</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how we collect, use, and protect your personal and health information 
            on the UzPharm Digital platform.
          </p>
        </motion.div>

        {/* Document Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Alert className="mb-8 border-primary/20 bg-primary/5">
            <Lock className="h-4 w-4 text-primary" />
            <AlertDescription className="text-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Your Privacy Matters:</strong> We are committed to protecting your personal 
                  and health information with the highest standards of security and transparency.
                </div>
                <div className="flex space-x-4 text-sm">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>Updated: {lastUpdated}</span>
                  </Badge>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <FileText className="h-3 w-3" />
                    <span>Effective: {effectiveDate}</span>
                  </Badge>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Table of Contents</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {sections.map((section, index) => (
                      <a
                        key={index}
                        href={`#section-${index}`}
                        className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors py-1 px-2 rounded hover:bg-primary/5"
                      >
                        <section.icon className="h-3 w-3" />
                        <span>{section.title}</span>
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>

              {/* Privacy Contact */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    Privacy Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>privacy@uzpharm.digital</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>+998 71 123 45 67</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span>Data Protection Officer</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <button className="w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1 px-2 rounded hover:bg-primary/5">
                    Download My Data
                  </button>
                  <button className="w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1 px-2 rounded hover:bg-primary/5">
                    Update Preferences
                  </button>
                  <button className="w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1 px-2 rounded hover:bg-primary/5">
                    Delete My Account
                  </button>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Privacy Content */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {/* Introduction */}
                  <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      Our Commitment to Your Privacy
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      At UzPharm Digital, we understand that your health information is deeply personal and sensitive. 
                      This Privacy Policy explains how we collect, use, protect, and share your information when you 
                      use our AI-powered digital pharmacy platform. We are committed to maintaining the highest 
                      standards of privacy protection and transparency in accordance with the laws of the Republic 
                      of Uzbekistan and international best practices.
                    </p>
                  </div>

                  {/* Legal Framework */}
                  <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-blue-600" />
                      Legal Framework
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      Our privacy practices comply with:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Law of the Republic of Uzbekistan "On Personal Data" (2019)</li>
                      <li>Law "On Medicines and Pharmaceutical Activity"</li>
                      <li>Regulations of the Ministry of Health of the Republic of Uzbekistan</li>
                      <li>International healthcare data protection standards</li>
                    </ul>
                  </div>

                  {/* Sections */}
                  <div className="space-y-8">
                    {sections.map((section, index) => (
                      <div key={index} id={`section-${index}`}>
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

                  {/* Contact Section */}
                  <div className="mt-12 p-6 bg-primary/5 rounded-xl">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Contact Our Data Protection Officer</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      If you have any questions about this Privacy Policy or wish to exercise your rights, 
                      please contact our Data Protection Officer:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Email: privacy@uzpharm.digital</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Phone: +998 71 123 45 67</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Address: Data Protection Office, Tashkent, Republic of Uzbekistan</span>
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

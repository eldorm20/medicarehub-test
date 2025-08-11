import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Calendar, 
  AlertTriangle, 
  Shield, 
  Scale,
  Globe,
  Phone,
  Mail
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
  const lastUpdated = "December 1, 2024";
  const effectiveDate = "January 1, 2025";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using UzPharm Digital platform, you accept and agree to be bound by the terms and provision of this agreement.",
        "If you do not agree to abide by the above, please do not use this service.",
        "These terms apply to all users of the platform, including but not limited to clients, pharmacy sellers, pharmacy owners, and administrators."
      ]
    },
    {
      title: "2. Platform Description",
      content: [
        "UzPharm Digital is an AI-powered digital pharmacy platform that provides:",
        "• Medical consultation services through artificial intelligence",
        "• Medicine search and ordering capabilities",
        "• Prescription analysis and verification",
        "• Connection to licensed pharmacies in Uzbekistan",
        "• Health management and tracking tools"
      ]
    },
    {
      title: "3. Medical Disclaimer and AI Services",
      content: [
        "The AI medical assistant provided on this platform is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.",
        "Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.",
        "Never disregard professional medical advice or delay in seeking it because of something you have read on this platform.",
        "In case of a medical emergency, immediately call emergency services (103 in Uzbekistan) or go to the nearest emergency room."
      ]
    },
    {
      title: "4. User Accounts and Registration",
      content: [
        "To access certain features of the platform, you must register for an account.",
        "You are responsible for maintaining the confidentiality of your account and password.",
        "You agree to accept responsibility for all activities that occur under your account.",
        "You must provide accurate, current, and complete information during the registration process.",
        "You must notify us immediately of any unauthorized use of your account."
      ]
    },
    {
      title: "5. Prescription and Medicine Services",
      content: [
        "All medicines available on the platform are registered with the State Agency for Development of the Pharmaceutical Industry of the Republic of Uzbekistan.",
        "Prescription medicines require valid prescriptions from licensed healthcare providers.",
        "We reserve the right to verify prescriptions and refuse orders that do not comply with applicable laws.",
        "Medicine prices are set by individual pharmacies and may vary.",
        "Availability of medicines is subject to pharmacy inventory."
      ]
    },
    {
      title: "6. Payment and Delivery",
      content: [
        "Accepted payment methods include Click, Payme, and cash on delivery (where available).",
        "All payments are processed securely through our payment partners.",
        "Delivery is provided through Yandex Delivery or pharmacy pickup.",
        "Delivery fees and timeframes vary by location and pharmacy.",
        "You are responsible for being available to receive your order."
      ]
    },
    {
      title: "7. Privacy and Data Protection",
      content: [
        "We are committed to protecting your privacy and personal health information.",
        "Our data handling practices comply with the Law of the Republic of Uzbekistan 'On Personal Data' and international standards.",
        "Medical information is encrypted and stored securely.",
        "We do not sell or share your personal health information with third parties without your consent.",
        "Detailed information about our data practices is available in our Privacy Policy."
      ]
    },
    {
      title: "8. Loyalty Program",
      content: [
        "The UzPharm Digital loyalty program allows users to earn points on purchases.",
        "Points can be redeemed for discounts on future purchases.",
        "Program terms and benefits may change with advance notice.",
        "Points have no cash value and cannot be transferred.",
        "Fraudulent activity may result in forfeiture of points and account suspension."
      ]
    },
    {
      title: "9. Intellectual Property",
      content: [
        "The platform and its original content, features, and functionality are owned by UzPharm Digital and are protected by international copyright, trademark, and other intellectual property laws.",
        "You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our platform without prior written consent."
      ]
    },
    {
      title: "10. Prohibited Uses",
      content: [
        "You may not use our platform:",
        "• For any unlawful purpose or to solicit others to engage in unlawful acts",
        "• To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances",
        "• To transmit or procure the sending of any advertising or promotional material, including 'junk mail', 'chain letters', 'spam', or similar solicitations",
        "• To impersonate or attempt to impersonate the company, employees, another user, or any other person or entity",
        "• To engage in any activity that restricts or inhibits anyone's use or enjoyment of the platform"
      ]
    },
    {
      title: "11. Regulatory Compliance",
      content: [
        "This platform operates under the regulatory framework of the Republic of Uzbekistan.",
        "We comply with the Law 'On Medicines and Pharmaceutical Activity' and related regulations.",
        "All pharmacy partners are licensed by the Ministry of Health of the Republic of Uzbekistan.",
        "Medicine sales are conducted in accordance with the State Register of Medicines and Medical Devices."
      ]
    },
    {
      title: "12. Limitation of Liability",
      content: [
        "In no event shall UzPharm Digital, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages.",
        "This includes, without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the platform.",
        "Some jurisdictions do not allow the exclusion of certain warranties or the exclusion or limitation of liability for consequential or incidental damages."
      ]
    },
    {
      title: "13. Termination",
      content: [
        "We may terminate or suspend your account and bar access to the platform immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.",
        "If you wish to terminate your account, you may simply discontinue using the platform.",
        "Upon termination, your right to use the platform will cease immediately."
      ]
    },
    {
      title: "14. Governing Law",
      content: [
        "These Terms shall be interpreted and governed by the laws of the Republic of Uzbekistan.",
        "Any disputes arising from these terms or your use of the platform shall be resolved in the courts of Uzbekistan.",
        "The courts of Tashkent, Uzbekistan shall have exclusive jurisdiction over any disputes."
      ]
    },
    {
      title: "15. Changes to Terms",
      content: [
        "We reserve the right, at our sole discretion, to modify or replace these Terms at any time.",
        "If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.",
        "What constitutes a material change will be determined at our sole discretion.",
        "By continuing to access or use our platform after any revisions become effective, you agree to be bound by the revised terms."
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
            <Scale className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Legal Document</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using the UzPharm Digital platform.
          </p>
        </motion.div>

        {/* Document Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Alert className="mb-8 border-primary/20 bg-primary/5">
            <AlertTriangle className="h-4 w-4 text-primary" />
            <AlertDescription className="text-foreground">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Important Legal Notice:</strong> These terms constitute a legally binding agreement 
                  between you and UzPharm Digital. Please read carefully.
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
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 px-2 rounded hover:bg-primary/5"
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    Legal Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>legal@uzpharm.digital</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>+998 71 123 45 67</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span>Tashkent, Uzbekistan</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Terms Content */}
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
                      Introduction
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Welcome to UzPharm Digital, the AI-powered digital pharmacy platform for Uzbekistan. 
                      These Terms of Service ("Terms") govern your use of our platform and services. 
                      By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy.
                    </p>
                  </div>

                  {/* Sections */}
                  <div className="space-y-8">
                    {sections.map((section, index) => (
                      <div key={index} id={`section-${index}`}>
                        <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
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

                  {/* Footer */}
                  <div className="mt-12 p-6 bg-primary/5 rounded-xl">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Contact Information</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Email: legal@uzpharm.digital</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Phone: +998 71 123 45 67</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Address: Tashkent, Republic of Uzbekistan</span>
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

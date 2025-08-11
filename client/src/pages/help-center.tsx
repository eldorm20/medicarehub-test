import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Bot,
  Pill,
  FileText,
  Heart,
  Star,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HelpCenter() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: 'AI Medical Assistant',
      icon: Bot,
      color: 'from-blue-500 to-purple-600',
      faqs: [
        {
          question: 'How accurate is the AI medical assistant?',
          answer: 'Our AI medical assistant uses advanced medical knowledge bases and is designed to provide general health information. While highly accurate for informational purposes, it should never replace professional medical advice from qualified healthcare providers.'
        },
        {
          question: 'Can the AI diagnose medical conditions?',
          answer: 'No, our AI assistant cannot provide medical diagnoses. It can offer general health information and suggest when you should consult with a healthcare professional for proper diagnosis and treatment.'
        },
        {
          question: 'Is my conversation with AI private?',
          answer: 'Yes, all conversations are encrypted and stored securely. We follow strict privacy guidelines and never share your personal health information without your explicit consent.'
        }
      ]
    },
    {
      title: 'Prescription Services',
      icon: FileText,
      color: 'from-green-500 to-teal-600',
      faqs: [
        {
          question: 'How do I upload a prescription?',
          answer: 'You can upload prescriptions by taking a clear photo or scanning the document. Our system will analyze the prescription and help you find the prescribed medications at nearby pharmacies.'
        },
        {
          question: 'What image formats are supported?',
          answer: 'We support JPEG, PNG, and JPG formats up to 5MB. Ensure the prescription is clearly visible and well-lit for best analysis results.'
        },
        {
          question: 'How long does prescription analysis take?',
          answer: 'Our AI typically analyzes prescriptions within 30-60 seconds. Complex prescriptions may take up to 2 minutes for thorough analysis.'
        }
      ]
    },
    {
      title: 'Medicine Search & Orders',
      icon: Pill,
      color: 'from-orange-500 to-red-600',
      faqs: [
        {
          question: 'How do I find specific medicines?',
          answer: 'Use our medicine search feature to find from over 462,000 registered medicines in Uzbekistan. Search by name, active ingredient, or condition.'
        },
        {
          question: 'Can I order prescription medicines online?',
          answer: 'Yes, but prescription medicines require a valid prescription from a licensed healthcare provider. Our system verifies prescriptions before processing orders.'
        },
        {
          question: 'What are the delivery options?',
          answer: 'We offer pharmacy pickup and Yandex delivery services. Delivery times vary by location, typically 1-3 hours for same-day delivery in major cities.'
        }
      ]
    },
    {
      title: 'Account & Privacy',
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      faqs: [
        {
          question: 'How is my medical data protected?',
          answer: 'We use bank-level encryption and comply with international healthcare data protection standards. Your medical information is stored securely and never shared without permission.'
        },
        {
          question: 'Can I delete my account and data?',
          answer: 'Yes, you can request account deletion at any time. We will permanently remove all your personal data within 30 days of your request.'
        },
        {
          question: 'How do I update my profile information?',
          answer: 'Go to your profile settings to update personal information, contact details, and health preferences. Changes are saved automatically.'
        }
      ]
    }
  ];

  const quickHelp = [
    {
      title: 'Emergency Medical Help',
      description: 'For immediate medical emergencies',
      icon: AlertTriangle,
      action: 'Call 103',
      color: 'border-red-500 bg-red-50 dark:bg-red-950',
      urgent: true
    },
    {
      title: 'AI Medical Consultation',
      description: 'Get instant health advice',
      icon: Bot,
      action: 'Start Chat',
      color: 'border-blue-500 bg-blue-50 dark:bg-blue-950',
      link: '/ai-consultation'
    },
    {
      title: 'Contact Support',
      description: '24/7 customer support',
      icon: MessageCircle,
      action: 'Contact Us',
      color: 'border-green-500 bg-green-50 dark:bg-green-950',
      link: '/contact'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: MessageCircle,
      action: 'Start Chat',
      color: 'border-purple-500 bg-purple-50 dark:bg-purple-950'
    }
  ];

  const filteredFaqs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Heart className="w-4 h-4 mr-2" />
              Help Center
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-foreground dark:text-foreground">
              How can we help you?
            </h1>
            <p className="text-lg text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions, get support, and learn how to make the most of UzPharm Digital
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg"
              data-testid="help-search-input"
            />
          </div>

          {/* Quick Help Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickHelp.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`${item.color} border-2 hover:shadow-lg transition-shadow cursor-pointer`}>
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                      item.urgent ? 'bg-red-600' : 'bg-primary'
                    }`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2 text-foreground dark:text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <Button
                      variant={item.urgent ? "destructive" : "default"}
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        if (item.link) {
                          window.location.href = item.link;
                        } else if (item.urgent) {
                          window.open('tel:103');
                        }
                      }}
                      data-testid={`quick-help-${index}`}
                    >
                      {item.action}
                      {!item.urgent && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-foreground dark:text-foreground">
              Frequently Asked Questions
            </h2>
            
            {(searchQuery ? filteredFaqs : faqCategories).map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <Card className="bg-card dark:bg-card border-border dark:border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center text-foreground dark:text-foreground">
                      <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mr-4`}>
                        <category.icon className="h-5 w-5 text-white" />
                      </div>
                      {category.title}
                      <Badge variant="secondary" className="ml-auto">
                        {category.faqs.length} questions
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-muted-foreground dark:text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Support */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground dark:text-foreground">
                  Still need help?
                </h3>
                <p className="text-muted-foreground dark:text-muted-foreground mb-6">
                  Our support team is available 24/7 to assist you with any questions or concerns
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button onClick={() => window.location.href = '/contact'} data-testid="contact-support-btn">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" onClick={() => window.open('tel:+998711234567')} data-testid="call-support-btn">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Support
                  </Button>
                  <Button variant="outline" onClick={() => window.open('mailto:support@uzpharm.digital')} data-testid="email-support-btn">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
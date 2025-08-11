import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  AlertTriangle,
  HeadphonesIcon,
  Globe,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSupport() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: '',
        priority: 'normal'
      });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      title: '24/7 Phone Support',
      description: 'Immediate assistance for urgent matters',
      icon: Phone,
      contact: '+998 71 123 45 67',
      action: 'Call Now',
      color: 'from-green-500 to-emerald-600',
      urgent: false
    },
    {
      title: 'Email Support',
      description: 'Detailed responses within 24 hours',
      icon: Mail,
      contact: 'support@uzpharm.digital',
      action: 'Send Email',
      color: 'from-blue-500 to-cyan-600',
      urgent: false
    },
    {
      title: 'Emergency Hotline',
      description: 'For medical emergencies only',
      icon: AlertTriangle,
      contact: '103',
      action: 'Emergency Call',
      color: 'from-red-500 to-pink-600',
      urgent: true
    },
    {
      title: 'Live Chat',
      description: 'Real-time chat with our team',
      icon: MessageCircle,
      contact: 'Available 24/7',
      action: 'Start Chat',
      color: 'from-purple-500 to-violet-600',
      urgent: false
    }
  ];

  const supportHours = [
    { day: 'Monday - Friday', hours: '24/7 Available' },
    { day: 'Saturday', hours: '24/7 Available' },
    { day: 'Sunday', hours: '24/7 Available' },
    { day: 'Holidays', hours: '24/7 Available' }
  ];

  const categories = [
    'Technical Support',
    'Account Issues',
    'AI Consultation',
    'Prescription Services',
    'Order & Delivery',
    'Payment Issues',
    'Privacy & Security',
    'Medical Emergency',
    'General Inquiry',
    'Feature Request'
  ];

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
              <HeadphonesIcon className="w-4 h-4 mr-2" />
              Contact Support
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-foreground dark:text-foreground">
              Get Help When You Need It
            </h1>
            <p className="text-lg text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">
              Our dedicated support team is here to assist you 24/7 with any questions or concerns about UzPharm Digital
            </p>
          </div>

          {/* Emergency Alert */}
          <Alert className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800 mb-8">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-700 dark:text-red-300">
              <strong>Medical Emergency?</strong> For life-threatening situations, immediately call 103 or visit the nearest emergency room. 
              Our platform is not intended for emergency medical care.
            </AlertDescription>
          </Alert>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-card dark:bg-card border-border dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground dark:text-foreground">
                    <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground dark:text-foreground mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-muted-foreground dark:text-muted-foreground">
                        We'll get back to you within 24 hours. Check your email for updates.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                            Full Name *
                          </label>
                          <Input
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                            required
                            data-testid="contact-name-input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter your email address"
                            required
                            data-testid="contact-email-input"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                            Phone Number
                          </label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+998 XX XXX XX XX"
                            data-testid="contact-phone-input"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                            Category *
                          </label>
                          <Select onValueChange={(value) => handleInputChange('category', value)} required>
                            <SelectTrigger data-testid="contact-category-select">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                          Subject *
                        </label>
                        <Input
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="Brief description of your issue"
                          required
                          data-testid="contact-subject-input"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                          Message *
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Please provide detailed information about your issue or question..."
                          rows={6}
                          required
                          data-testid="contact-message-textarea"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground dark:text-foreground">
                          Priority Level
                        </label>
                        <Select onValueChange={(value) => handleInputChange('priority', value)} defaultValue="normal">
                          <SelectTrigger data-testid="contact-priority-select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - General inquiry</SelectItem>
                            <SelectItem value="normal">Normal - Standard support</SelectItem>
                            <SelectItem value="high">High - Urgent issue</SelectItem>
                            <SelectItem value="critical">Critical - Service down</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                        data-testid="contact-submit-btn"
                      >
                        {isSubmitting ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Methods */}
              <Card className="bg-card dark:bg-card border-border dark:border-border">
                <CardHeader>
                  <CardTitle className="text-foreground dark:text-foreground">Contact Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <div key={index} className={`p-4 rounded-xl border-2 ${
                      method.urgent 
                        ? 'border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800' 
                        : 'border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-700'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <method.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground dark:text-foreground">{method.title}</h4>
                          <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-2">{method.description}</p>
                          <p className="text-sm font-medium text-primary">{method.contact}</p>
                        </div>
                      </div>
                      <Button
                        variant={method.urgent ? "destructive" : "outline"}
                        size="sm"
                        className="w-full mt-3"
                        onClick={() => {
                          if (method.title.includes('Phone') || method.title.includes('Emergency')) {
                            window.open(`tel:${method.contact}`);
                          } else if (method.title.includes('Email')) {
                            window.open(`mailto:${method.contact}`);
                          }
                        }}
                        data-testid={`contact-method-${index}`}
                      >
                        {method.action}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Support Hours */}
              <Card className="bg-card dark:bg-card border-border dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground dark:text-foreground">
                    <Clock className="w-5 h-5 mr-2 text-primary" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {supportHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border dark:border-border last:border-b-0">
                        <span className="text-sm text-muted-foreground dark:text-muted-foreground">{schedule.day}</span>
                        <span className="text-sm font-medium text-foreground dark:text-foreground">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <p className="text-sm text-primary font-medium">
                      🕐 We're always here to help! Our support team is available 24/7.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Office Location */}
              <Card className="bg-card dark:bg-card border-border dark:border-border">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground dark:text-foreground">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground dark:text-foreground">UzPharm Digital Headquarters</p>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                          Tashkent, Uzbekistan<br />
                          Yunusabad District<br />
                          Amir Temur Street, 15
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Globe className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                          Licensed by the Ministry of Health<br />
                          Republic of Uzbekistan
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
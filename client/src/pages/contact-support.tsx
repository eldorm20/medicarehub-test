import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Send,
  AlertTriangle,
  CheckCircle,
  Headphones
} from 'lucide-react';

export default function ContactSupport() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.firstName + ' ' + user?.lastName || '',
    email: user?.email || '',
    subject: '',
    category: '',
    priority: 'medium',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Support Request Submitted',
        description: 'We\'ve received your request and will respond within 24 hours.',
      });
      setIsSubmitting(false);
      setFormData({
        ...formData,
        subject: '',
        message: '',
        category: '',
      });
    }, 1000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: '24/7 for urgent medical questions',
      contact: '+998 71 123 45 67',
      action: 'Call Now',
      available: true
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Real-time support chat',
      contact: 'Available 9 AM - 6 PM',
      action: 'Start Chat',
      available: true
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Detailed inquiries and documentation',
      contact: 'support@uzpharm.digital',
      action: 'Send Email',
      available: true
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Contact Support</h1>
          <p className="text-muted-foreground">
            Get help from our expert support team
          </p>
        </div>

        {/* Emergency Notice */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200">Medical Emergency</h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                For urgent medical emergencies, please call 103 (Emergency Services) immediately. 
                This support system is not for emergency medical situations.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Request</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Brief description of your issue"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="account">Account & Billing</SelectItem>
                        <SelectItem value="orders">Orders & Delivery</SelectItem>
                        <SelectItem value="ai-consultation">AI Consultation</SelectItem>
                        <SelectItem value="prescriptions">Prescription Analysis</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide detailed information about your issue or question..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    <>
                      <Send className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Methods & Information */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Other Ways to Reach Us</CardTitle>
                <CardDescription>
                  Choose the method that works best for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <method.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{method.title}</h4>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                        <p className="text-sm font-medium">{method.contact}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {method.action}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Office Information */}
            <Card>
              <CardHeader>
                <CardTitle>Office Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-sm text-muted-foreground">
                      UzPharm Digital Headquarters<br />
                      Innovation District, Building 42<br />
                      Tashkent 100084, Uzbekistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Business Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Emergency support only
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Headphones className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Language Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Uzbek, Russian, English<br />
                      Medical interpreters available for complex consultations
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card>
              <CardHeader>
                <CardTitle>Expected Response Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Live Chat</span>
                  <span className="text-green-600 font-medium">Immediate</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phone Support</span>
                  <span className="text-green-600 font-medium">Immediate</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email (General)</span>
                  <span className="text-blue-600 font-medium">Within 24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email (Urgent)</span>
                  <span className="text-orange-600 font-medium">Within 4 hours</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
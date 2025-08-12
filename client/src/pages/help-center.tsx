import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Book, 
  HelpCircle,
  Clock,
  Users,
  Shield,
  Pill
} from 'lucide-react';

const faqs = [
  {
    id: '1',
    category: 'General',
    question: 'How does UzPharm Digital work?',
    answer: 'UzPharm Digital is an AI-powered healthcare platform that connects you with verified pharmacies across Uzbekistan. You can consult with our AI medical assistant, search for medicines, upload prescriptions for analysis, and order medicines for delivery.'
  },
  {
    id: '2',
    category: 'AI Consultation',
    question: 'Is the AI medical consultation reliable?',
    answer: 'Our AI assistant uses advanced medical knowledge bases and is designed to provide helpful health information. However, it should not replace professional medical advice. Always consult with qualified healthcare providers for serious medical concerns.'
  },
  {
    id: '3',
    category: 'Orders',
    question: 'How long does medicine delivery take?',
    answer: 'Delivery times depend on your location and the pharmacy. Within Tashkent, most orders are delivered within 2-4 hours via Yandex Delivery. For other cities, delivery typically takes 1-2 business days.'
  },
  {
    id: '4',
    category: 'Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept Click, Payme, and major credit/debit cards. All payments are processed securely through encrypted channels to protect your financial information.'
  },
  {
    id: '5',
    category: 'Prescriptions',
    question: 'How do I upload a prescription?',
    answer: 'Go to the Prescription Analysis page and drag & drop your prescription image or PDF. Our AI will analyze the prescription and verify its authenticity, then help you find the prescribed medicines at nearby pharmacies.'
  },
  {
    id: '6',
    category: 'Account',
    question: 'How do I change my delivery address?',
    answer: 'You can update your delivery address in your Profile settings. Go to Profile > Personal Info and update your address information. You can also change the delivery address during checkout.'
  }
];

const helpCategories = [
  {
    name: 'Getting Started',
    icon: Book,
    description: 'Learn the basics of using UzPharm Digital',
    articles: 12
  },
  {
    name: 'AI Consultation',
    icon: MessageCircle,
    description: 'How to use our AI medical assistant',
    articles: 8
  },
  {
    name: 'Medicine Search',
    icon: Pill,
    description: 'Finding and ordering medicines',
    articles: 15
  },
  {
    name: 'Account & Privacy',
    icon: Shield,
    description: 'Managing your account and privacy settings',
    articles: 10
  }
];

export default function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Help Center</h1>
          <p className="text-muted-foreground">
            Find answers to frequently asked questions and get support
          </p>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Input
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 text-lg"
              />
              <Search className="absolute left-4 top-3 h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Live Chat Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Chat with our support team in real-time
              </p>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Call Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Speak directly with our support team
              </p>
              <Button variant="outline" className="w-full">
                +998 71 123 45 67
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Mail className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send us a detailed email about your issue
              </p>
              <Button variant="outline" className="w-full">
                support@uzpharm.uz
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Categories */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {helpCategories.map((category) => (
              <Card key={category.name} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <category.icon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <Badge variant="secondary">{category.articles} articles</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* FAQ List */}
          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center space-x-3">
                        <HelpCircle className="h-5 w-5 text-blue-500" />
                        <span>{faq.question}</span>
                        <Badge variant="outline" className="ml-auto">
                          {faq.category}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-8 pr-4 pb-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No FAQs found matching your search criteria.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>
              Our support team is available to assist you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-6 w-6 text-blue-500" />
                <div>
                  <h4 className="font-medium">Support Hours</h4>
                  <p className="text-sm text-muted-foreground">
                    24/7 for urgent medical questions<br />
                    9 AM - 6 PM for general support
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-green-500" />
                <div>
                  <h4 className="font-medium">Response Time</h4>
                  <p className="text-sm text-muted-foreground">
                    Live chat: Immediate<br />
                    Email: Within 24 hours
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-purple-500" />
                <div>
                  <h4 className="font-medium">Language Support</h4>
                  <p className="text-sm text-muted-foreground">
                    Uzbek, Russian, English<br />
                    Professional medical interpreters
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
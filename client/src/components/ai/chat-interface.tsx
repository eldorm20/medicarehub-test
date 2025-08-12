import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, Send, Upload, Stethoscope, Heart, Brain, AlertTriangle } from 'lucide-react';
import { i18n } from '@/lib/i18n';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm MedAssist AI, your 24/7 medical assistant. I can help you with:

• Symptom analysis and recommendations
• Prescription verification and dosage advice
• Medicine information from UzPharm registry
• Emergency guidance and referrals

Please describe your symptoms or upload a prescription to get started.

⚠️ **Important**: This is for informational purposes only and does not replace professional medical advice.`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI typing
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI response
    setTimeout(() => {
      const response = generateAIResponse(inputValue);
      setMessages(prev => 
        prev.map(msg => 
          msg.isTyping ? { ...msg, content: response, isTyping: false } : msg
        )
      );
      setIsLoading(false);
    }, 2000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('headache') || input.includes('head') || input.includes('pain')) {
      return `I understand you're experiencing headache symptoms. Based on your description, here's my analysis:

**Possible Causes:**
• Tension headache (most common)
• Dehydration
• Stress or lack of sleep
• Eye strain

**Recommendations:**
• Rest in a quiet, dark room
• Apply cold or warm compress
• Stay hydrated
• Consider over-the-counter pain relief

**Red Flags - Seek immediate medical attention if you experience:**
• Sudden, severe headache unlike any before
• Headache with fever, neck stiffness
• Headache with vision changes
• Headache after head injury

Would you like me to search for available headache medications in the UzPharm registry?`;
    }

    if (input.includes('fever') || input.includes('temperature')) {
      return `I see you're concerned about fever. Here's what I can tell you:

**Normal body temperature:** 36.1°C - 37.2°C (97°F - 99°F)

**Fever management:**
• For mild fever (37.2°C - 38.3°C): Rest, fluids, light clothing
• For moderate fever (38.3°C - 39.4°C): Consider fever reducers
• For high fever (above 39.4°C): Seek medical attention

**When to see a doctor immediately:**
• Fever above 40°C (104°F)
• Fever lasting more than 3 days
• Difficulty breathing
• Severe headache or neck stiffness

**Available medications in Uzbekistan:**
• Paracetamol (most common fever reducer)
• Ibuprofen (for adults)

Would you like me to check current availability and prices for fever medications?`;
    }

    if (input.includes('chest') || input.includes('heart') || input.includes('breathing')) {
      return `⚠️ **IMPORTANT**: Chest pain can be serious and may require immediate medical attention.

**If you're experiencing:**
• Severe chest pain
• Difficulty breathing
• Pain radiating to arm, neck, or jaw
• Sweating with chest discomfort

**Call emergency services immediately: 103**

**For mild chest discomfort:**
• Could be muscle strain, anxiety, or indigestion
• Try relaxation techniques
• Avoid caffeine and stress

**I strongly recommend consulting with a healthcare professional for proper evaluation.**

Would you like me to help you find the nearest emergency medical facility or connect you with a telemedicine consultation?`;
    }

    // General response
    return `Thank you for sharing your symptoms. Based on what you've described, I recommend:

**General advice:**
• Monitor your symptoms closely
• Stay hydrated and get adequate rest
• Note any changes or worsening

**I'd be happy to help you with:**
• Searching for specific medications
• Providing more detailed symptom analysis
• Connecting you with healthcare providers
• Checking drug interactions

For a more comprehensive analysis, could you provide more details about:
• When did symptoms start?
• Severity (1-10 scale)
• Any triggering factors?
• Current medications?

Remember: This AI consultation is for informational purposes only. For persistent or severe symptoms, please consult with a qualified healthcare professional.`;
  };

  const quickActions = [
    { label: 'Headache', icon: Brain, action: () => setInputValue('I have a headache') },
    { label: 'Chest pain', icon: Heart, action: () => setInputValue('I have chest pain') },
    { label: 'Fever', icon: AlertTriangle, action: () => setInputValue('I have fever') },
    { label: 'Check prescription', icon: Upload, action: () => setInputValue('I want to check my prescription') },
  ];

  return (
    <div className="flex flex-col h-[600px] max-w-4xl mx-auto">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-medical-teal to-medical-mint rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">MedAssist AI</CardTitle>
              <p className="text-sm text-muted-foreground flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Online • Powered by Advanced AI
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={action.action}
                className="flex items-center space-x-1"
              >
                <action.icon className="h-3 w-3" />
                <span>{action.label}</span>
              </Button>
            ))}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={message.type === 'user' ? 'bg-primary' : 'bg-medical-teal'}>
                        {message.type === 'user' ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.isTyping ? (
                        <div className="flex items-center space-x-1">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm text-muted-foreground">AI is thinking...</span>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      )}
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={i18n.t('ai.placeholder') || "Describe your symptoms or upload a prescription..."}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="h-3 w-3 inline mr-1" />
            This AI consultation is for informational purposes only and does not replace professional medical advice.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
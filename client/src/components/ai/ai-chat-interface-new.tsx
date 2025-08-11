import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/useLanguage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  Bot, 
  User, 
  Send, 
  Upload, 
  Activity, 
  Calculator, 
  Camera,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Heart,
  Stethoscope,
  Clock,
  FileText,
  Mic,
  MicOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  id: string;
  consultationId?: string;
  isAi: boolean;
  message: string;
  metadata?: {
    recommendations?: any[];
    severity?: 'low' | 'medium' | 'high' | 'urgent';
    followUpRequired?: boolean;
    confidence?: number;
    messageType?: 'greeting' | 'symptoms' | 'diagnosis' | 'recommendation' | 'warning';
    prescriptionAnalysis?: any;
  };
  createdAt: string;
}

interface AIResponse {
  response: string;
  recommendations: Array<{
    type: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
  }>;
  severity: 'low' | 'medium' | 'high' | 'urgent';
  followUpRequired: boolean;
  confidence: number;
  messageType: 'greeting' | 'symptoms' | 'diagnosis' | 'recommendation' | 'warning';
}

export function AIChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const queryClient = useQueryClient();

  // Medical AI consultation with multilingual support
  const consultMutation = useMutation({
    mutationFn: async (symptoms: string) => {
      // Create AI prompt based on current language
      const languagePrompts = {
        uz: `Siz professional tibbiyot maslahatchisi sifatida, quyidagi belgilar haqida ma'lumot bering. Javobni o'zbek tilida bering. Belgilar: ${symptoms}`,
        ru: `Вы профессиональный медицинский консультант. Проанализируйте следующие симптомы и дайте медицинскую консультацию на русском языке. Симптомы: ${symptoms}`,
        en: `As a professional medical consultant AI, analyze the following symptoms and provide medical advice in English. Symptoms: ${symptoms}`
      };

      const prompt = languagePrompts[language as keyof typeof languagePrompts] || languagePrompts.en;

      const response = await apiRequest('POST', '/api/ai/consult', { 
        symptoms,
        prompt,
        language,
        userId: 'guest' // In production, get from auth context
      });
      return response.json() as Promise<AIResponse>;
    },
    onSuccess: (data) => {
      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        consultationId: undefined,
        isAi: true,
        message: data.response,
        metadata: {
          recommendations: data.recommendations,
          severity: data.severity,
          followUpRequired: data.followUpRequired,
          confidence: data.confidence,
          messageType: data.messageType
        },
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    },
    onError: (error) => {
      console.error('AI consultation error:', error);
      setIsTyping(false);
      
      // Add error message in current language
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        consultationId: undefined,
        isAi: true,
        message: t('errors.ai_consultation_error') || 'Sorry, I encountered an error processing your request. Please try again.',
        metadata: {
          messageType: 'warning',
          severity: 'medium'
        },
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);

      toast({
        title: t('common.error') || 'Error',
        description: t('errors.serverError') || 'Server error occurred',
        variant: 'destructive',
      });
    },
  });

  // Initialize with multilingual welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessages = {
        uz: "Salom! Men MedAssist AI - sizning shaxsiy tibbiy yordamchingizman. Men 24/7 ishlashda davom etaman va sizga quyidagi xizmatlarni taqdim eta olaman:\n\n🔍 Belgilar tahlili\n💊 Retsept tekshirish\n🏥 Dorixona topish\n📋 Tibbiy maslahat\n\nBelgilaringizni yozing va men sizga yordam beraman.",
        ru: "Привет! Я MedAssist AI - ваш персональный медицинский помощник. Я работаю 24/7 и могу предоставить следующие услуги:\n\n🔍 Анализ симптомов\n💊 Проверка рецептов\n🏥 Поиск аптек\n📋 Медицинские консультации\n\nОпишите ваши симптомы, и я помогу вам.",
        en: "Hello! I'm MedAssist AI - your personal medical assistant. I work 24/7 and can provide the following services:\n\n🔍 Symptom analysis\n💊 Prescription verification\n🏥 Pharmacy locator\n📋 Medical consultations\n\nDescribe your symptoms and I'll help you."
      };

      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        consultationId: undefined,
        isAi: true,
        message: welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages.en,
        metadata: {
          messageType: 'greeting',
          confidence: 100
        },
        createdAt: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, [language]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || consultMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      consultationId: undefined,
      isAi: false,
      message: input.trim(),
      metadata: {
        messageType: 'symptoms'
      },
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    consultMutation.mutate(input.trim());
    setInput('');
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      case 'medium':
        return <Clock className="h-4 w-4" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'urgent':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const startVoiceInput = async () => {
    try {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = language === 'uz' ? 'uz-UZ' : language === 'ru' ? 'ru-RU' : 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(prev => prev + ' ' + transcript);
          inputRef.current?.focus();
        };
        
        recognition.onerror = (event: any) => {
          setIsListening(false);
          toast({
            title: t('errors.voice_recognition_error') || 'Voice Recognition Error',
            description: t('errors.voice_not_supported') || 'Voice input is not supported or access denied',
            variant: 'destructive'
          });
        };
        
        recognition.start();
      } else {
        toast({
          title: t('errors.voice_not_supported') || 'Voice Not Supported',
          description: t('errors.voice_browser_support') || 'Your browser does not support voice input',
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: t('errors.voice_recognition_error') || 'Voice Recognition Error',
        description: t('errors.voice_permission_denied') || 'Microphone permission denied',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-card dark:bg-card border border-border dark:border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-primary/5 dark:bg-primary/10 p-4 border-b border-border dark:border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground dark:text-foreground">
                MedAssist AI
              </h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">
                {t('ai.medical_assistant') || 'Medical Assistant'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{t('ai.online') || 'Online'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex items-start space-x-3 ${
                  message.isAi ? 'justify-start' : 'justify-end flex-row-reverse space-x-reverse'
                }`}
              >
                <Avatar className={`w-8 h-8 ${message.isAi ? '' : 'order-2'}`}>
                  <AvatarFallback className={message.isAi ? 'bg-primary text-white' : 'bg-blue-500 text-white'}>
                    {message.isAi ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>

                <div className={`max-w-[80%] ${message.isAi ? 'order-2' : ''}`}>
                  <div
                    className={`p-3 rounded-2xl ${
                      message.isAi
                        ? 'bg-muted/50 dark:bg-muted/20 text-foreground dark:text-foreground'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.message}
                    </p>
                    
                    {/* AI Metadata */}
                    {message.isAi && message.metadata && (
                      <div className="mt-3 space-y-2">
                        {/* Severity Badge */}
                        {message.metadata.severity && (
                          <div className="flex items-center space-x-2">
                            <Badge className={getSeverityColor(message.metadata.severity)} variant="secondary">
                              {getSeverityIcon(message.metadata.severity)}
                              <span className="ml-1 text-xs font-medium">
                                {t(`ai.severity.${message.metadata.severity}`) || message.metadata.severity}
                              </span>
                            </Badge>
                            {message.metadata.confidence && (
                              <span className="text-xs text-muted-foreground">
                                {message.metadata.confidence}% {t('ai.confidence') || 'confidence'}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Recommendations */}
                        {message.metadata.recommendations && message.metadata.recommendations.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs font-medium text-muted-foreground uppercase">
                              {t('ai.recommendations') || 'Recommendations'}
                            </p>
                            {message.metadata.recommendations.map((rec, idx) => (
                              <div key={idx} className="p-2 bg-background/50 dark:bg-background/20 rounded-lg border border-border/50">
                                <div className="flex items-start space-x-2">
                                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                                    rec.priority === 'high' ? 'bg-red-500' :
                                    rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                  }`} />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-foreground">{rec.title}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Follow-up Required */}
                        {message.metadata.followUpRequired && (
                          <Alert className="mt-2">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription className="text-xs">
                              {t('ai.followup_required') || 'Consider consulting with a healthcare professional for further evaluation.'}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-1 px-1">
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-3"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border dark:border-border">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('ai.enter_symptoms') || 'Describe your symptoms...'}
              className="pr-12 bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground"
              disabled={consultMutation.isPending}
              data-testid="ai-chat-input"
            />
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={startVoiceInput}
              disabled={isListening || consultMutation.isPending}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              data-testid="voice-input-button"
            >
              {isListening ? (
                <MicOff className="h-4 w-4 text-red-500 animate-pulse" />
              ) : (
                <Mic className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || consultMutation.isPending}
            className="h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground"
            data-testid="send-message-button"
          >
            {consultMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            { icon: Activity, text: t('ai.quick.headache') || 'Headache', value: 'I have a headache' },
            { icon: Heart, text: t('ai.quick.chest_pain') || 'Chest pain', value: 'I have chest pain' },
            { icon: Calculator, text: t('ai.quick.fever') || 'Fever', value: 'I have a fever' },
            { icon: FileText, text: t('ai.quick.prescription') || 'Check prescription', value: 'I need help with my prescription' }
          ].map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInput(action.value)}
              disabled={consultMutation.isPending}
              className="text-xs border-border dark:border-border text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent"
              data-testid={`quick-action-${index}`}
            >
              <action.icon className="h-3 w-3 mr-1" />
              {action.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
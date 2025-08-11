import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { i18n } from '@/lib/i18n';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Bot, User, Send, Upload, Activity, Calculator, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ChatMessage } from '@/types/user';

interface AIResponse {
  response: string;
  recommendations: any[];
  severity: string;
  followUpRequired: boolean;
}

export function AIChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const consultMutation = useMutation({
    mutationFn: async (symptoms: string) => {
      const response = await apiRequest('POST', '/api/ai/consult', { 
        symptoms,
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
        },
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    },
    onError: (error) => {
      console.error('AI consultation error:', error);
      setIsTyping(false);
      toast({
        title: i18n.t('common.error'),
        description: i18n.t('errors.serverError'),
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    // Add initial AI message
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        consultationId: undefined,
        isAi: true,
        message: i18n.t('ai.canHelp'),
        metadata: {
          features: [
            i18n.t('ai.symptomAnalysis'),
            i18n.t('ai.prescriptionVerification'),
            i18n.t('ai.medicineInfo'),
            i18n.t('ai.emergencyGuidance'),
          ],
        },
        createdAt: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      consultationId: undefined,
      isAi: false,
      message: input.trim(),
      metadata: {},
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    consultMutation.mutate(input.trim());
    setInput('');
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card className="h-full flex flex-col bg-white/10 dark:bg-slate-900/20 backdrop-blur-md border-white/20 dark:border-slate-700/50">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <motion.div 
            className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Bot className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <CardTitle className="text-lg text-white">{i18n.t('ai.title')}</CardTitle>
            <p className="text-sm text-slate-300">{i18n.t('ai.subtitle')}</p>
          </div>
          <div className="ml-auto">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-300">{i18n.t('ai.online')}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4 p-6">
        {/* Messages */}
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex items-start space-x-3 ${
                    message.isAi ? '' : 'justify-end'
                  }`}
                >
                  {message.isAi && (
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`flex-1 max-w-xs ${message.isAi ? '' : 'flex justify-end'}`}>
                    <div className={`rounded-xl p-3 ${
                      message.isAi 
                        ? 'bg-white/10 text-white' 
                        : 'bg-amber-500/20 text-white'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      
                      {/* AI Features List */}
                      {message.metadata?.features && (
                        <ul className="text-xs text-slate-300 mt-2 space-y-1">
                          {message.metadata.features.map((feature: string, index: number) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      )}

                      {/* Recommendations */}
                      {message.metadata?.recommendations && message.metadata.recommendations.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {message.metadata.recommendations.map((rec: string, index: number) => (
                            <div key={index} className="bg-primary-500/20 rounded-lg p-2">
                              <p className="text-xs font-medium text-slate-200">
                                {i18n.t('common.recommendation')} {index + 1}:
                              </p>
                              <p className="text-xs text-slate-300">{rec}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Severity Badge */}
                      {message.metadata?.severity && (
                        <div className="mt-2">
                          <Badge className={getSeverityColor(message.metadata.severity)}>
                            {message.metadata.severity.toUpperCase()}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {!message.isAi && (
                    <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction(i18n.t('ai.uploadPrescription'))}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Upload className="h-3 w-3 mr-2" />
            {i18n.t('ai.uploadPrescription')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction(i18n.t('ai.symptomChecker'))}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Activity className="h-3 w-3 mr-2" />
            {i18n.t('ai.symptomChecker')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction(i18n.t('ai.dosageCalculator'))}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Calculator className="h-3 w-3 mr-2" />
            {i18n.t('ai.dosageCalculator')}
          </Button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={i18n.t('ai.placeholder')}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-amber-500"
            disabled={consultMutation.isPending}
          />
          <Button
            type="submit"
            disabled={!input.trim() || consultMutation.isPending}
            className="bg-amber-500 hover:bg-amber-400 text-slate-900"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

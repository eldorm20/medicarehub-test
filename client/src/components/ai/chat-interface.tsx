import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Loader2, Send, Bot, User, Stethoscope, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface Message {
  id: string;
  text: string;
  isAi: boolean;
  timestamp: Date;
  severity?: 'low' | 'medium' | 'high' | 'emergency';
  recommendations?: string[];
}

interface ChatInterfaceProps {
  consultationId?: string;
  onConsultationStart?: (id: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  consultationId, 
  onConsultationStart 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI medical assistant. I can help you with symptom analysis, medication information, and general health guidance. Please describe your symptoms or health concerns.',
      isAi: true,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const consultationMutation = useMutation({
    mutationFn: async (symptoms: string) => {
      const response = await apiRequest('POST', '/api/ai/consult', {
        symptoms,
        userId: localStorage.getItem('userId'),
        language: 'en',
        consultationId
      });
      return response;
    },
    onSuccess: (data) => {
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: data.response || 'I understand your concerns. Based on your symptoms, here\'s my analysis...',
        isAi: true,
        timestamp: new Date(),
        severity: data.severity || 'low',
        recommendations: data.recommendations || []
      };
      setMessages(prev => [...prev, aiMessage]);

      if (data.consultationId && onConsultationStart) {
        onConsultationStart(data.consultationId);
      }
    },
    onError: (error) => {
      toast({
        title: 'Consultation Error',
        description: 'Failed to get AI response. Please try again.',
        variant: 'destructive',
      });
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'I apologize, but I\'m experiencing technical difficulties. Please try again or contact support if the issue persists.',
        isAi: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    },
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isAi: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    consultationMutation.mutate(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'emergency':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-green-500 text-white';
    }
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center space-x-2">
          <Stethoscope className="h-5 w-5 text-blue-600" />
          <span>AI Medical Consultation</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isAi ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex max-w-[80%] ${message.isAi ? 'flex-row' : 'flex-row-reverse'}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {message.isAi ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`mx-3 ${message.isAi ? 'text-left' : 'text-right'}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        message.isAi
                          ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      
                      {message.severity && (
                        <div className="mt-2">
                          <Badge className={getSeverityColor(message.severity)}>
                            {message.severity === 'emergency' && <AlertTriangle className="h-3 w-3 mr-1" />}
                            {message.severity.toUpperCase()}
                          </Badge>
                        </div>
                      )}
                      
                      {message.recommendations && message.recommendations.length > 0 && (
                        <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded border-l-4 border-blue-400">
                          <p className="text-xs font-medium text-blue-800 dark:text-blue-200 mb-1">
                            Recommendations:
                          </p>
                          <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                            {message.recommendations.map((rec, index) => (
                              <li key={index}>• {rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {consultationMutation.isPending && (
              <div className="flex justify-start">
                <div className="flex">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="mx-3">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">AI is analyzing your symptoms...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your symptoms or ask a health question..."
              disabled={consultationMutation.isPending}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || consultationMutation.isPending}
              size="sm"
            >
              {consultationMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className="mt-2 text-xs text-gray-500">
            <p>⚠️ This AI consultation is for informational purposes only and should not replace professional medical advice.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
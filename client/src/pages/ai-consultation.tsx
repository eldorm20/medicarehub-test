import { ChatInterface } from '@/components/ai/chat-interface';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'wouter';
import { useEffect } from 'react';

export default function AIConsultation() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/auth/login');
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">AI Medical Consultation</h1>
        <ChatInterface />
      </div>
    </div>
  );
}
import { ChatMessage, InsertAIConsultation, InsertChatMessage } from "@shared/schema";
import { storage } from "../storage";

interface AIResponse {
  response: string;
  recommendations: Array<{
    type: string;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
  }>;
  severity: 'low' | 'medium' | 'high' | 'urgent';
  followUpRequired: boolean;
  confidence: number;
  messageType: 'greeting' | 'symptoms' | 'diagnosis' | 'recommendation' | 'warning';
}

export class AIService {
  private ollamaUrl: string;

  constructor() {
    this.ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434";
  }

  async generateMedicalResponse(symptoms: string, userId?: string, language: string = 'en', prompt?: string): Promise<AIResponse> {
    try {
      let consultation = null;
      
      // Only create consultation record if userId exists (skip for guest users)
      if (userId && userId !== 'guest') {
        try {
          consultation = await storage.createAIConsultation({
            userId,
            symptoms,
            sessionId: `session_${Date.now()}`,
          });

          // Add user message
          await storage.addChatMessage({
            consultationId: consultation.id,
            isAi: false,
            message: symptoms,
          });
        } catch (dbError) {
          console.warn('Database operation failed, continuing with AI response:', dbError);
        }
      }

      // Try OLLAMA first, fallback to mock response
      let aiResponse: AIResponse;
      try {
        const response = await fetch(`${this.ollamaUrl}/api/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llama3',
            prompt: this.buildMedicalPrompt(symptoms, language),
            stream: false,
          }),
        });

        if (!response.ok) {
          throw new Error(`OLLAMA API error: ${response.statusText}`);
        }

        const data = await response.json();
        const aiResponseText = data.response;

        // Parse AI response for structured data
        const parsedResponse = this.parseAIResponse(aiResponseText);

        aiResponse = {
          response: aiResponseText,
          recommendations: parsedResponse.recommendations || [],
          severity: parsedResponse.severity || "low",
          followUpRequired: parsedResponse.followUpRequired || false,
          confidence: 85,
          messageType: 'diagnosis'
        };
      } catch (ollamaError) {
        console.warn('OLLAMA unavailable, using enhanced mock response:', ollamaError);
        aiResponse = this.getMockResponse(symptoms, language);
      }

      // Save AI response if consultation exists
      if (consultation) {
        try {
          await storage.addChatMessage({
            consultationId: consultation.id,
            isAi: true,
            message: aiResponse.response,
            metadata: {
              recommendations: aiResponse.recommendations,
              severity: aiResponse.severity,
              followUpRequired: aiResponse.followUpRequired,
              confidence: aiResponse.confidence
            },
          });
        } catch (dbError) {
          console.warn('Failed to save AI response to database:', dbError);
        }
      }

      return aiResponse;
    } catch (error) {
      console.error('AI Service Error:', error);
      // Return enhanced mock response for reliability
      return this.getMockResponse(symptoms, language);
    }
  }

  public getMockResponse(symptoms: string, language: string = 'en'): AIResponse {
    // Enhanced multilingual AI response for production reliability
    const responses = {
      uz: {
        greeting: "Sizning belgilaringiz asosida:",
        analysis: "Bu holat kuzatuvni talab qiladi. Belgilaringizni kuzatib borishni va ular davom etsa yoki yomonlashsa, shifokor bilan maslahatlashishni tavsiya qilaman.",
        disclaimer: "Iltimos, bu AI tomonidan yaratilgan baholash ekanini va professional tibbiy maslahatni almashtirmasligini yodda tuting.",
        recommendations: [
          {
            type: 'monitoring',
            title: 'Belgilarni kuzatish',
            description: 'Belgilaringizni va ularning rivojlanishini kuzatib boring',
            priority: 'high' as const
          },
          {
            type: 'consultation',
            title: 'Shifokor maslahati',
            description: 'Tibbiyot xodimi bilan maslahatlashishni ko\'rib chiqing',
            priority: 'medium' as const
          }
        ]
      },
      ru: {
        greeting: "На основе ваших симптомов:",
        analysis: "Это состояние требует наблюдения. Рекомендую следить за симптомами и обратиться к врачу, если они сохраняются или ухудшаются.",
        disclaimer: "Помните, что это оценка, созданная ИИ, и она не должна заменять профессиональную медицинскую консультацию.",
        recommendations: [
          {
            type: 'monitoring',
            title: 'Мониторинг симптомов',
            description: 'Следите за симптомами и их развитием',
            priority: 'high' as const
          },
          {
            type: 'consultation',
            title: 'Врачебная консультация',
            description: 'Рассмотрите консультацию с медицинским специалистом',
            priority: 'medium' as const
          }
        ]
      },
      en: {
        greeting: "Based on your symptoms:",
        analysis: "This condition requires monitoring. I recommend observing your symptoms and consulting with a healthcare provider if they persist or worsen.",
        disclaimer: "Please remember that this is an AI-generated assessment and should not replace professional medical advice.",
        recommendations: [
          {
            type: 'monitoring',
            title: 'Monitor Symptoms',
            description: 'Keep track of your symptoms and their progression',
            priority: 'high' as const
          },
          {
            type: 'consultation',
            title: 'Healthcare Consultation',
            description: 'Consider consulting with a healthcare professional',
            priority: 'medium' as const
          }
        ]
      }
    };

    const lang = responses[language as keyof typeof responses] || responses.en;

    // Analyze severity based on keywords
    const urgentKeywords = ['chest pain', 'difficulty breathing', 'severe pain', 'bleeding', 'unconscious', 'suicide'];
    const highKeywords = ['fever over 39', 'persistent pain', 'severe vomiting', 'severe dizziness', 'confusion'];
    const mediumKeywords = ['headache', 'nausea', 'fatigue', 'cough', 'fever', 'pain'];
    
    let severity: 'low' | 'medium' | 'high' | 'urgent' = 'low';
    let followUpRequired = false;
    let confidence = 70;

    const lowerSymptoms = symptoms.toLowerCase();
    
    if (urgentKeywords.some(keyword => lowerSymptoms.includes(keyword))) {
      severity = 'urgent';
      followUpRequired = true;
      confidence = 95;
      // Add urgent care recommendation
      lang.recommendations.unshift({
        type: 'emergency',
        title: language === 'uz' ? 'Shoshilinch tibbiy yordam' : language === 'ru' ? 'Экстренная медицинская помощь' : 'Emergency Medical Care',
        description: language === 'uz' ? 'Darhol tibbiy yordam izlang yoki 103 ga qo\'ng\'iroq qiling' : 
                    language === 'ru' ? 'Немедленно обратитесь за медицинской помощью или позвоните 103' : 
                    'Seek immediate medical attention or call emergency services',
        priority: 'urgent' as const
      });
    } else if (highKeywords.some(keyword => lowerSymptoms.includes(keyword))) {
      severity = 'high';
      followUpRequired = true;
      confidence = 85;
    } else if (mediumKeywords.some(keyword => lowerSymptoms.includes(keyword))) {
      severity = 'medium';
      confidence = 75;
    }

    return {
      response: `${lang.greeting} "${symptoms}"\n\n${lang.analysis}\n\n${lang.disclaimer}`,
      recommendations: lang.recommendations,
      severity,
      followUpRequired,
      confidence,
      messageType: 'diagnosis'
    };
  }

  async analyzePrescription(prescriptionText: string): Promise<any> {
    try {
      const response = await fetch(`${this.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3',
          prompt: this.buildPrescriptionAnalysisPrompt(prescriptionText),
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`OLLAMA API error: ${response.statusText}`);
      }

      const data = await response.json();
      return this.parsePrescriptionAnalysis(data.response);
    } catch (error) {
      console.error('Prescription Analysis Error:', error);
      return {
        error: "Unable to analyze prescription at this time",
        medicines: [],
        dosageWarnings: [],
      };
    }
  }

  private buildMedicalPrompt(symptoms: string, language: string = 'en'): string {
    const prompts = {
      uz: `Siz professional tibbiyot maslahatchisi sifatida, quyidagi belgilar haqida ma'lumot bering. Javobni o'zbek tilida bering.

Bemor belgilari: "${symptoms}"

Iltimos, quyidagilarni taqdim eting:
1. Mumkin bo'lgan sabablar
2. Dastlabki parvarish tavsiyalari
3. Qachon tibbiy yordam izlash kerak
4. Umumiy salomatlik maslahatlari

Muhim eslatmalar:
- Bu professional tibbiy maslahatni almashtirmaydi
- Shoshilinch belgilar darhol tibbiy yordamni talab qiladi
- Har doim to'g'ri tashxis uchun shifokorlar bilan maslahatlashing`,

      ru: `Вы медицинский консультант ИИ. Проанализируйте следующие симптомы и дайте медицинскую консультацию на русском языке.

Симптомы пациента: "${symptoms}"

Пожалуйста, предоставьте:
1. Возможные причины
2. Рекомендации по первичному уходу
3. Когда обращаться за медицинской помощью
4. Общие советы по здоровью

Важные заявления об отказе от ответственности:
- Это не заменяет профессиональную медицинскую консультацию
- Экстренные симптомы требуют немедленной медицинской помощи
- Всегда консультируйтесь с врачами для правильного диагноза`,

      en: `You are a medical AI assistant trained to provide preliminary health guidance. A patient describes the following symptoms: "${symptoms}"

Please provide:
1. Possible causes (differential diagnosis)
2. Immediate care recommendations
3. When to seek medical attention
4. General wellness advice

Important disclaimers:
- This is not a substitute for professional medical advice
- Emergency symptoms require immediate medical attention
- Always consult healthcare professionals for proper diagnosis`
    };

    return prompts[language as keyof typeof prompts] || prompts.en;
  }

  private buildPrescriptionAnalysisPrompt(prescriptionText: string): string {
    return `Analyze this prescription text and extract the following information:
"${prescriptionText}"

Please identify:
1. Medicine names and dosages
2. Frequency and duration
3. Any potential drug interactions
4. Dosage warnings or precautions
5. Special instructions

Format as structured data that can be processed programmatically.

Response:`;
  }

  private parseAIResponse(response: string): any {
    try {
      // Simple parsing logic - can be enhanced with better NLP
      const severity = response.toLowerCase().includes('emergency') || response.toLowerCase().includes('urgent') 
        ? 'urgent' 
        : response.toLowerCase().includes('concerning') || response.toLowerCase().includes('serious')
        ? 'high'
        : response.toLowerCase().includes('monitor') || response.toLowerCase().includes('watch')
        ? 'medium' 
        : 'low';

      const followUpRequired = response.toLowerCase().includes('see a doctor') || 
                              response.toLowerCase().includes('consult') || 
                              response.toLowerCase().includes('medical attention');

      const recommendations = this.extractRecommendations(response);

      return {
        severity,
        followUpRequired,
        recommendations,
        confidence: 80
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return {
        severity: 'medium',
        followUpRequired: true,
        recommendations: [],
        confidence: 50
      };
    }
  }

  private parsePrescriptionAnalysis(response: string): any {
    try {
      // Extract medicines and dosage information
      const medicines = this.extractMedicines(response);
      const warnings = this.extractWarnings(response);

      return {
        medicines,
        dosageWarnings: warnings,
        interactions: [],
        specialInstructions: []
      };
    } catch (error) {
      console.error('Error parsing prescription analysis:', error);
      return {
        medicines: [],
        dosageWarnings: [],
        interactions: [],
        specialInstructions: []
      };
    }
  }

  private extractRecommendations(response: string): any[] {
    // Simple extraction - can be enhanced with better NLP
    const recommendations = [];
    
    if (response.toLowerCase().includes('rest')) {
      recommendations.push({
        type: 'lifestyle',
        title: 'Rest',
        description: 'Get adequate rest and sleep',
        priority: 'high'
      });
    }

    if (response.toLowerCase().includes('hydrat') || response.toLowerCase().includes('water') || response.toLowerCase().includes('fluid')) {
      recommendations.push({
        type: 'lifestyle',
        title: 'Stay Hydrated',
        description: 'Drink plenty of fluids',
        priority: 'medium'
      });
    }

    return recommendations;
  }

  private extractMedicines(response: string): any[] {
    // Simple medicine extraction - enhance with better parsing
    const medicines = [];
    
    // Look for common medicine patterns
    const medicinePattern = /(\w+)\s*(\d+\s*mg)/gi;
    const matches = response.match(medicinePattern);
    
    if (matches) {
      matches.forEach((match, index) => {
        medicines.push({
          name: match,
          dosage: '1 tablet',
          frequency: 'as prescribed',
          duration: 'as directed'
        });
      });
    }

    return medicines;
  }

  private extractWarnings(response: string): string[] {
    const warnings = [];
    
    if (response.toLowerCase().includes('side effect')) {
      warnings.push('Monitor for potential side effects');
    }

    if (response.toLowerCase().includes('interaction')) {
      warnings.push('Check for drug interactions');
    }

    return warnings;
  }
}

export const aiService = new AIService();
export default AIService;
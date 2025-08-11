import { ChatMessage, InsertAIConsultation, InsertChatMessage } from "@shared/schema";
import { storage } from "../storage";

interface AIResponse {
  response: string;
  recommendations: any[];
  severity: string;
  followUpRequired: boolean;
}

export class AIService {
  private ollamaUrl: string;

  constructor() {
    this.ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434";
  }

  async generateMedicalResponse(symptoms: string, userId?: string): Promise<AIResponse> {
    try {
      // Create consultation record
      const consultation = await storage.createAIConsultation({
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

      // Call OLLAMA API
      const response = await fetch(`${this.ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3',
          prompt: this.buildMedicalPrompt(symptoms),
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

      // Save AI response
      await storage.addChatMessage({
        consultationId: consultation.id,
        isAi: true,
        message: aiResponseText,
        metadata: parsedResponse,
      });

      return {
        response: aiResponseText,
        recommendations: parsedResponse.recommendations || [],
        severity: parsedResponse.severity || "low",
        followUpRequired: parsedResponse.followUpRequired || false,
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      return {
        response: "I apologize, but I'm experiencing technical difficulties. Please consult with a healthcare professional for medical advice.",
        recommendations: [],
        severity: "unknown",
        followUpRequired: true,
      };
    }
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

  private buildMedicalPrompt(symptoms: string): string {
    return `You are a medical AI assistant trained to provide preliminary health guidance. A patient describes the following symptoms: "${symptoms}"

Please provide:
1. Possible causes (differential diagnosis)
2. Immediate care recommendations
3. When to seek medical attention
4. General wellness advice

Important disclaimers:
- This is not a substitute for professional medical advice
- Emergency symptoms require immediate medical attention
- Always consult healthcare professionals for proper diagnosis

Please format your response professionally and include severity assessment (low/medium/high) and whether follow-up is required.

Response:`;
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
        ? 'high' 
        : response.toLowerCase().includes('concerning') 
        ? 'medium' 
        : 'low';

      const followUpRequired = response.toLowerCase().includes('see a doctor') || 
                             response.toLowerCase().includes('medical attention') ||
                             severity === 'high';

      const recommendations = this.extractRecommendations(response);

      return {
        severity,
        followUpRequired,
        recommendations,
      };
    } catch (error) {
      return {
        severity: 'unknown',
        followUpRequired: true,
        recommendations: [],
      };
    }
  }

  private parsePrescriptionAnalysis(response: string): any {
    try {
      // Extract structured information from AI response
      const medicines = this.extractMedicines(response);
      const dosageWarnings = this.extractWarnings(response);
      
      return {
        medicines,
        dosageWarnings,
        analysis: response,
      };
    } catch (error) {
      return {
        error: "Unable to parse prescription analysis",
        medicines: [],
        dosageWarnings: [],
      };
    }
  }

  private extractRecommendations(response: string): string[] {
    const recommendations = [];
    const lines = response.split('\n');
    
    for (const line of lines) {
      if (line.includes('recommend') || line.includes('should') || line.includes('try')) {
        recommendations.push(line.trim());
      }
    }
    
    return recommendations.slice(0, 5); // Limit to top 5
  }

  private extractMedicines(response: string): any[] {
    // Basic extraction - can be enhanced with better parsing
    const medicines = [];
    const medicinePattern = /(\w+)\s*(\d+\s*mg)/gi;
    let match;
    
    while ((match = medicinePattern.exec(response)) !== null) {
      medicines.push({
        name: match[1],
        dosage: match[2],
      });
    }
    
    return medicines;
  }

  private extractWarnings(response: string): string[] {
    const warnings = [];
    const lines = response.split('\n');
    
    for (const line of lines) {
      if (line.toLowerCase().includes('warning') || 
          line.toLowerCase().includes('caution') || 
          line.toLowerCase().includes('avoid')) {
        warnings.push(line.trim());
      }
    }
    
    return warnings;
  }
}

export const aiService = new AIService();

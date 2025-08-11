export type UserRole = 'client' | 'pharmacy_seller' | 'pharmacy_owner' | 'super_admin';

export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  role: UserRole;
  phone?: string;
  dateOfBirth?: string;
  loyaltyPoints: number;
  loyaltyTier: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  pharmacyId: string;
  orderNumber: string;
  status: string;
  deliveryMethod: string;
  paymentMethod: string;
  totalAmount: number;
  deliveryAddress?: string;
  deliveryFee: number;
  loyaltyPointsUsed: number;
  loyaltyPointsEarned: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  id: string;
  userId: string;
  doctorName?: string;
  imageUrl?: string;
  analysisResult?: any;
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  expiryDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AIConsultation {
  id: string;
  userId?: string;
  sessionId?: string;
  symptoms?: string;
  aiResponse?: any;
  recommendations?: any;
  severity?: string;
  followUpRequired: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  consultationId?: string;
  isAi: boolean;
  message: string;
  metadata?: any;
  createdAt: string;
}

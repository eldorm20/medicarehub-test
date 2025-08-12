import { Request, Response, NextFunction } from 'express';
import { storage } from './storage';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'client' | 'pharmacy_seller' | 'pharmacy_owner' | 'super_admin';
    firstName?: string;
    lastName?: string;
  };
}

// Middleware to authenticate users
export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    // For demo purposes, we'll use a simple session-based auth
    // In production, you'd use proper JWT or session management
    const userId = req.headers['x-user-id'] as string;
    const userRole = req.headers['x-user-role'] as string;
    
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Get user from database
    const user = await storage.getUser(userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = {
      id: user.id,
      email: user.email || '',
      role: user.role,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Middleware to check user roles
export const requireRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

// Helper to check if user is pharmacy owner
export const requirePharmacyOwner = requireRole(['pharmacy_owner', 'super_admin']);

// Helper to check if user is pharmacy staff
export const requirePharmacyStaff = requireRole(['pharmacy_seller', 'pharmacy_owner', 'super_admin']);

// Helper to check if user is super admin
export const requireSuperAdmin = requireRole(['super_admin']);
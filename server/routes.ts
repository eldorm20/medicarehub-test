import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { aiService } from "./services/aiService";
import { medicineService } from "./services/medicineService";
import { paymentService } from "./services/paymentService";
import { deliveryService } from "./services/deliveryService";
import { insertOrderSchema, insertPrescriptionSchema, insertAIConsultationSchema } from "@shared/schema";
import multer from 'multer';
import path from 'path';

// File upload configuration
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    cb(null, allowedTypes.includes(file.mimetype));
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Medicine routes
  app.get('/api/medicines/search', async (req, res) => {
    try {
      const { q: query, country, year, manufacturer, limit = 50 } = req.query;
      const filters = { 
        country: country as string, 
        year: year as string, 
        manufacturer: manufacturer as string,
        limit: parseInt(limit as string)
      };
      
      const medicines = await medicineService.searchMedicines(query as string || '', filters);
      res.json(medicines);
    } catch (error) {
      console.error('Medicine search error:', error);
      res.status(500).json({ error: 'Failed to search medicines' });
    }
  });

  app.get('/api/medicines/:id', async (req, res) => {
    try {
      const medicine = await medicineService.getMedicine(req.params.id);
      if (!medicine) {
        return res.status(404).json({ error: 'Medicine not found' });
      }
      res.json(medicine);
    } catch (error) {
      console.error('Get medicine error:', error);
      res.status(500).json({ error: 'Failed to get medicine' });
    }
  });

  app.get('/api/medicines/popular', async (req, res) => {
    try {
      const medicines = await medicineService.getPopularMedicines();
      res.json(medicines);
    } catch (error) {
      console.error('Get popular medicines error:', error);
      res.status(500).json({ error: 'Failed to get popular medicines' });
    }
  });

  // AI consultation routes
  app.post('/api/ai/consult', async (req, res) => {
    try {
      const { symptoms, userId } = req.body;
      if (!symptoms) {
        return res.status(400).json({ error: 'Symptoms are required' });
      }

      const response = await aiService.generateMedicalResponse(symptoms, userId);
      res.json(response);
    } catch (error) {
      console.error('AI consultation error:', error);
      res.status(500).json({ error: 'AI consultation failed' });
    }
  });

  app.post('/api/ai/analyze-prescription', upload.single('prescription'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Prescription image is required' });
      }

      // In production, you would use OCR to extract text from image
      const mockPrescriptionText = "Paracetamol 500mg, 2 tablets daily for 5 days";
      
      const analysis = await aiService.analyzePrescription(mockPrescriptionText);
      res.json(analysis);
    } catch (error) {
      console.error('Prescription analysis error:', error);
      res.status(500).json({ error: 'Prescription analysis failed' });
    }
  });

  // Prescription routes
  app.post('/api/prescriptions', upload.single('image'), async (req, res) => {
    try {
      const { doctorName, userId } = req.body;
      
      const prescriptionData = {
        userId,
        doctorName,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
      };

      const prescription = await storage.createPrescription(prescriptionData);
      res.json(prescription);
    } catch (error) {
      console.error('Create prescription error:', error);
      res.status(500).json({ error: 'Failed to create prescription' });
    }
  });

  app.get('/api/prescriptions/:userId', async (req, res) => {
    try {
      const prescriptions = await storage.getUserPrescriptions(req.params.userId);
      res.json(prescriptions);
    } catch (error) {
      console.error('Get prescriptions error:', error);
      res.status(500).json({ error: 'Failed to get prescriptions' });
    }
  });

  // Order routes
  app.post('/api/orders', async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const { items } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Order items are required' });
      }

      // Generate order number
      const orderNumber = `UZ${Date.now()}`;
      const orderWithNumber = { ...orderData, orderNumber };

      const order = await storage.createOrder(orderWithNumber, items);
      res.json(order);
    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  app.get('/api/orders/:userId', async (req, res) => {
    try {
      const orders = await storage.getUserOrders(req.params.userId);
      res.json(orders);
    } catch (error) {
      console.error('Get orders error:', error);
      res.status(500).json({ error: 'Failed to get orders' });
    }
  });

  // Payment routes
  app.post('/api/payments/create', async (req, res) => {
    try {
      const { amount, orderId, userId, method } = req.body;
      
      if (!amount || !orderId || !method) {
        return res.status(400).json({ error: 'Missing required payment fields' });
      }

      const paymentResponse = await paymentService.processPayment({
        amount,
        orderId,
        userId,
        method,
      });

      res.json(paymentResponse);
    } catch (error) {
      console.error('Payment creation error:', error);
      res.status(500).json({ error: 'Failed to create payment' });
    }
  });

  app.post('/api/payments/verify', async (req, res) => {
    try {
      const { transactionId, method } = req.body;
      const isVerified = await paymentService.verifyPayment(transactionId, method);
      res.json({ verified: isVerified });
    } catch (error) {
      console.error('Payment verification error:', error);
      res.status(500).json({ error: 'Failed to verify payment' });
    }
  });

  // Delivery routes
  app.post('/api/delivery/create', async (req, res) => {
    try {
      const { orderId, address, phone, items } = req.body;
      
      const deliveryResponse = await deliveryService.createDelivery({
        orderId,
        address,
        phone,
        items,
      });

      res.json(deliveryResponse);
    } catch (error) {
      console.error('Delivery creation error:', error);
      res.status(500).json({ error: 'Failed to create delivery' });
    }
  });

  app.get('/api/delivery/track/:deliveryId', async (req, res) => {
    try {
      const tracking = await deliveryService.trackDelivery(req.params.deliveryId);
      res.json(tracking);
    } catch (error) {
      console.error('Delivery tracking error:', error);
      res.status(500).json({ error: 'Failed to track delivery' });
    }
  });

  app.get('/api/delivery/slots', async (req, res) => {
    try {
      const slots = await deliveryService.getAvailableSlots();
      res.json({ slots });
    } catch (error) {
      console.error('Get delivery slots error:', error);
      res.status(500).json({ error: 'Failed to get delivery slots' });
    }
  });

  // Pharmacy routes
  app.get('/api/pharmacies', async (req, res) => {
    try {
      const pharmacies = await storage.getPharmacies();
      res.json(pharmacies);
    } catch (error) {
      console.error('Get pharmacies error:', error);
      res.status(500).json({ error: 'Failed to get pharmacies' });
    }
  });

  // Analytics routes
  app.get('/api/analytics', async (req, res) => {
    try {
      const analytics = await storage.getAnalytics();
      res.json(analytics);
    } catch (error) {
      console.error('Get analytics error:', error);
      res.status(500).json({ error: 'Failed to get analytics' });
    }
  });

  // Data import route (for development)
  app.post('/api/admin/import-medicines', async (req, res) => {
    try {
      await medicineService.importUzPharmData();
      res.json({ message: 'Medicines imported successfully' });
    } catch (error) {
      console.error('Import medicines error:', error);
      res.status(500).json({ error: 'Failed to import medicines' });
    }
  });

  // Serve uploaded files with security headers
  app.use('/uploads', (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  }, express.static('uploads'));

  const httpServer = createServer(app);
  return httpServer;
}

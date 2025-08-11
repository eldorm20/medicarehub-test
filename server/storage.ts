import {
  users,
  medicines,
  pharmacies,
  orders,
  orderItems,
  prescriptions,
  aiConsultations,
  chatMessages,
  pharmacyInventory,
  loyaltyTransactions,
  type User,
  type UpsertUser,
  type Medicine,
  type InsertMedicine,
  type Pharmacy,
  type Order,
  type InsertOrder,
  type Prescription,
  type InsertPrescription,
  type AIConsultation,
  type InsertAIConsultation,
  type ChatMessage,
  type InsertChatMessage,
  type PharmacyInventory,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, like, desc, sql, ilike } from "drizzle-orm";

export interface IStorage {
  // User operations (required for auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Medicine operations
  searchMedicines(query: string, filters?: any): Promise<Medicine[]>;
  getMedicine(id: string): Promise<Medicine | undefined>;
  getMedicinesByIds(ids: string[]): Promise<Medicine[]>;
  insertMedicines(medicines: InsertMedicine[]): Promise<void>;

  // Pharmacy operations
  getPharmacies(): Promise<Pharmacy[]>;
  getPharmacyInventory(pharmacyId: string): Promise<PharmacyInventory[]>;

  // Order operations
  createOrder(order: InsertOrder, items: any[]): Promise<Order>;
  getUserOrders(userId: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;

  // Prescription operations
  createPrescription(prescription: InsertPrescription): Promise<Prescription>;
  getUserPrescriptions(userId: string): Promise<Prescription[]>;

  // AI consultation operations
  createAIConsultation(consultation: InsertAIConsultation): Promise<AIConsultation>;
  addChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getConsultationMessages(consultationId: string): Promise<ChatMessage[]>;

  // Analytics
  getAnalytics(): Promise<any>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Medicine operations
  async searchMedicines(query: string, filters: any = {}): Promise<Medicine[]> {
    let queryBuilder = db.select().from(medicines);

    if (query) {
      queryBuilder = queryBuilder.where(
        sql`${medicines.title} ILIKE ${`%${query}%`} OR ${medicines.manufacturer} ILIKE ${`%${query}%`} OR ${medicines.activeIngredient} ILIKE ${`%${query}%`}`
      );
    }

    if (filters.country) {
      queryBuilder = queryBuilder.where(eq(medicines.country, filters.country));
    }

    if (filters.year) {
      queryBuilder = queryBuilder.where(eq(medicines.year, filters.year));
    }

    if (filters.manufacturer) {
      queryBuilder = queryBuilder.where(ilike(medicines.manufacturer, `%${filters.manufacturer}%`));
    }

    return await queryBuilder.limit(50).execute();
  }

  async getMedicine(id: string): Promise<Medicine | undefined> {
    const [medicine] = await db.select().from(medicines).where(eq(medicines.id, id));
    return medicine;
  }

  async getMedicinesByIds(ids: string[]): Promise<Medicine[]> {
    return await db.select().from(medicines).where(sql`${medicines.id} = ANY(${ids})`);
  }

  async insertMedicines(medicineData: InsertMedicine[]): Promise<void> {
    if (medicineData.length === 0) return;
    
    // Insert in batches to avoid memory issues
    const batchSize = 1000;
    for (let i = 0; i < medicineData.length; i += batchSize) {
      const batch = medicineData.slice(i, i + batchSize);
      await db.insert(medicines).values(batch).onConflictDoNothing();
    }
  }

  // Pharmacy operations
  async getPharmacies(): Promise<Pharmacy[]> {
    return await db.select().from(pharmacies).where(eq(pharmacies.isActive, true));
  }

  async getPharmacyInventory(pharmacyId: string): Promise<PharmacyInventory[]> {
    return await db.select().from(pharmacyInventory).where(eq(pharmacyInventory.pharmacyId, pharmacyId));
  }

  // Order operations
  async createOrder(orderData: InsertOrder, items: any[]): Promise<Order> {
    const [order] = await db.insert(orders).values(orderData).returning();
    
    const orderItemsData = items.map(item => ({
      orderId: order.id,
      medicineId: item.medicineId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    }));

    await db.insert(orderItems).values(orderItemsData);
    return order;
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  // Prescription operations
  async createPrescription(prescriptionData: InsertPrescription): Promise<Prescription> {
    const [prescription] = await db.insert(prescriptions).values(prescriptionData).returning();
    return prescription;
  }

  async getUserPrescriptions(userId: string): Promise<Prescription[]> {
    return await db.select().from(prescriptions).where(eq(prescriptions.userId, userId)).orderBy(desc(prescriptions.createdAt));
  }

  // AI consultation operations
  async createAIConsultation(consultationData: InsertAIConsultation): Promise<AIConsultation> {
    const [consultation] = await db.insert(aiConsultations).values(consultationData).returning();
    return consultation;
  }

  async addChatMessage(messageData: InsertChatMessage): Promise<ChatMessage> {
    const [message] = await db.insert(chatMessages).values(messageData).returning();
    return message;
  }

  async getConsultationMessages(consultationId: string): Promise<ChatMessage[]> {
    return await db.select().from(chatMessages).where(eq(chatMessages.consultationId, consultationId)).orderBy(chatMessages.createdAt);
  }

  // Analytics
  async getAnalytics(): Promise<any> {
    const totalRevenue = await db.select({ 
      total: sql<number>`SUM(${orders.totalAmount})` 
    }).from(orders);
    
    const totalOrders = await db.select({ 
      count: sql<number>`COUNT(*)` 
    }).from(orders);
    
    const totalPharmacies = await db.select({ 
      count: sql<number>`COUNT(*)` 
    }).from(pharmacies).where(eq(pharmacies.isActive, true));
    
    const totalConsultations = await db.select({ 
      count: sql<number>`COUNT(*)` 
    }).from(aiConsultations);

    return {
      revenue: totalRevenue[0]?.total || 0,
      orders: totalOrders[0]?.count || 0,
      pharmacies: totalPharmacies[0]?.count || 0,
      consultations: totalConsultations[0]?.count || 0,
    };
  }
}

export const storage = new DatabaseStorage();

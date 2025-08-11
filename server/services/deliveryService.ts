interface DeliveryRequest {
  orderId: string;
  address: string;
  phone: string;
  items: Array<{
    name: string;
    quantity: number;
    weight?: number;
  }>;
}

interface DeliveryResponse {
  success: boolean;
  deliveryId?: string;
  estimatedTime?: string;
  cost?: number;
  error?: string;
}

export class DeliveryService {
  private yandexApiKey: string;
  private yandexBaseUrl: string;

  constructor() {
    this.yandexApiKey = process.env.YANDEX_DELIVERY_API_KEY || '';
    this.yandexBaseUrl = 'https://b2b.taxi.yandex.net/b2b/cargo/integration/v2';
  }

  async createDelivery(request: DeliveryRequest): Promise<DeliveryResponse> {
    try {
      if (!this.yandexApiKey) {
        return {
          success: false,
          error: 'Yandex Delivery service not configured',
        };
      }

      const deliveryData = {
        items: request.items.map(item => ({
          title: item.name,
          quantity: item.quantity,
          weight: item.weight || 0.1, // Default weight in kg
        })),
        route_points: [
          {
            point_id: 1,
            address: {
              fullname: "Pharmacy Location", // This should be actual pharmacy address
              coordinates: [69.240562, 41.311081], // Tashkent coordinates
            },
            contact: {
              phone: "+998901234567", // Pharmacy phone
            },
            type: "source",
          },
          {
            point_id: 2,
            address: {
              fullname: request.address,
            },
            contact: {
              phone: request.phone,
            },
            type: "destination",
          },
        ],
        skip_client_notify: false,
        optional_return: false,
      };

      const response = await fetch(`${this.yandexBaseUrl}/claims/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.yandexApiKey}`,
        },
        body: JSON.stringify(deliveryData),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          deliveryId: result.id,
          estimatedTime: this.calculateEstimatedTime(),
          cost: this.calculateDeliveryCost(request.address),
        };
      } else {
        const error = await response.text();
        console.error('Yandex Delivery API error:', error);
        return {
          success: false,
          error: 'Failed to create delivery order',
        };
      }
    } catch (error) {
      console.error('Delivery service error:', error);
      return {
        success: false,
        error: 'Delivery service unavailable',
      };
    }
  }

  async trackDelivery(deliveryId: string): Promise<any> {
    try {
      const response = await fetch(`${this.yandexBaseUrl}/claims/info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.yandexApiKey}`,
        },
        body: JSON.stringify({ claim_id: deliveryId }),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          status: result.status,
          driver: result.performer_info,
          estimatedArrival: result.eta,
        };
      } else {
        throw new Error('Failed to track delivery');
      }
    } catch (error) {
      console.error('Delivery tracking error:', error);
      return {
        error: 'Unable to track delivery',
      };
    }
  }

  async cancelDelivery(deliveryId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.yandexBaseUrl}/claims/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.yandexApiKey}`,
        },
        body: JSON.stringify({ 
          claim_id: deliveryId,
          cancel_state: 'free',
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Delivery cancellation error:', error);
      return false;
    }
  }

  private calculateEstimatedTime(): string {
    // Basic estimation - in production, this would use real-time data
    return "60-120 minutes";
  }

  private calculateDeliveryCost(address: string): number {
    // Basic cost calculation - in production, this would use distance/zone-based pricing
    const baseCost = 15000; // 15,000 UZS base delivery fee
    
    // Add extra cost for certain areas
    if (address.toLowerCase().includes('чиланзар') || address.toLowerCase().includes('chilanzar')) {
      return baseCost + 5000;
    }
    
    return baseCost;
  }

  async getAvailableSlots(): Promise<string[]> {
    // Return available delivery time slots
    const now = new Date();
    const slots = [];
    
    for (let i = 1; i <= 24; i++) {
      const slotTime = new Date(now.getTime() + i * 60 * 60 * 1000);
      if (slotTime.getHours() >= 9 && slotTime.getHours() <= 22) {
        slots.push(slotTime.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }));
      }
    }
    
    return slots;
  }
}

export const deliveryService = new DeliveryService();

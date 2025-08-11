import crypto from 'crypto';

interface PaymentRequest {
  amount: number;
  orderId: string;
  userId: string;
  method: 'click' | 'payme';
}

interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  paymentUrl?: string;
  error?: string;
}

export class PaymentService {
  private clickMerchantId: string;
  private clickSecretKey: string;
  private paymeMerchantId: string;
  private paymeSecretKey: string;

  constructor() {
    this.clickMerchantId = process.env.CLICK_MERCHANT_ID || '';
    this.clickSecretKey = process.env.CLICK_SECRET_KEY || '';
    this.paymeMerchantId = process.env.PAYME_MERCHANT_ID || '';
    this.paymeSecretKey = process.env.PAYME_SECRET_KEY || '';
  }

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      if (request.method === 'click') {
        return await this.processClickPayment(request);
      } else if (request.method === 'payme') {
        return await this.processPaymePayment(request);
      } else {
        return {
          success: false,
          error: 'Unsupported payment method',
        };
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      return {
        success: false,
        error: 'Payment processing failed',
      };
    }
  }

  private async processClickPayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Click payment integration
      const timestamp = Date.now().toString();
      const signString = `${timestamp}${this.clickMerchantId}${request.orderId}${request.amount}`;
      const signature = crypto
        .createHmac('sha256', this.clickSecretKey)
        .update(signString)
        .digest('hex');

      const paymentData = {
        merchant_id: this.clickMerchantId,
        amount: request.amount,
        order_id: request.orderId,
        timestamp,
        signature,
        return_url: `${process.env.BASE_URL || 'http://localhost:5000'}/payment/success`,
        cancel_url: `${process.env.BASE_URL || 'http://localhost:5000'}/payment/cancel`,
      };

      // In production, make actual API call to Click
      const response = await fetch('https://api.click.uz/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          transactionId: result.transaction_id,
          paymentUrl: result.payment_url,
        };
      } else {
        return {
          success: false,
          error: 'Click payment initialization failed',
        };
      }
    } catch (error) {
      console.error('Click payment error:', error);
      return {
        success: false,
        error: 'Click payment service unavailable',
      };
    }
  }

  private async processPaymePayment(request: PaymentRequest): Promise<PaymentResponse> {
    try {
      // Payme payment integration
      const account = {
        order_id: request.orderId,
      };

      const paymentUrl = `https://checkout.paycom.uz/${btoa(JSON.stringify({
        m: this.paymeMerchantId,
        ac: account,
        a: request.amount * 100, // Payme uses tiyin (1/100 som)
        c: `${process.env.BASE_URL || 'http://localhost:5000'}/payment/payme/callback`,
      }))}`;

      return {
        success: true,
        paymentUrl,
        transactionId: `payme_${request.orderId}_${Date.now()}`,
      };
    } catch (error) {
      console.error('Payme payment error:', error);
      return {
        success: false,
        error: 'Payme payment service unavailable',
      };
    }
  }

  async verifyPayment(transactionId: string, method: 'click' | 'payme'): Promise<boolean> {
    try {
      if (method === 'click') {
        return await this.verifyClickPayment(transactionId);
      } else if (method === 'payme') {
        return await this.verifyPaymePayment(transactionId);
      }
      return false;
    } catch (error) {
      console.error('Payment verification error:', error);
      return false;
    }
  }

  private async verifyClickPayment(transactionId: string): Promise<boolean> {
    try {
      const response = await fetch(`https://api.click.uz/payment/status/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${this.clickSecretKey}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        return result.status === 'completed';
      }
      return false;
    } catch (error) {
      console.error('Click verification error:', error);
      return false;
    }
  }

  private async verifyPaymePayment(transactionId: string): Promise<boolean> {
    try {
      // Payme verification logic
      // This would involve checking the transaction status through Payme API
      return true; // Simplified for demo
    } catch (error) {
      console.error('Payme verification error:', error);
      return false;
    }
  }
}

export const paymentService = new PaymentService();

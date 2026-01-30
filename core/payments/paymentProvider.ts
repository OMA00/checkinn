import { PaymentIntent } from "../domain/paymentIntent";

export interface PaymentProvider {
  name: "stripe" | "flutterwave" | "paystack";

  initializePayment(intent: PaymentIntent): Promise<{
    paymentProviderId: string;
    paymentUrl?: string;
  }>;
  verifyPayment(paymentProviderId: string): Promise<{
    success: boolean;
    rawStatus: string;
  }>;
}

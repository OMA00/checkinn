import { PaymentIntent } from "../domain/paymentIntent";

export interface PaymentIntentRepository {
  create(paymentIntent: PaymentIntent): Promise<void>;
  findById(paymentIntentId: string): Promise<PaymentIntent | null>;
  update(paymentIntent: PaymentIntent): Promise<void>;
}

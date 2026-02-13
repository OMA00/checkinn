import { PaymentIntentRepository } from "../paymentIntentRepository";
import { PaymentIntent } from "../../domain/paymentIntent";

export class InMemoryPaymentIntentRepository implements PaymentIntentRepository {
  private paymentIntent = new Map<string, PaymentIntent>();

  async create(paymentIntent: PaymentIntent): Promise<void> {
    this.paymentIntent.set(paymentIntent.paymentIntentId, paymentIntent);
  }

  async findById(paymentIntentId: string): Promise<PaymentIntent | null> {
    return this.paymentIntent.get(paymentIntentId) ?? null;
  }

  async update(paymentIntent: PaymentIntent): Promise<void> {
    this.paymentIntent.set(paymentIntent.paymentIntentId, paymentIntent);
  }
}

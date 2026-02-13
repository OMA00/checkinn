import { Receipt } from "../../domain/receipt";
import { ReceiptRepository } from "../receiptRepository";

export class InMemoryReceiptRepository implements ReceiptRepository {
  private receipt = new Map<string, Receipt>();

  async create(receipt: Receipt): Promise<void> {
    this.receipt.set(receipt.bookingId, receipt);
  }

  async findByBookingId(bookingId: string): Promise<Receipt | null> {
    return this.receipt.get(bookingId) ?? null;
  }

  async update(receipt: Receipt): Promise<void> {
    this.receipt.set(receipt.bookingId, receipt);
  }
}

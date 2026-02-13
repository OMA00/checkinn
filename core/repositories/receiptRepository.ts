import { Receipt } from "../domain/receipt";

export interface ReceiptRepository {
  findByBookingId(bookingId: string): Promise<Receipt | null>;
  create(receipt: Receipt): Promise<void>;
}

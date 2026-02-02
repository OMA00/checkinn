import { Booking } from "../domain/booking";
import { Receipt } from "../domain/receipt";
import { v4 as uuidv4 } from "uuid";

export function GenerateReceipt(params: {
  booking: Booking;
  hotelName: string;
  location: string;
}): Receipt {
  return {
    receiptId: uuidv4(),
    bookingId: params.booking.bookingId,

    hotelName: params.hotelName,
    location: params.location,

    amount: params.booking.totalAmount,
    currency: params.booking.currency,

    issuedAt: new Date().toISOString(),
  };
}

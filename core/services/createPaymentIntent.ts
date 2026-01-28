import { v4 as uuidv4 } from "uuid";
import { Booking } from "../domain/booking";
import { PaymentIntent } from "../domain/paymentIntent";

export function CreatePaymentIntent(booking: Booking): PaymentIntent {
  return {
    paymentIntentId: uuidv4(),
    bookingId: booking.bookingId,
    amount: booking.totalAmount,
    currency: booking.currency,
    status: "REQUIRES_PAYMENT",
    createdAt: new Date().toISOString(),
  };
}

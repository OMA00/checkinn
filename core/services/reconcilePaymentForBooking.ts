import { Booking } from "../domain/booking";

export function CanReconcilePayment(booking: Booking): boolean {
  return booking.status === "PAYMENT_PENDING";
}

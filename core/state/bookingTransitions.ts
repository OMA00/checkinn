import { BookingStatus } from "./bookingStates";

export const bookingTransitions: Record<BookingStatus, BookingStatus[]> = {
  PAYMENT_PENDING: ["CONFIRMED", "EXPIRED"],
  CONFIRMED: [], //TERMINAL
  EXPIRED: ["PAYMENT_PENDING"], // RETRY ALLOWED
  CANCELLED: [], // TERMINAL
};

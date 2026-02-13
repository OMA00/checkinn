import { BookingStatus } from "./bookingStates";

export const BookingTransitions: Record<BookingStatus, BookingStatus[]> = {
  INTENT_CREATED: ["ROOMS_HELD", "CANCELLED"],
  ROOMS_HELD: ["PAYMENT_PENDING", "EXPIRED"],
  PAYMENT_PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: [],
  CANCELLED: [],
  EXPIRED: [],
};

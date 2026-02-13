import { DomainEvent } from "./domainEvent";

export type BookingConfirmedEvent = DomainEvent<
  "BOOKING_CONFIRMED",
  {
    bookingId: string;
    hotelId: string;
    totalAmount: number;
    currency: string;
  }
>;

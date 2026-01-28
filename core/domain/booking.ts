export type BookingStatus =
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "CANCELLED"
  | "EXPIRED";

export type Booking = {
  bookingId: string; // UUID
  bookingIntentId: string;
  holdId: string;
  quoteId: string;
  hotelId: string;
  hotelSlug: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  rooms: number;
  currency: "NGN";
  totalAmount: number;
  status: BookingStatus;
  createdAt: string;
};

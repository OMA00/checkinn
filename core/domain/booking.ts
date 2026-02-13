import { BookingStatus } from "../state/bookingStates";
import { BookingTimeline } from "./bookingTimeline";

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
  timeline: BookingTimeline;
  createdAt: string;
  updatedAt: string;
};

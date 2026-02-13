import { Booking } from "../../domain/booking";

export type BookingReadModel = {
  bookingId: string;
  hotelSlug: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  currency: string;
  lastUpdatedAt: string;
};

export function ProjectBookingToReadModel(booking: Booking): BookingReadModel {
  return {
    bookingId: booking.bookingId,
    hotelSlug: booking.hotelSlug,
    status: booking.status,
    checkInDate: booking.checkInDate,
    checkOutDate: booking.checkOutDate,
    totalAmount: booking.totalAmount,
    currency: booking.currency,
    lastUpdatedAt: booking.updatedAt,
  };
}

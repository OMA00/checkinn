import { Booking } from "../domain/booking";
import { BookingRepository } from "../repositories/bookingRepository";

export async function CreateBookingAndPersist(params: {
  booking: Booking;
  bookingRepository: BookingRepository;
}) {
  const existing = await params.bookingRepository.findById(
    params.booking.bookingId,
  );

  // idempotency guard
  if (existing) {
    return existing;
  }

  await params.bookingRepository.create(params.booking);
  return params.booking;
}

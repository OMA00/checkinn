import { BookingRepository } from "../../repositories/bookingRepository";
import { BookingReadModel } from "../readModels/bookingReadModels";
import { ProjectBookingToReadModel } from "../readModels/bookingReadModels";

export async function GetBookingById(params: {
  bookingId: string;
  bookingRepository: BookingRepository;
}): Promise<BookingReadModel | null> {
  const booking = await params.bookingRepository.findById(params.bookingId);
  if (!booking) return null;

  return ProjectBookingToReadModel(booking);
}

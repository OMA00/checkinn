import { Booking } from "../domain/booking";

export interface BookingRepository {
  create(booking: Booking): Promise<void>;
  findById(bookingId: string): Promise<Booking | null>;
  update(booking: Booking): Promise<void>;
}

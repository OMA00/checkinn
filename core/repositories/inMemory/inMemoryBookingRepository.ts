import { Booking } from "../../domain/booking";
import { BookingRepository } from "../bookingRepository";

export class InMemoryBookingRepository implements BookingRepository {
  private bookings = new Map<string, Booking>();

  async create(booking: Booking): Promise<void> {
    this.bookings.set(booking.bookingId, booking);
  }

  async findById(bookingId: string): Promise<Booking | null> {
    return this.bookings.get(bookingId) ?? null;
  }

  async update(booking: Booking): Promise<void> {
    this.bookings.set(booking.bookingId, booking);
  }
}

import { BookingRepository } from "../repositories/bookingRepository";
import { DomainEvent } from "../domain/events/domainEvent";
import { Result } from "../result/result";
import { BookingPolicies } from "../policies/bookingPolicies";

export async function ExpireBookingsJob(params: {
  bookingRepository: BookingRepository;
  now?: Date;
}): Promise<Result<null>> {
  const now = params.now ?? new Date();
  const events: DomainEvent[] = [];

  const pending =
    await params.bookingRepository.findByStatus("PAYMENT_PENDING");
  for (const booking of pending) {
    const createdAtMs = new Date(booking.createdAt).getTime();
    const ttlMs = BookingPolicies.PAYMENT_WINDOW_MINUTES * 60 * 1000;
    if (now.getTime() <= createdAtMs + ttlMs) continue;
  }
}

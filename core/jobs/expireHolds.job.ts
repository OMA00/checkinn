import { HoldRepository } from "../repositories/holdRepository";
import { BookingRepository } from "../repositories/bookingRepository";
import { DomainEvent } from "../domain/events/domainEvent";
import { Result } from "../result/result";

export async function ExpireHoldsJob(params: {
  holdRepository: HoldRepository;
  bookingRepository: BookingRepository;
  now?: Date;
}): Promise<Result<null>> {
  const now = params.now ?? new Date();
  const events: DomainEvent[] = [];

  const activeHolds = await params.holdRepository.findActive();

  for (const hold of activeHolds) {
    const expiresAtMs = new Date(hold.expiresAt).getTime();
    if (now.getTime() <= expiresAtMs) continue;
    // 1) Expire the hold
    hold.status = "EXPIRED";
    await params.holdRepository.update(hold);

    events.push({
      type: "HOLD_EXPIRED",
      payload: { holdId: hold.holdId, bookingIntentId: hold.bookingIntentId },
      occuredAt: now.toISOString(),
    });

    //2) If the hold is tied to a booking, expire the booking if
    // still pending  payment
    if (hold.bookingId) {
      const booking = await params.bookingRepository.findById(hold.bookingId);
      if (booking && booking.status === "PAYMENT_PENDING") {
        booking.status = "EXPIRED";
        booking.timeline.push({
          status: "EXPIRED",
          at: now.toISOString(),
          reason: "Hold expired before payment completed",
        });
        await params.bookingRepoisitory.update(booking);
        events.push({
          type: "BOOKING_EXPIRED",
          payload: { bookingId: booking.bookingId },
          occuredAt: now.toISOString(),
        });
      }
    }
  }
  return { data: null, events };
}

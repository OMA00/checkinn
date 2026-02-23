import { Result } from "../result/result";
import { DomainEvent } from "../domain/events/domainEvent";
import { ExpireHoldsJob } from "./expireHolds.job";
import { ExpireBookingsJob } from "./expireBookings.job";
import { HoldRepository } from "../repositories/holdRepository";
import { BookingRepository } from "../repositories/bookingRepository";

export async function RunMaintenanceJob(params: {
  holdRepository: HoldRepository;
  bookingRepository: BookingRepository;
  now?: Date;
}): Promise<Result<null>> {
  const now = params.now ?? new Date();
  const events: DomainEvent[] = [];

  // 1) Expire holds first (releases inventory)
  const holdsResult = await ExpireHoldsJob({
    holdRepository: params.holdRepository,
    bookingRepository: params.bookingRepository,
    now,
  });
  // FIX: Changed colon (:) to semicolon (;)
  events.push(...holdsResult.events);

  // 2) Then expire bookings still pending beyond payment window
  const bookingResult = await ExpireBookingsJob({
    bookingRepository: params.bookingRepository,
    now,
  });
  events.push(...bookingResult.events);

  return { data: null, events };
}

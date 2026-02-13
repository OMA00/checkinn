import { Booking } from "../domain/booking";
import { BookingStatus } from "../state/bookingStates";
import { AssertTransitionAllowed } from "../state/guards";

export function TransitionBookingState(
  booking: Booking,
  nextStatus: BookingStatus,
  reason: string,
): Booking {
  AssertTransitionAllowed(booking.status, nextStatus);
  const now = new Date().toISOString();

  return {
    ...booking,
    status: nextStatus,
    timeline: [
      ...booking.timeline,
      {
        status: nextStatus,
        at: now,
        reason: reason,
      },
    ],
    updatedAt: now, // 🟢 Fixed typo and satisfied the type
  };
}

import { BookingStatus } from "./bookingStates";
import { BookingTransitions } from "./transitions";

export function AssertTransitionAllowed(
  from: BookingStatus,
  to: BookingStatus,
) {
  const allowed = BookingTransitions[from];
  if (!allowed.includes(to)) {
    throw new Error(`Illegal booking transition: ${from} -> ${to}`);
  }
}

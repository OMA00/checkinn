import { Hotel } from "../domain/hotel";
import { BookingState } from "../state/bookingStates";

export function checkAvailability(hotel: Hotel): BookingState {
  if (!hotel.isVerified) return "EXPIRED";

  //Mock logic (replaced later by DB + calendar)
  if (hotel.roomsAvailable && hotel.roomsAvailable > 0) {
    return "AVAILABLE";
  }

  return "EXPIRED";
}

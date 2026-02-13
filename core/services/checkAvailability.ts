import { Hotel } from "../domain/hotel";
import { BookingStatus } from "../state/bookingStates";

export function CheckAvailability(hotel: Hotel): BookingStatus {
  if (!hotel.isVerified) return "EXPIRED";

  //Mock logic (replaced later by DB + calendar)
  if (hotel.roomsAvailable && hotel.roomsAvailable > 0) {
    return "INTENT_CREATED";
  }
  return "EXPIRED";
}

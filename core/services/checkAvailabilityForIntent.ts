import { BookingIntent } from "../domain/bookingIntent";
import { AvailabilityResult } from "../domain/availability";
import { Hotel } from "../domain/hotel";

export function checkAvailabilityForIntent(
  intent: BookingIntent,
  hotel: Hotel,
): AvailabilityResult {
  // Guard 1: hotel must be verified
  if (!hotel.isVerified) {
    return { status: "UNAVAILABLE", reason: "NOT_VERIFIED" };
  }

  // Guard 2: mock room availability
  const roomsAvailable = hotel.roomsAvailable ?? 0;

  if (roomsAvailable < intent.rooms) {
    return { status: "UNAVAILABLE", reason: "NO_ROOMS" };
  }

  //Guard 3: Mock date sanity(placeholder)
  if (intent.checkInDate >= intent.checkOutDate) {
    return { status: "UNAVAILABLE", reason: "OUT_OF_DATES" };
  }

  return {
    status: "AVAILABLE",
    roomsAvailable,
  };
}

import { BookingIntent } from "../domain/bookingIntent";
import { Hotel } from "../domain/hotel";
import { BookingError } from "../domain/error";
import { Result } from "../domain/result";

export function CheckAvailabilityForIntent({
  intent,
  hotel,
}: {
  intent: BookingIntent;
  hotel: Hotel;
}): Result<"AVAILABLE", BookingError> {
  if (hotel.roomsAvailable < intent.rooms) {
    return {
      ok: false,
      error: {
        type: "HOTEL_FULL",
        hotelId: hotel.id,
      },
    };
  }

  return { ok: true, value: "AVAILABLE" };
}

import { Booking } from "../domain/booking";
import { BookingIntent } from "../domain/bookingIntent";
import { Hold } from "../domain/hold";
import { PriceQuote } from "../domain/priceQuote";
import { v4 as uuidv4 } from "uuid";

export function CreateBooking(params: {
  intent: BookingIntent;
  hold: Hold;
  quote: PriceQuote;
}): Booking {
  return {
    bookingId: uuidv4(),
    bookingIntentId: params.intent.bookingIntentId,
    holdId: params.hold.holdId,
    quoteId: params.quote.quoteId,
    hotelId: params.intent.hotelId,
    hotelSlug: params.intent.hotelSlug,
    checkInDate: params.intent.checkInDate,
    checkOutDate: params.intent.checkOutDate,
    guests: params.intent.guests,
    rooms: params.intent.rooms,
    currency: params.quote.currency,
    totalAmount: params.quote.total,

    status: "PENDING_PAYMENT",
    createdAt: new Date().toISOString(),
  };
}

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
  const now = new Date().toISOString();

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

    // 1. Force the type if the quote currency is a general string
    currency: params.quote.currency as "NGN",

    totalAmount: params.quote.total,

    // 2. YOU WERE MISSING THIS:
    status: "PAYMENT_PENDING",

    timeline: [
      {
        status: "PAYMENT_PENDING",
        at: now,
        reason: "Booking created from intent, hold and price quote",
      },
    ],

    createdAt: now,
    updatedAt: now,
  };
}

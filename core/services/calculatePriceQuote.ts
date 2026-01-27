import { PriceQuote } from "../domain/priceQuote";
import { BookingIntent } from "../domain/bookingIntent";
import { Hotel } from "../domain/hotel";
import { v4 as uuidv4 } from "uuid";

export function calculatePriceQuote(params: {
  intent: BookingIntent;
  hotel: Hotel;
  hotelExpiresAt: number;
}): PriceQuote {
  const nights =
    (new Date(params.intent.checkOutDate).getTime() -
      new Date(params.intent.checkInDate).getTime()) /
    (1000 * 60 * 60 * 24);

  const basePrice =
    (params.hotel.priceFrom ?? 0) * nights * params.intent.rooms;

  const serviceFee = Math.round(basePrice * 0.05); // 10%
  const taxes = 0; // placeholder

  return {
    quoteId: uuidv4(),
    bookingIntentId: params.intent.bookingIntentId,
    hotelId: params.hotel.id,

    currency: "NGN",

    basePrice,
    serviceFee,
    taxes,
    total: basePrice + serviceFee + taxes,

    expiresAt: params.holdExpiresAt,
  };
}

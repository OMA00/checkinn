"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { BookingIntent } from "../../../../../../../../core/domain/bookingIntent";
import { Hotel } from "../../../../../../../../core/domain/hotel";
import { PriceQuote } from "../../../../../../../../core/domain/priceQuote";
import { checkAvailabilityForIntent } from "../../../../../../../../core/services/checkAvailabilityForIntent";
import { createHold } from "../../../../../../../../core/services/createHold";
import { calculatePriceQuote } from "../../../../../../../../core/services/calculatePriceQuote";
import { CreateBooking } from "../../../../../../../../core/services/createBooking";
import { CreatePaymentIntent } from "../../../../../../../../core/services/createPaymentIntent";

export function BookingIntentForm({ hotel }: { hotel: Hotel }) {
  const [message, setMessage] = useState<string | null>(null);
  const [quote, setQuote] = useState<PriceQuote | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const bookingIntentId = uuid();

    // 1️⃣ Intent (ephemeral)
    const intent: BookingIntent = {
      bookingIntentId,
      hotelId: hotel.id,
      hotelSlug: hotel.slug,
      checkInDate: "2026-04-01",
      checkOutDate: "2026-04-03",
      guests: 1,
      rooms: 1,
      source: "web",
    };

    // 2️⃣ Intelligence
    const availability = checkAvailabilityForIntent(intent, hotel);
    if (availability.status !== "AVAILABLE") {
      setMessage(`Unavailable: ${availability.reason}`);
      return;
    }

    // 3️⃣ Transaction Control (Hold)
    const hold = createHold({
      holdId: uuid(),
      bookingIntentId,
      hotelId: hotel.id,
      roomsHeld: intent.rooms,
    });

    // 4️⃣ Value Capture (Snapshot Pricing)
    const priceQuote = calculatePriceQuote({
      intent,
      hotel,
      holdExpiresAt: hold.expiresAt,
    });

    setQuote(priceQuote);
    setMessage(
      `Rooms held! Total: ${priceQuote.currency} ₦${priceQuote.total.toLocaleString()}`,
    );

    const booking = CreateBooking({
      intent,
      hold,
      quote: priceQuote,
    });

    const paymentIntent = CreatePaymentIntent(booking);

    setMessage(
      `Booking created. Ref: ${booking.bookingId}. Complete payment to confirm.`,
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 p-4 border rounded-lg space-y-4">
      <button className="w-full px-6 py-3 rounded bg-black text-white font-bold">
        Confirm & Hold Rooms
      </button>

      {message && (
        <div className="bg-gray-50 p-3 rounded text-sm">
          <p className="font-medium text-black">{message}</p>
          {quote && (
            <p className="text-gray-500 mt-1">Quote ID: {quote.quoteId}</p>
          )}

          <p className="mt-2 text-sm text-gray-600">
            Payment required to confirm booking.
          </p>
        </div>
      )}
    </form>
  );
}

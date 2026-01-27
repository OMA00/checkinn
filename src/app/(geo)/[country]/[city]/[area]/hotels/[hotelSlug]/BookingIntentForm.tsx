"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { BookingIntent } from "../../../../../../../../core/domain/bookingIntent";
import { checkAvailabilityForIntent } from "../../../../../../../../core/services/checkAvailabilityForIntent";
import { createHold } from "../../../../../../../../core/services/createHold";
import { Hotel } from "../../../../../../../../core/domain/hotel";


export function BookingIntentForm({ hotel }: { hotel: Hotel}) {
  const [message, setMessage] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const bookingIntentId = uuid();

    const intent: BookingIntent = {
      bookingIntentId,
      id: hotel.id
      hotelId: hotel.id,
      hotelSlug: hotel.slug,
      checkInDate: "2026-04-01",
      checkOutDate: "2026-04-03",
      guests: 1,
      rooms: 1,
      source: "web",
    };

    const availability = checkAvailabilityForIntent(intent, hotel);

    if (availability.status !== "AVAILABLE") {
      setMessage(`Unavailable: ${availability.reason}`);
      return;
    }

    const hold = createHold({
      holdId: uuid(),
      bookingIntentId,
      hotelId: hotel.id,
      roomsHeld: intent.rooms,
    });

    setMessage(`Rooms held for you for 10 minutes. Hold ID: ${hold.holdId}`);
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <button className="px-6 py-3 rounded bg-black text-white">
        Hold Rooms
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}

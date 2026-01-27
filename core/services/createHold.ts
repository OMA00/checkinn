import { Hold } from "../domain/hold";

export function createHold(params: {
  holdId: string;
  bookingIntentId: string;
  hotelId: string;
  roomsHeld: number;
  holdMinutes?: number;
}): Hold {
  const now = Date.now();
  const ttl = (params.holdMinutes ?? 10) * 60 * 1000;

  return {
    holdId: params.holdId,
    bookingIntentId: params.bookingIntentId,
    hotelId: params.hotelId,
    roomsHeld: params.roomsHeld,
    state: "HELD",
    expiresAt: now + ttl,
  };
}

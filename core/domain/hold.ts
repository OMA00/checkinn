export type Hold = {
  holdId: string; //UUID
  bookingIntentId: string; //ties to intent
  hotelId: string;
  roomsHeld: number;
  state: "HELD" | "EXPIRED";
  expiresAt: number; // epoch ms
};

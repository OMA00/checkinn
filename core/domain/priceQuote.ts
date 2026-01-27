export type PriceQuote = {
  quoteId: string; //UUID
  bookingIntent: string;
  hotelId: string;

  currency: "NGN";
  basePrice: number; // room price * nights * rooms
  serviceFee: number; // platform fee
  taxes: number; // placeholder for now
  total: number; // final amount

  expiresAt: number; // must align with hold expiry
};

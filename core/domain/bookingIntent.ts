export type BookingIntent = {
  bookingIntentId: string;

  hotelId: string;
  hotelSlug: string;

  checkInDate: string;
  checkOutDate: string;

  guests: number;
  rooms: number;

  source: "web" | "mobile" | "whatsappp";
};

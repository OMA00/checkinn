export type BookingError =
  | {
      type: "HOTEL_FULL";
      hotelId: string;
    }
  | {
      type: "INVALID_DATES";
      checkin: string;
      checkout: string;
    }
  | {
      type: "HOLD_EXPIRED";
      holdId: string;
    }
  | {
      type: "PAYMENT_FAILED";
      reason: string;
    };

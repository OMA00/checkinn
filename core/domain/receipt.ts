export type Receipt = {
  receiptId: string;
  bookingId: string;

  hotelName: string;
  location: string;

  amount: number;
  currency: "NGN";

  issuedAt: string;
};

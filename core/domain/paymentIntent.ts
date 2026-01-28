export type PaymentIntentStatus =
  | "REQUIRES_PAYMENT"
  | "PROCESSING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED";

export type PaymentIntent = {
  paymentIntentId: string; // UUID internal
  bookingId: string;
  amount: number;
  currency: "NGN";

  provider?: "stripe" | "paystack" | "flutterwave";

  status: PaymentIntentStatus;

  createdAt: string;
};

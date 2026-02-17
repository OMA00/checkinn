import { PaymentIntentStatus } from "../domain/paymentIntent";

export const PaymentTransitions: Record<
  PaymentIntentStatus,
  PaymentIntentStatus[]
> = {
  REQUIRES_PAYMENT: ["PROCESSING", "SUCCEEDED", "FAILED", "CANCELLED"],
  PROCESSING: ["SUCCEEDED", "FAILED"], // 👈 The "Red Line" fix
  SUCCEEDED: [],
  FAILED: ["REQUIRES_PAYMENT", "CANCELLED"],
  CANCELLED: [],
};

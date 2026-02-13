import { DomainEvent } from "./domainEvent";

export type PaymentFailedEvent = DomainEvent<
  "PAYMENT_FAILED",
  {
    bookingId: string;
    reason: string;
  }
>;

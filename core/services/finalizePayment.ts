import { Booking } from "../domain/booking";
import { PaymentIntent } from "../domain/paymentIntent";

export function FinalizePayment(params: {
  booking: Booking;
  paymentIntent: PaymentIntent;
  verified: boolean;
}): { booking: Booking; paymentIntent: PaymentIntent } {
  if (!params.verified) {
    return {
      booking: {
        ...params.booking,
        status: "CANCELLED",
      },
      paymentIntent: {
        ...params.paymentIntent,
        status: "FAILED",
      },
    };
  }

  return {
    booking: {
      ...params.booking,
      status: "CONFIRMED",
    },
    paymentIntent: {
      ...params.paymentIntent,
      status: "SUCCEEDED",
    },
  };
}

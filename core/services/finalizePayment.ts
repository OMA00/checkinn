import { Booking } from "../domain/booking";
import { PaymentIntent } from "../domain/paymentIntent";

export function finalizePayment(params: {
  booking: Booking;
  paymentIntent: PaymentIntent;
  verified: boolean;
}) {
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

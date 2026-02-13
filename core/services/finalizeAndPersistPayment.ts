import { PaymentIntent } from "../domain/paymentIntent";
import { Booking } from "../domain/booking";
import { PaymentIntentRepository } from "./../repositories/paymentIntentRepository";
import { BookingRepository } from "../repositories/bookingRepository";
import { TransitionBookingState } from "./transitionBookingStates";

export async function FinalizeAndPersistPayments(params: {
  booking: Booking;
  paymentIntent: PaymentIntent;
  bookingRepository: BookingRepository;
  paymentIntentRepository: PaymentIntentRepository;
  verified: boolean;
}) {
  // 1. Guard idempotency
  if (params.booking.status === "CONFIRMED") {
    return {
      booking: params.booking,
      paymentIntent: params.paymentIntent,
    };
  }

  // 2. Apply lawful transitions
  const updatedBooking = TransitionBookingState(
    params.booking,
    "CONFIRMED",
    "reason",
  );

  // 3. Persist the Booking
  await params.bookingRepository.update(updatedBooking);

  // 4. Update and Persist the Payment Intent
  // ✅ Only declare this ONCE with the proper Type
  const updatedPaymentIntent: PaymentIntent = {
    ...params.paymentIntent,
    status: "SUCCEEDED",
  };

  await params.paymentIntentRepository.update(updatedPaymentIntent);

  // 5. Final Result
  return {
    booking: updatedBooking,
    paymentIntent: updatedPaymentIntent,
  };
}

import { Booking } from "../domain/booking";
import { Result } from "../result/result";
import { PaymentIntent } from "../domain/paymentIntent";
import { BookingRepository } from "../repositories/bookingRepository";
import { PaymentIntentRepository } from "../repositories/paymentIntentRepository";

export async function FinalizeAndPersistPayments(params: {
  result: Result<{
    booking: Booking;
    paymentIntent: PaymentIntent;
  }>;
  bookingRepository: BookingRepository;
  paymentIntentRepository: PaymentIntentRepository;
}) {
  const { booking, paymentIntent } = params.result.data;
  await params.bookingRepository.update(booking);
  await params.paymentIntentRepository.update(paymentIntent);

  return params.result;
}

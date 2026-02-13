import { Booking } from "../domain/booking";
import { PaymentIntent } from "../domain/paymentIntent";
import { verifyPayment } from "./verifyPayment";
import { FinalizePayment } from "./finalizePayment";
import { BookingRepository } from "../repositories/bookingRepository";
import { PaymentIntentRepository } from "../repositories/paymentIntentRepository";
import { ReceiptRepository } from "../repositories/receiptRepository";
import { ProjectBookingToReadModel } from "./readModels/bookingReadModels";
import { DomainEvent } from "../domain/events/domainEvent";

export async function FinalizePaymentFlowAndPersists(params: {
  booking: Booking;
  paymentIntent: PaymentIntent;
  paymentProviderId: string;
  bookingRepository: BookingRepository;
  paymentIntentRepository: PaymentIntentRepository;
  receiptRepository: ReceiptRepository;
}) {
  // 1. VERIFY: Talk to the external provider (Flutterwave/Paystack)
  const verification = await verifyPayment({
    paymentIntent: params.paymentIntent,
    paymentProviderId: params.paymentProviderId,
  });

  // 2. LOGIC: Decide new state based on verification (The "Pure" step)
  const result = FinalizePayment({
    booking: params.booking,
    paymentIntent: params.paymentIntent,
    verified: verification.verified,
  });

  // 3. PERSIST: Save the updated Booking and PaymentIntent to memory/DB
  await params.bookingRepository.update(result.booking);
  await params.paymentIntentRepository.update(result.paymentIntent);

  // 4 . Read model later store in cache,search UI feed.
  const readModel = ProjectBookingToReadModel(result.booking);

  // 5. SIDE EFFECT: If successful, create and save the receipt
  const Events: DomainEvent<string, any>[] = [];
  if (result.booking.status === "CONFIRMED") {
    Events.push({
      type: "BOOKING_CONFIRMED",
      occuredAt: new Date().toISOString(),
      payload: {
        bookingId: result.booking.bookingId,
        hotelId: result.booking.hotelId,
        totalAmount: result.booking.totalAmount,
        currency: result.booking.currency,
      },
    });
  }

  // 6. RETURN: Give the API handler the final state
  return {
    booking: result.booking,
    paymentIntent: result.paymentIntent,
    verified: verification.verified,
    event: Events,
  };
}

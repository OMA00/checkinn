import { Booking } from "../domain/booking";
import { PaymentIntent } from "../domain/paymentIntent";
import { verifyPayment } from "./verifyPayment";
import { FinalizePayment } from "./finalizePayment";
import { BookingRepository } from "../repositories/bookingRepository";
import { PaymentIntentRepository } from "../repositories/paymentIntentRepository";
import { ReceiptRepository } from "../repositories/receiptRepository";
import { ProjectBookingToReadModel } from "./readModels/bookingReadModels";
import { GenerateReceipt } from "./generateReceipt";

export async function FinalizePaymentFlowAndPersist(params: {
  booking: Booking;
  paymentIntent: PaymentIntent;
  paymentProviderId: string;
  bookingRepository: BookingRepository;
  paymentIntentRepository: PaymentIntentRepository;
  receiptRepository: ReceiptRepository; // 👈 Dependency Injected
}) {
  // 1. VERIFY: External handshake with the payment gateway
  const verification = await verifyPayment({
    paymentIntent: params.paymentIntent,
    paymentProviderId: params.paymentProviderId,
  });

  // 2. LOGIC: The "Brain" decides the new state.
  // We get back a 'Result' envelope containing { data, events }
  const result = FinalizePayment({
    booking: params.booking,
    paymentIntent: params.paymentIntent,
    verified: verification.verified,
  });

  // 3. PERSIST: Save the updated core entities using .data wrapper
  // We "unpack" the result box to save the specific objects
  await params.bookingRepository.update(result.data.booking);
  await params.paymentIntentRepository.update(result.data.paymentIntent);

  // 4. RECEIPT LOGIC: Creating the financial paper trail
  // We only create a receipt if the logic actually confirmed the booking
  if (result.data.booking.status === "CONFIRMED") {
    // GUARD CHECK WE HAVE A RECEIPT FOR THIS BOOKING
    const existingReceipt = await params.receiptRepository.findByBookingId(
      result.data.booking.bookingId,
    );

    if (!existingReceipt) {
      // 2. Generate the object
      const receipt = GenerateReceipt({
        booking: result.data.booking,
        hotelName: "Grand Oasis",
        location: "Lagos, Nigeria",
        providerReference: params.paymentProviderId,
      });

      // 3. FIX: Pass 'receipt' directly, NOT '{receipt}'
      await params.receiptRepository.create(receipt);
    }
  }

  // 4. READ MODEL: Syncing the search/UI view with the new state
  const readModel = ProjectBookingToReadModel(result.data.booking);

  // 5. RETURN: Pass everything back to the Webhook
  // We include the events generated in Step 2 so they can be dispatched
  return {
    booking: result.data.booking,
    paymentIntent: result.data.paymentIntent,
    verified: verification.verified,
    events: result.events, // 👈 Passing the "News" up the chain
  };
}

import { Booking } from "../domain/booking";
import { PaymentIntent } from "../domain/paymentIntent";
import { Result } from "../result/result";
import { BookingConfirmedEvent } from "../domain/events/bookingConfirmed";
import { bookingTransitions } from "../state/bookingTransitions";
import { PaymentTransitions } from "../state/paymentTransitions"; // Ensure correct casing
import { assertTransition } from "../state/assertTransition";

/**
 * FinalizePayment: The Pure Domain Brain.
 * Decides if a booking lives or dies based on payment verification.
 */
export function FinalizePayment(params: {
  booking: Booking;
  paymentIntent: PaymentIntent;
  verified: boolean;
}): Result<{
  booking: Booking;
  paymentIntent: PaymentIntent;
}> {
  // 1. Initialize the events array
  const events: BookingConfirmedEvent[] = [];

  // 2. IDEMPOTENCY GUARD: If already confirmed, do nothing.
  if (params.booking.status === "CONFIRMED") {
    return {
      data: {
        booking: params.booking,
        paymentIntent: params.paymentIntent,
      },
      events: [],
    };
  }

  // 3. THE TRANSITION LOGIC
  if (params.verified) {
    // Validate transitions using the "Canon" maps
    assertTransition(params.booking.status, "CONFIRMED", bookingTransitions);
    assertTransition(
      params.paymentIntent.status,
      "SUCCEEDED",
      PaymentTransitions,
    );

    // Apply state changes
    params.booking.status = "CONFIRMED";
    params.paymentIntent.status = "SUCCEEDED";

    // Create the Success Event
    events.push({
      type: "BOOKING_CONFIRMED",
      occurredAt: new Date().toISOString(),
      payload: {
        bookingId: params.booking.bookingId,
        hotelId: params.booking.hotelId,
        totalAmount: params.booking.totalAmount,
        currency: params.booking.currency,
      },
    });
  } else {
    // Handle Payment Failure
    assertTransition(
      params.booking.status,
      "PAYMENT_FAILED",
      bookingTransitions,
    );
    assertTransition(params.paymentIntent.status, "FAILED", PaymentTransitions);

    params.booking.status = "PAYMENT_FAILED";
    params.paymentIntent.status = "FAILED";

    // Note: You can add a BOOKING_FAILED event here later if needed
  }

  // 4. THE RETURN HANDSHAKE
  return {
    data: {
      booking: params.booking,
      paymentIntent: params.paymentIntent,
    },
    events: events,
  };
}

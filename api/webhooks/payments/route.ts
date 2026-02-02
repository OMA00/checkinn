import { verifyPayment } from "../../../core/services/verifyPayment";
import { finalizePayment } from "../../../core/services/finalizePayment";
import { GenerateReceipt } from "../../../core/services/generateReceipt";
import { Booking } from "../../../core/domain/booking";
import { PaymentIntent } from "../../../core/domain/paymentIntent";

export async function POST(req: Request) {
  const body = await req.json();

  // 1. Extract the raw IDs from the request body
  const { paymentIntentId, providerPaymentId } = body;

  // 2. Full Mock Booking (Must match the Booking Interface)
  const booking: Booking = {
    bookingId: "bk_123",
    hotelId: "hotel_abc",
    totalAmount: 50000,
    currency: "NGN",
    status: "PENDING_PAYMENT",
    checkInDate: "2026-03-01",
    checkOutDate: "2026-03-05",
    rooms: 1,
    guests: 2,
    // Add these if your domain requires them

    hotelSlug: "royalty-place",
  } as Booking;

  // 3. Full Mock PaymentIntent (Must match the PaymentIntent Interface)
  const paymentIntent: PaymentIntent = {
    paymentIntentId: paymentIntentId || "pi_456",
    bookingId: "bk_123",
    amount: 50000,
    currency: "NGN",
    status: "REQUIRES_PAYMENT",
    provider: "flutterwave", // Crucial: verifyPayment needs this to find the provider
  } as PaymentIntent;

  // 4. FIXED: Verify - Pass the correct variable to the correct key
  const verification = await verifyPayment({
    paymentIntent: paymentIntent,
    paymentProviderId: providerPaymentId, // 👈 providerPaymentId (from body) goes into paymentProviderId (the param)
  });

  // 5. FIXED: Finalize - Ensure keys match what finalizePayment expects
  const result = finalizePayment({
    booking: booking,
    paymentIntent: paymentIntent,
    verified: verification.verified,
  });

  // 6. FIXED: Receipt
  if (result.booking && result.booking.status === "CONFIRMED") {
    GenerateReceipt({
      booking: result.booking as Booking,
      hotelName: "Royalty Place",
      location: "Ikeja, Lagos",
    });
  }

  return Response.json({
    status: result.booking.status,
    bookingId: result.booking.bookingId,
    verified: verification.verified,
  });
}

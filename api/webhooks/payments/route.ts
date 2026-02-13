import { Booking } from "../../../core/domain/booking";
import { PaymentIntent } from "../../../core/domain/paymentIntent";
import { ComposeApp } from "../../../core/config/compose";
import { FinalizePaymentFlowAndPersists } from "../../../core/services/FinalizePaymentFlowAndPersist";

export async function POST(req: Request) {
  const body = await req.json();
  const now = new Date().toISOString();

  // 1. Dependency Injection via Composition Root
  const { repositories } = ComposeApp();

  // 2. Extraction
  const { paymentIntentId, providerPaymentId } = body;

  // 3. Domain Entities (Mocks for now)
  const booking: Booking = {
    bookingId: "bk_123",
    hotelId: "hotel_abc",
    totalAmount: 50000,
    currency: "NGN",
    status: "PAYMENT_PENDING",
    checkInDate: "2026-03-01",
    checkOutDate: "2026-03-05",
    rooms: 1,
    guests: 2,
    hotelSlug: "royalty-place",
    updatedAt: now,
    createdAt: now,
    timeline: [
      { status: "PAYMENT_PENDING", at: now, reason: "Initial creation" },
    ],
  } as Booking;

  const paymentIntent: PaymentIntent = {
    paymentIntentId: paymentIntentId || "pi_456",
    bookingId: "bk_123",
    amount: 50000,
    currency: "NGN",
    status: "REQUIRES_PAYMENT",
    provider: "flutterwave",
  } as PaymentIntent;

  const result = await FinalizePaymentFlowAndPersists({
    booking,
    paymentIntent,
    paymentProviderId: providerPaymentId,
    bookingRepository: repositories.bookingRepository,
    paymentIntentRepository: repositories.paymentIntentRepository,
    receiptRepository: repositories.receiptRepository,
  });

  // 8. RESPONSE
  return Response.json({
    status: result.booking.status,
    bookingId: result.booking.bookingId,
    verified: result.verified,
  });
}

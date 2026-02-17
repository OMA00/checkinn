import { ComposeApp } from "../../../core/config/compose";
import { DispatchEvent } from "../../../core/domain/events/dispatchEvents";

import { FinalizePayment } from "../../../core/services/finalizePayment";
import { FinalizeAndPersistPayments } from "../../../core/services/finalizeAndPersistPayment";

export async function POST(req: Request) {
  const body = await req.json();

  const { bookingId, paymentIntentId, providerPaymentId } = body;

  const app = ComposeApp();
  const { bookingRepository, paymentIntentRepository } = app.repositories;

  // These are retrieved earlier in the flow
  const booking = await bookingRepository.findById(bookingId);
  const paymentIntent = await paymentIntentRepository.findById(paymentIntentId);

  const verified = true; // comes from provider verification
  if (!booking || !paymentIntent) {
    return Response.json(
      {
        error: "Resources not found",
        details: { booking: !!booking, paymentIntent: !!paymentIntent },
      },
      { status: 404 },
    );
  }

  // CORE FLOW
  const result = FinalizePayment({
    booking,
    paymentIntent,
    verified,
  });

  const persisted = await FinalizeAndPersistPayments({
    result,
    bookingRepository,
    paymentIntentRepository,
  });
  for (const event of persisted.events) {
    // We cast the type so TS knows it's a valid key of eventHandlers
    const type = event.type as keyof typeof app.eventHandlers;
    const handlers = app.eventHandlers[type] || [];

    await DispatchEvent(event, handlers);
  }

  return Response.json({
    bookingId: persisted.data.booking.bookingId,
    status: persisted.data.booking.status,
  });
}

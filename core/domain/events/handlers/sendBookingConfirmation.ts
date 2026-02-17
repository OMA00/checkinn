import { EventHandler } from "../eventHandler";
import { BookingConfirmedEvent } from "../bookingConfirmed";

export class SendBookingConfirmationHandler implements EventHandler<BookingConfirmedEvent> {
  async handle(event: BookingConfirmedEvent) {
    //side Efect only
    console.log(`Sending Confirmation for Booking${event.payload.bookingId}`);
  }
}

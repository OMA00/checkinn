import { InMemoryBookingRepository } from "../repositories/inMemory/inMemoryBookingRepository";
import { InMemoryHotelRepository } from "../repositories/inMemory/inMemoryHotelRepository";
import { InMemoryPaymentIntentRepository } from "./../repositories/inMemory/inMemoryPaymentIntentRepository";
import { InMemoryReceiptRepository } from "../repositories/inMemory/inMemoryReceiptRepository";
import { SendBookingConfirmationHandler } from "../domain/events/handlers/sendBookingConfirmation";
import { MOCK_HOTELS } from "../domain/mockHotels";
import { InMemoryHoldRepository } from "../repositories/inMemory/inMemoryHoldRepository";

const BookingConfirmedHadlers = [new SendBookingConfirmationHandler()];

export function ComposeApp() {
  const hotelRepository = new InMemoryHotelRepository(MOCK_HOTELS);
  const bookingRepository = new InMemoryBookingRepository();
  const paymentIntentRepository = new InMemoryPaymentIntentRepository();
  const receiptRepository = new InMemoryReceiptRepository();
  const holdRepository = new InMemoryHoldRepository();

  return {
    repositories: {
      hotelRepository,
      bookingRepository,
      paymentIntentRepository,
      holdRepository,
      receiptRepository,
    },
    eventHandlers: {
      BOOKING_CONFIRMED: BookingConfirmedHadlers,
    },
  };
}

import { InMemoryBookingRepository } from "../repositories/inMemory/inMemoryBookingRepository";
import { InMemoryHotelRepository } from "../repositories/inMemory/inMemoryHotelRepository";
import { InMemoryPaymentIntentRepository } from "./../repositories/inMemory/inMemoryPaymentIntentRepository";
import { InMemoryReceiptRepository } from "../repositories/inMemory/inMemoryReceiptRepository";

import { MOCK_HOTELS } from "../domain/mockHotels";

export function ComposeApp() {
  const hotelRepository = new InMemoryHotelRepository(MOCK_HOTELS);
  const bookingRepository = new InMemoryBookingRepository();
  const paymentIntentRepository = new InMemoryPaymentIntentRepository();
  const receiptRepository = new InMemoryReceiptRepository();

  return {
    repositories: {
      hotelRepository,
      bookingRepository,
      paymentIntentRepository,
      receiptRepository,
    },
  };
}

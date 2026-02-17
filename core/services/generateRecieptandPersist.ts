import { ReceiptRepository } from "../repositories/receiptRepository";
import { GenerateReceipt } from "./generateReceipt";
import { Booking } from "../domain/booking";

export async function GenerateReceiptAndPersist(params: {
  booking: Booking;
  receiptRepository: ReceiptRepository;
  hotelName: string;
  location: string;
  providerReference: string;
}) {
  const existing = await params.receiptRepository.findByBookingId(
    params.booking.bookingId,
  );

  if (existing) {
    return existing;
  }

  const receipt = GenerateReceipt({
    booking: params.booking,
    hotelName: params.hotelName,
    location: params.location,
    providerReference: params.providerReference,
  });

  await params.receiptRepository.create(receipt);
  return receipt;
}

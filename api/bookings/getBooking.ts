import type { NextApiRequest, NextApiResponse } from "next"; // 👈 Use these!
import { ComposeApp } from "../../core/config/compose";
import { GetBookingById } from "../../core/services/queries/getBookingById";

export default async function GetBooking(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // 1. Next.js already types req.query, but we must ensure bookingId is a string
  const { bookingId } = req.query;

  // 2. Safety Check: query params can sometimes be arrays in Next.js
  const id = Array.isArray(bookingId) ? bookingId[0] : bookingId;

  if (!id) {
    return res.status(400).json({ error: "Booking ID is required" });
  }

  const { repositories } = ComposeApp();

  // 3. The Query Service
  const booking = await GetBookingById({
    bookingId: id,
    bookingRepository: repositories.bookingRepository,
  });

  // 4. The Type Guard (clears red lines for the JSON below)
  if (!booking) {
    return res.status(404).json({
      error: "Not found",
    });
  }

  // 5. Success
  return res.status(200).json(booking);
}

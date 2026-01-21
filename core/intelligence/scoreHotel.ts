import { Hotel } from "../domain/hotel";
import { HOTEL_WEIGHTS } from "./weights";

export function scoreHotel(hotel: Hotel): number {
  let score = 0;

  if (hotel.isVerified) {
    score += HOTEL_WEIGHTS.verified;
  }

  if (hotel.rating) {
    score += hotel.rating * HOTEL_WEIGHTS.ratingMultiplier;
  }

  if (hotel.priceFrom) {
    // Lower price = higher score (basic affordability logic)
    score +=
      Math.max(0, 100000 - hotel.priceFrom) / HOTEL_WEIGHTS.priceAffordability;
  }
  return Math.round(score);
}

import { Hotel } from "../domain/hotel";

type RankingContext = {
  price?: string;
  rating?: string;
  sort?: string;
};

export function rankHotels(
  hotels: Hotel[],
  context: RankingContext = {},
): Hotel[] {
  let ranked = [...hotels];

  // 1. Bias verified hotels first (always)
  ranked.sort((a, b) => Number(b.isVerified) - Number(a.isVerified));

  // 2. Rating bias
  if (context.rating) {
    const minRating = Number(context.rating);
    ranked = ranked.filter((h) => h.rating && h.rating >= minRating);
  }

  // 3. Price sorting
  if (context.sort === "price_asc") {
    ranked.sort((a, b) => (a.priceFrom ?? 0) - (b.priceFrom ?? 0));
  }

  if (context.sort === "price_desc") {
    ranked.sort((a, b) => (b.priceFrom ?? 0) - (a.priceFrom ?? 0));
  }

  // 4. Rating sorting
  if (context.sort === "rating_desc") {
    ranked.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  }

  return ranked;
}

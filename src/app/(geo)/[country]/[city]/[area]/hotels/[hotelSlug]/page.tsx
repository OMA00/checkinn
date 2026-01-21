import { notFound } from "next/navigation";
import { humanizeSlug } from "../../../../../../../../core/utils/humanizeSlug";
import { buildCanonicalUrl } from "../../../../../../../../core/seo/canonical";
import { MOCK_HOTELS } from "../../../../../../../../core/domain/mockHotels";
import { scoreHotel } from "../../../../../../../../core/intelligence/scoreHotel";
import { checkAvailability } from "../../../../../../../../core/services/checkAvailability";
import { Breadcrumbs } from "../../../../../../../../core/ui/BreadCrumbs";
import { BuildBreadCrumb } from "../../../../../../../../core/navigation/buildBreadCrumb";

// 1️⃣ In Next.js 15, params is a Promise
type Props = {
  params: Promise<{
    country: string;
    city: string;
    area: string;
    hotelSlug: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  // 2️⃣ Unwrapping the Promise for Google's Brain
  const { country, city, area, hotelSlug } = await params;

  const hotelName = humanizeSlug(hotelSlug);
  const canonical = buildCanonicalUrl({
    country,
    city,
    area,
    segment: "hotels",
    hotelSlug,
  });

  return {
    title: `${hotelName} | Verified Hotel in ${humanizeSlug(area)}, ${humanizeSlug(city)}`,
    description: `Book ${hotelName} in ${humanizeSlug(area)}. Verified hotel with instant WhatsApp confirmation.`,
    alternates: { canonical },
    openGraph: {
      title: hotelName,
      description: `Verified stay in ${humanizeSlug(area)}.`,
      images: [`/og/hotels/${hotelSlug}.jpg`],
    },
  };
}

export default async function HotelPage({ params }: Props) {
  // 3️⃣ Unwrapping the Promise for the UI
  const { country, city, area, hotelSlug } = await params;

  // 4️⃣ Resolve hotel from domain (Using the unwrapped slug)
  const hotel = MOCK_HOTELS.find((h) => h.slug === hotelSlug);
  console.log("Looking for:", hotelSlug);
  console.log(
    "Available slugs:",
    MOCK_HOTELS.map((h) => h.slug),
  );
  // 5️⃣ Graph safety (The Security Gate)
  if (!hotel) {
    notFound();
  }

  // 6️⃣ Build navigation for the UI
  const breadcrumbs = BuildBreadCrumb({
    country,
    city,
    area,
    hotelSlug,
  });

  // Intelligence scoring & State Pulse
  const scoredHotel = scoreHotel(hotel);
  const bookingState = checkAvailability(hotel);

  return (
    <main className="p-8">
      {/* The Digital Highway */}
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="text-3xl font-bold">{scoredHotel.name}</h1>

      <p className="mt-2 text-gray-600">
        Located in {humanizeSlug(area)}, {humanizeSlug(city)}
      </p>

      <p className="mt-2 text-yellow-600">⭐ {scoredHotel.rating} / 5</p>

      <p className="mt-4 text-xl font-semibold text-blue-600">
        {/* Use ? to check if it exists, and || 0 as a backup */}
        From ₦{(scoredHotel?.priceFrom || 0).toLocaleString()}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        CheckInn Score: {scoredHotel.score}
      </p>

      {/* The Transaction Logic Gate */}
      {bookingState === "AVAILABLE" ? (
        <button className="mt-6 px-6 py-3 rounded bg-black text-white hover:bg-green-600 transition-colors">
          Book via WhatsApp
        </button>
      ) : (
        <button
          className="mt-6 px-6 py-3 rounded bg-gray-300 text-gray-600 cursor-not-allowed"
          disabled
        >
          Not Available
        </button>
      )}
    </main>
  );
}

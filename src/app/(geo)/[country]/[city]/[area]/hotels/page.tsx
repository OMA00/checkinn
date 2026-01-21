import { humanizeSlug } from "../../../../../../../core/utils/humanizeSlug";
import { buildCanonicalUrl } from "../../../../../../../core/seo/canonical";
import { rankHotels } from "../../../../../../../core/intelligence/rankHotels";
import { MOCK_HOTELS } from "../../../../../../../core/domain/mockHotels";
import { HotelCard } from "../../../../../../../core/ui/hotel/hotelcard";

// 1️⃣ Next.js 15 requires Params and SearchParams to be Promises
type Props = {
  params: Promise<{
    country: string;
    city: string;
    area: string;
  }>;
  searchParams: Promise<{
    price?: string;
    rating?: string;
    sort?: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { country, city, area } = await params; // 👈 Unwrapping for Google

  const canonical = buildCanonicalUrl({
    country,
    city,
    area,
    segment: "hotels",
  });

  return {
    title: `Verified Hotels in ${humanizeSlug(area)}, ${humanizeSlug(city)} | CheckInn`,
    description: `Book trusted hotels in ${humanizeSlug(area)} with instant WhatsApp confirmation.`,
    alternates: { canonical },
  };
}

export default async function HotelsPage({ params, searchParams }: Props) {
  // 2️⃣ Unwrapping both Promises (Crucial for Next.js 15)
  const { country, city, area } = await params;
  const { price, rating, sort } = await searchParams;

  // 3️⃣ Intelligence: Filter hotels by the current Area
  const areaHotels = MOCK_HOTELS.filter((h) => h.area === area);

  // 4️⃣ Intelligence: Rank them using your scoring engine
  const rankedHotels = rankHotels(areaHotels);

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Hotels in {humanizeSlug(area)}
        </h1>
        <p className="text-gray-500 mt-2">
          {rankedHotels.length} Verified Properties in {humanizeSlug(city)},{" "}
          {humanizeSlug(country)}
        </p>
      </header>

      {/* 5️⃣ Active Filter UI */}
      {(price || rating || sort) && (
        <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-4">
          <span className="text-sm font-bold text-blue-800">
            FILTERS ACTIVE:
          </span>
          <div className="flex gap-2">
            {price && (
              <span className="px-3 py-1 bg-white rounded-full text-xs shadow-sm">
                Budget: {price}
              </span>
            )}
            {rating && (
              <span className="px-3 py-1 bg-white rounded-full text-xs shadow-sm">
                ⭐ {rating}+
              </span>
            )}
          </div>
        </div>
      )}

      {/* 6️⃣ The Grid of Reality (Hotel Entities) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rankedHotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            baseUrl={`/${country}/${city}/${area}/hotels`}
          />
        ))}
      </div>

      {rankedHotels.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed rounded-2xl">
          <p className="text-gray-400">
            No verified properties found in this area yet.
          </p>
        </div>
      )}
    </main>
  );
}

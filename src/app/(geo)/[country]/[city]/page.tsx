import { humanizeSlug } from "../../../../../core/utils/humanizeSlug";
import { buildCanonicalUrl } from "../../../../../core/seo/canonical";

// 1️⃣ Update: params is now a Promise
type Props = {
  params: Promise<{
    country: string;
    city: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  // 2️⃣ MUST await params first
  const { country, city } = await params;

  const hCountry = humanizeSlug(country);
  const hCity = humanizeSlug(city);

  return {
    title: `Hotels in ${hCity}, ${hCountry} | Book Trusted Stays on CheckInn`,
    description: `Explore verified hotels in ${hCity}, ${hCountry}. Compare prices and receive WhatsApp confirmation.`,
    alternates: {
      canonical: buildCanonicalUrl({
        country,
        city,
      }),
    },
    openGraph: {
      title: `Top Hotels in ${hCity}, ${hCountry} | CheckInn`,
      description: `Discover trusted hotels in ${hCity}. Instant booking and WhatsApp confirmation.`,
      images: [`/og/${country}/${city}-banner.jpg`],
    },
  };
}

// 3️⃣ Component must be 'async'
export default async function CityPage({ params }: Props) {
  // 4️⃣ Unwrap the data
  const { country, city } = await params;

  const displayCity = humanizeSlug(city);
  const displayCountry = humanizeSlug(country);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-900">
        Hotels in {displayCity}, {displayCountry}
      </h1>

      <p className="mt-4 text-lg text-slate-600 leading-relaxed">
        Welcome to the {displayCity} directory. We have verified the top-rated
        accommodations across all major districts in this city to ensure your
        stay is seamless.
      </p>

      {/* 5️⃣ Next Step for User: Explore Areas */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-slate-800 border-b pb-2 mb-6">
          Popular Areas in {displayCity}
        </h2>

        {/* Note: In a real scenario, you would map through your areas here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`/${country}/${city}/ikeja`}
            className="p-4 border rounded-xl hover:bg-slate-50 transition-colors flex justify-between items-center"
          >
            <span className="font-medium text-blue-600">Ikeja</span>
            <span className="text-slate-400 text-sm">Explore →</span>
          </a>
        </div>
      </div>
    </main>
  );
}

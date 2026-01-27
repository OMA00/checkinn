import { humanizeSlug } from "../../../../../../core/utils/humanizeSlug";
import { buildCanonicalUrl } from "../../../../../../core/seo/canonical";

// 1️⃣ Update: params is now a Promise in Next.js 15
type Props = {
  params: Promise<{
    country: string;
    city: string;
    area: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  // 2️⃣ MUST await params before using them
  const { country, city, area } = await params;

  const hCountry = humanizeSlug(country);
  const hCity = humanizeSlug(city);
  const hArea = humanizeSlug(area);

  return {
    title: `Hotels in ${hArea}, ${hCity} | Verified Stays on CheckInn`,
    description: `Book verified hotels in ${hArea}, ${hCity}. Close to top attractions and business hubs.`,
    alternates: {
      canonical: buildCanonicalUrl({
        country,
        city,
        area,
      }),
    },
    openGraph: {
      title: `Best Hotels in ${hArea}, ${hCity}`,
      description: `Discover trusted hotels in ${hArea}.`,
      images: [`/og/${city}-${area}-hotels.jpg`],
    },
  };
}

// 3️⃣ Component must be 'async' to allow 'await'
export default async function AreaPage({ params }: Props) {
  // 4️⃣ Unwrap the data for the UI
  const { country, city, area } = await params;

  const displayArea = humanizeSlug(area);
  const displayCity = humanizeSlug(city);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-slate-900">
        Hotels in {displayArea}, {displayCity}
      </h1>

      <p className="mt-4 text-lg text-slate-600 leading-relaxed">
        Find verified hotels in{" "}
        <span className="font-semibold">{displayArea}</span>. Perfect for
        business, leisure, and quick access to top spots in the {displayCity}{" "}
        metropolitan area.
      </p>

      {/* 5️⃣ Governor's Path: Direct link to the listing segment */}
      <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">
          Ready to explore?
        </h2>
        <a
          href={`/${country}/${city}/${area}/hotels`}
          className="inline-block px-8 py-4 bg-black text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg"
        >
          Browse All Hotels in {displayArea}
        </a>
      </div>
    </main>
  );
}

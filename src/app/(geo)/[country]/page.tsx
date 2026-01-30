import { humanizeSlug } from "../../../../core/utils/humanizeSlug";
import { buildCanonicalUrl } from "../../../../core/seo/canonical";

// 1️⃣ Update: params is a Promise in Next.js 15
type Props = {
  params: Promise<{
    country: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  // 2️⃣ MUST await params first!
  const { country } = await params;
  const hCountry = humanizeSlug(country);

  return {
    title: `Hotels in ${hCountry} | Book Trusted Stays on CheckInn`,
    description: `Discover verified hotels across ${hCountry}. Compare prices, book instantly and get WhatsApp confirmation.`,
    alternates: {
      canonical: buildCanonicalUrl({ country }),
    },
    openGraph: {
      title: `Verified Hotels in ${hCountry} | CheckInn`,
      description: `Book trusted hotels across ${hCountry} and get instant WhatsApp confirmation.`,
      images: [`/og/${country}-banner.jpg`],
    },
  };
}

// 3️⃣ Make the component 'async'
export default async function CountryPage({ params }: Props) {
  // 4️⃣ Unwrap the passport (params)
  const { country } = await params;
  const displayCountry = humanizeSlug(country);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Hotels in {displayCountry}
        </h1>
        <p className="mt-4 text-xl text-slate-600">
          Your gateway to verified, high-quality stays across {displayCountry}.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Top Cities</h2>

        {/* Mirror World Shortcut: Linking to your Lagos city hub */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href={`/${country}/lagos`}
            className="group p-6 border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <h3 className="text-lg font-bold group-hover:text-blue-700">
              Lagos
            </h3>
            <p className="text-sm text-slate-500">
              Explore the best hotels in {displayCountry} commercial capital.
            </p>
          </a>
        </div>
      </section>
    </main>
  );
}

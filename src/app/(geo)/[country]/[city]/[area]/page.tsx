import { humanizeSlug } from "../../../../../../core/utils/humanizeSlug";
import { buildCanonicalUrl } from "../../../../../../core/seo/canonical";

type Props = {
  params: {
    country: string;
    city: string;
    area: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const country = humanizeSlug(params.country);
  const city = humanizeSlug(params.city);
  const area = humanizeSlug(params.area);

  return {
    title: `Hotels in ${area}, ${city} | Verified Stays on CheckInn`,
    description: `Book verified hotels in ${area}, ${city}. Close to top attractions, business hubs, and nightlife. Instant WhatsApp confirmation.`,
    alternates: {
      canonical: buildCanonicalUrl({
        country: params.country,
        city: params.city,
        area: params.area,
      }),
    },
    openGraph: {
      title: `Best Hotels in ${area}, ${city}`,
      description: `Discover trusted hotels in ${area}. Great location, best prices, instant booking.`,
      images: [`/og/${city}-${area}-hotels.jpg`],
    },
  };
}

export default function AreaPage({ params }: Props) {
  const area = humanizeSlug(params.area);
  const city = humanizeSlug(params.city);

  return (
    <main>
      <h1>
        Hotels in {area},{city}.
      </h1>
      <p>
        Find verifed hotels in {area}.Perfect for Business, leisure, and quick
        access to top spots in the {city}.
      </p>
    </main>
  );
}

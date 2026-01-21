import Link from "next/link";
import { Hotel } from "../../domain/hotel";

type HotelCardProps = {
  hotel: Hotel;
};

export function HotelCard({ hotel }: HotelCardProps) {
  const { name, slug, area, city, country, rating, priceFrom, isVerified } =
    hotel;

  return (
    <li className="p-4 rounded-lg hover:shadow transition-all border border-transparent hover:border-gray-200">
      <Link
        href={`/${country}/${city}/${area}/hotels/${slug}`}
        className="block"
      >
        {/* Verification Badge at the Top */}
        <div className="flex justify-between items-start mb-2">
          {isVerified && (
            <span className="text-[10px] uppercase tracking-widest bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold border border-green-200">
              ✓ Verified
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">
          {area}, {city}
        </p>
        {rating && (
          <p className="mt-1 text-sm text-yellow-600 font-medium">
            ⭐ {rating} / 5
          </p>
        )}

        {priceFrom && (
          <p className="mt-2 font-medium text-blue-600">
            From ₦{priceFrom.toLocaleString()}
          </p>
        )}
      </Link>
    </li>
  );
}

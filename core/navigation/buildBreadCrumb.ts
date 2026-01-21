import { humanizeSlug } from "../utils/humanizeSlug";

type BreadcrumbParams = {
  country?: string;
  city?: string;
  area?: string;
  hotelSlug?: string;
};

export function BuildBreadCrumb({
  country,
  city,
  area,
  hotelSlug,
}: BreadcrumbParams) {
  const breadcrumbs = [];

  // Safety Check: If country exists, humanize it. If not, don't crash!
  if (country) {
    breadcrumbs.push({
      label: humanizeSlug(country),
      href: `/${country}`,
    });
  }

  if (city && country) {
    breadcrumbs.push({
      label: humanizeSlug(city),
      href: `/${country}/${city}`,
    });
  }

  if (area && city && country) {
    breadcrumbs.push({
      label: humanizeSlug(area),
      href: `/${country}/${city}/${area}`,
    });
  }

  if (hotelSlug && area && city && country) {
    breadcrumbs.push({
      label: humanizeSlug(hotelSlug),
      href: `/${country}/${city}/${area}/hotels/${hotelSlug}`,
    });
  }

  return breadcrumbs;
}

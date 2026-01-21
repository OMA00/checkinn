type CanonicalParams = {
  country?: string;
  city?: string;
  area?: string;
  hotelSlug?: string;
  segment?: string;
};

export function buildCanonicalUrl(params: CanonicalParams) {
  const base = "https://checkinn.tech"; //change to active url

  const parts = [
    "geo",
    params.country,
    params.city,
    params.area,
    params.hotelSlug ? "hotels" : null,
    params.hotelSlug,
  ].filter(Boolean);

  return `${base}/${parts.join("/")}`;
}

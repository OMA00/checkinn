export type Hotel = {
  id: string;
  name: string;
  slug: string;
  country: string;
  area: string;
  city: string;
  rating?: number;
  priceFrom?: number;

  images?: string[];
  isVerified: boolean;
  roomsAvailable: number;
};

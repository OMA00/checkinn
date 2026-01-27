import { Hotel } from "./hotel";

export const MOCK_HOTELS: Hotel[] = [
  {
    id: "1",
    name: "Royalty Place Hotel",
    slug: "royalty-place",
    country: "nigeria",
    city: "lagos",
    area: "ikeja",
    rating: 4.8,
    priceFrom: 45000,
    isVerified: true,
    roomsAvailable: 10,
  },
  {
    id: "2",
    name: "Elite Suites",
    slug: "elite-suites",
    country: "nigeria",
    city: "lagos",
    area: "ikeja",
    rating: 4.2,
    priceFrom: 30000,
    isVerified: false,
    roomsAvailable: 9,
  },
  {
    id: "3",
    name: "Prime Stay",
    slug: "prime-stay",
    country: "nigeria",
    city: "lagos",
    area: "ikeja",
    rating: 3.5,
    priceFrom: 15000,
    isVerified: true, // Will rank higher due to weights even if rating is lower
    roomsAvailable: 6,
  },
];

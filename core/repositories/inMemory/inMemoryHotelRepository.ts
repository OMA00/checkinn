import { Hotel } from "../../domain/hotel";
import { HotelRepository } from "../hotelRepositoty";

export class InMemoryHotelRepository implements HotelRepository {
  private hotels: Hotel[];

  constructor(hotels: Hotel[]) {
    this.hotels = hotels;
  }

  async findBySlug(params: {
    country: string;
    city: string;
    area: string;
    slug: string;
  }): Promise<Hotel | null> {
    return (
      this.hotels.find(
        (hotel) =>
          hotel.slug == params.slug &&
          hotel.city == params.city &&
          hotel.area == params.area &&
          hotel.country == params.country,
      ) || null
    );
  }

  async findByArea(params: {
    country: string;
    city: string;
    area: string;
  }): Promise<Hotel[]> {
    return this.hotels.filter(
      (hotel) =>
        hotel.country == params.country &&
        hotel.city == params.city &&
        hotel.area == params.area,
    );
  }
}

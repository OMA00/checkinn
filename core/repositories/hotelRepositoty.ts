import { Hotel } from "../domain/hotel";

export interface HotelRepository {
  findBySlug(params: {
    country: string;
    city: string;
    area: string;
    slug: string;
  }): Promise<Hotel | null>;

  findByArea(params: {
    country: string;
    city: string;
    area: string;
  }): Promise<Hotel[]>;
}

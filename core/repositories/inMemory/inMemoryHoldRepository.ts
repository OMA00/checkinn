import { Hold } from "../../domain/hold";
import { HoldRepository } from "../holdRepository";

export class InMemoryHoldRepository implements HoldRepository {
  private holds = new Map<string, Hold>();

  async create(hold: Hold): Promise<void> {
    this.holds.set(hold.holdId, hold);
  }
  async update(hold: Hold): Promise<void> {
    this.holds.set(hold.holdId, hold);
  }

  async findById(holdId: string): Promise<Hold | null> {
    return this.holds.get(holdId) ?? null;
  }

  async findActive(): Promise<Hold[]> {
    return Array.from(this.holds.values()).filter(
      (hold) => hold.status === "ACTIVE",
    );
  }

  async findByStatus(status: Booking["status"]): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.status === status,
    );
  }
}

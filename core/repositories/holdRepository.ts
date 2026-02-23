import { Hold } from "../domain/hold";

export interface HoldRepository {
  create(hold: Hold): Promise<void>;
  update(hold: Hold): Promise<void>;
  findById(hold: string): Promise<Hold | null>;
  findActive(): Promise<Hold[]>;
}

import { Hold } from "../domain/hold";

export function isHoldValid(hold: Hold): boolean {
  if (hold.state !== "HELD") return false;
  return Date.now() < hold.expiresAt;
}

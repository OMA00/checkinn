import { Hold } from "../domain/hold";

export function isHoldExpired(hold: Hold, now = new Date()): boolean {
  const expiresAt = new Date(hold.expiresAt).getTime();
  return now.getTime() > expiresAt;
}

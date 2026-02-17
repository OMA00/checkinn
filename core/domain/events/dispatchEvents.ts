import { DomainEvent } from "./domainEvent";
import { EventHandler } from "./eventHandler";

export async function DispatchEvent(
  event: DomainEvent<string, any>,
  handlers: EventHandler<any>[],
) {
  if (!handlers) return;
  for (const handler of handlers) {
    await handler.handle(event);
  }
}

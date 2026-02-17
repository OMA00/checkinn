import { DomainEvent } from "./domainEvent";

export interface EventHandler<T extends DomainEvent<string, any>> {
  handle(event: T): Promise<void>;
}

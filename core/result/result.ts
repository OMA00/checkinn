import { DomainEvent } from "../domain/events/domainEvent";

export type Result<T> = {
  data: T;
  events: DomainEvent<string, any>[];
};

export type DomainEvent<TType extends string, TPayload> = {
  type: TType;
  occuredAt: string;
  payload: TPayload;
};

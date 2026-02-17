export function assertTransition<T extends string>(
  from: T,
  to: T,
  allowed: Record<T, T[]>,
) {
  if (!allowed[from]?.includes(to)) {
    throw new Error(`Illegal Transition:${from} -> ${to}`);
  }
}

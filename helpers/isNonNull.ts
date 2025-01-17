export const isNonNull = <T>(value: T | null | undefined): value is T =>
  value !== null;

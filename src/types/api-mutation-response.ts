export interface ApiMutationResponse<T, P extends unknown[] = unknown[]> {
  mutate: (...args: P) => Promise<T | null>;
  loading: boolean;
  error: string | null;
}

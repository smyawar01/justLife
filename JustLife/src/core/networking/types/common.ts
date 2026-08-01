export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export type FetchOptions = {
  headers?: Record<string, string>;
  method?: 'GET' | 'POST';
};

import { useState, useEffect, useCallback } from 'react';

export interface UseSearchOptions<T> {
  searchFn: (query: string) => Promise<T[]>;
  debounceDelay?: number;
}

export interface UseSearchReturn<T> {
  query: string;
  setQuery: (text: string) => void;
  results: T[];
  isSearching: boolean;
  error: string | null;
  clear: () => void;
  isActive: boolean;
}

export function useSearch<T>({
  searchFn,
  debounceDelay = 500,
}: UseSearchOptions<T>): UseSearchReturn<T> {
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isActive = query.trim().length > 0;

  const setQuery = useCallback((text: string) => {
    setQueryState(text);
    if (!text.trim()) {
      setResults([]);
      setError(null);
      setIsSearching(false);
    }
  }, []);

  const clear = useCallback(() => {
    setQueryState('');
    setResults([]);
    setError(null);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    let isCancelled = false;
    setIsSearching(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        const data = await searchFn(query);
        if (!isCancelled) {
          setResults(data);
          setIsSearching(false);
          if (data.length === 0) {
            setError('No results found.');
          }
        }
      } catch (err: any) {
        if (!isCancelled) {
          setResults([]);
          setError(err?.message || 'Search failed');
          setIsSearching(false);
        }
      }
    }, debounceDelay);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [query, searchFn, debounceDelay]);

  return {
    query,
    setQuery,
    results,
    isSearching,
    error,
    clear,
    isActive,
  };
}

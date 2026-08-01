import { useSearch } from '@/features/shared/components/search/useSearch';
import { renderHook, act } from '@/core/testing/testUtils';

describe('useSearch Hook Unit Tests (Logic and State)', () => {
  const mockSearchFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(async () => {
    await act(async () => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });

  it('initializes with default empty and inactive state', async () => {
    const { result } = await renderHook(() => useSearch({ searchFn: mockSearchFn }));

    expect(result.current.query).toBe('');
    expect(result.current.results).toEqual([]);
    expect(result.current.isSearching).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isActive).toBe(false);
  });

  it('updates query and triggers debounced search successfully', async () => {
    mockSearchFn.mockResolvedValueOnce(['Result 1', 'Result 2']);
    const { result } = await renderHook(() => useSearch({ searchFn: mockSearchFn, debounceDelay: 300 }));

    await act(async () => {
      result.current.setQuery('apple');
    });

    expect(result.current.query).toBe('apple');
    expect(result.current.isActive).toBe(true);
    expect(result.current.isSearching).toBe(true);
    expect(mockSearchFn).not.toHaveBeenCalled();

    await act(async () => {
      jest.advanceTimersByTime(300);
      await Promise.resolve();
    });

    expect(mockSearchFn).toHaveBeenCalledWith('apple');
    expect(result.current.results).toEqual(['Result 1', 'Result 2']);
    expect(result.current.isSearching).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error state when search returns zero results', async () => {
    mockSearchFn.mockResolvedValueOnce([]);
    const { result } = await renderHook(() => useSearch({ searchFn: mockSearchFn, debounceDelay: 200 }));

    await act(async () => {
      result.current.setQuery('unknown');
    });

    await act(async () => {
      jest.advanceTimersByTime(200);
      await Promise.resolve();
    });

    expect(result.current.results).toEqual([]);
    expect(result.current.error).toBe('No results found.');
    expect(result.current.isSearching).toBe(false);
  });

  it('handles exceptions thrown by searchFn', async () => {
    mockSearchFn.mockRejectedValueOnce(new Error('Network failure'));
    const { result } = await renderHook(() => useSearch({ searchFn: mockSearchFn, debounceDelay: 200 }));

    await act(async () => {
      result.current.setQuery('fail-query');
    });

    await act(async () => {
      jest.advanceTimersByTime(200);
      await Promise.resolve();
    });

    expect(result.current.results).toEqual([]);
    expect(result.current.error).toBe('Network failure');
    expect(result.current.isSearching).toBe(false);
  });

  it('clears results and cancels searching when query is set to empty or whitespace', async () => {
    const { result } = await renderHook(() => useSearch({ searchFn: mockSearchFn }));

    await act(async () => {
      result.current.setQuery('   ');
    });

    expect(result.current.isActive).toBe(false);
    expect(result.current.results).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.isSearching).toBe(false);
  });

  it('clear() explicitly resets all state variables', async () => {
    mockSearchFn.mockResolvedValueOnce(['Item']);
    const { result } = await renderHook(() => useSearch({ searchFn: mockSearchFn, debounceDelay: 100 }));

    await act(async () => {
      result.current.setQuery('active');
    });

    await act(async () => {
      jest.advanceTimersByTime(100);
      await Promise.resolve();
    });

    expect(result.current.results).toEqual(['Item']);

    await act(async () => {
      result.current.clear();
    });

    expect(result.current.query).toBe('');
    expect(result.current.results).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.isActive).toBe(false);
  });
});

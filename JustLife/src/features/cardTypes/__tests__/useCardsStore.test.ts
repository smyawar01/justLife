import { useCardsStore } from '@/features/cardTypes/store/useCardsStore';
import * as cardsApi from '@/features/cardTypes/cardsApi/cardsApi';

jest.mock('@/features/cardTypes/cardsApi/cardsApi', () => ({
  fetchCards: jest.fn(),
  searchCardBySlug: jest.fn(),
}));

describe('useCardsStore (Card Types List logic)', () => {
  const mockFetchCards = cardsApi.fetchCards as jest.MockedFunction<typeof cardsApi.fetchCards>;

  beforeEach(() => {
    jest.clearAllMocks();
    useCardsStore.setState({
      cards: [],
      uniqueCardsByType: [],
      isLoading: false,
      error: null,
    });
  });

  it('initializes with empty state', () => {
    const state = useCardsStore.getState();
    expect(state.cards).toEqual([]);
    expect(state.uniqueCardsByType).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('loadCards populates cards and filters uniqueCardsByType case-insensitively', async () => {
    mockFetchCards.mockResolvedValueOnce({
      cards: [
        { cardId: '1', name: 'Spell One', type: 'Spell' },
        { cardId: '2', name: 'Minion One', type: 'Minion' },
        { cardId: '3', name: 'Spell Two', type: 'spell' }, // Duplicate type with different case
        { cardId: '4', name: 'Weapon One', type: 'Weapon' },
      ],
      error: null,
    });

    await useCardsStore.getState().loadCards();

    const state = useCardsStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.cards).toHaveLength(4);
    // Should filter out duplicate 'spell' type, leaving 3 unique types
    expect(state.uniqueCardsByType).toHaveLength(3);
    expect(state.uniqueCardsByType.map((c) => c.type)).toEqual(['Spell', 'Minion', 'Weapon']);
  });

  it('handles error when fetchCards fails', async () => {
    mockFetchCards.mockResolvedValueOnce({
      cards: [],
      error: 'Failed to load from API',
    });

    await useCardsStore.getState().loadCards();

    const state = useCardsStore.getState();
    expect(state.isLoading).toBe(false);
    expect(state.cards).toEqual([]);
    expect(state.uniqueCardsByType).toEqual([]);
    expect(state.error).toBe('Failed to load from API');
  });
});

import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { CardTypesScreen } from '@/features/cardTypes/screens/CardTypesScreen';
import { ThemeProvider } from '@/core/theme';
import { useCardsStore } from '@/features/cardTypes/store/useCardsStore';

jest.mock('@/features/cardTypes/cardsApi/cardsApi', () => ({
  fetchCards: jest.fn().mockResolvedValue({
    cards: [
      { cardId: '1', name: 'Fireball', type: 'Spell', rarity: 'Free' },
      { cardId: '2', name: 'Yeti', type: 'Minion', rarity: 'Common' },
    ],
    error: null,
  }),
  searchCardBySlug: jest.fn().mockResolvedValue({ card: null, error: null }),
}));

describe('CardTypesScreen Unit Test (Card Types List UI)', () => {
  const mockNavigate = jest.fn();
  const mockNavigation = { navigate: mockNavigate } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    useCardsStore.setState({
      cards: [],
      uniqueCardsByType: [
        { cardId: '1', name: 'Fireball', type: 'Spell' },
        { cardId: '2', name: 'Yeti', type: 'Minion' },
      ],
      isLoading: false,
      error: null,
    });
  });

  it('renders card types list and navigates on tile press', async () => {
    let tree: renderer.ReactTestRenderer;
    await act(async () => {
      tree = renderer.create(
        <ThemeProvider>
          <CardTypesScreen navigation={mockNavigation} route={{} as any} />
        </ThemeProvider>
      );
    });

    const instance = tree!.root;
    expect(instance.findByProps({ testID: 'header-container' })).toBeTruthy();
    expect(instance.findByProps({ testID: 'search-bar-container' })).toBeTruthy();

    // Verify unique card tiles are present
    const tile1 = instance.findByProps({ testID: 'card-tile-1' });
    expect(tile1).toBeTruthy();
    const tile2 = instance.findByProps({ testID: 'card-tile-2' });
    expect(tile2).toBeTruthy();

    // Trigger press on first tile and assert navigation to CardListScreen
    act(() => {
      tile1.props.onPress();
    });

    expect(mockNavigate).toHaveBeenCalledWith('CardListScreen', { type: 'Spell' });
  });
});

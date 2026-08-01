import React from 'react';
import { CardTypesScreen } from '@/features/cardTypes/screens/CardTypesScreen';
import { useCardsStore } from '@/features/cardTypes/store/useCardsStore';
import { renderWithTheme, fireEvent, waitFor } from '@/core/testing/testUtils';

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
    const { getByTestId } = await renderWithTheme(
      <CardTypesScreen navigation={mockNavigation} route={{} as any} />
    );

    expect(getByTestId('header-container')).toBeTruthy();
    expect(getByTestId('search-bar-container')).toBeTruthy();

    await waitFor(() => {
      expect(getByTestId('card-tile-1')).toBeTruthy();
      expect(getByTestId('card-tile-2')).toBeTruthy();
    });

    const tile1 = getByTestId('card-tile-1');
    await fireEvent.press(tile1);

    expect(mockNavigate).toHaveBeenCalledWith('CardListScreen', { type: 'Spell' });
  });
});

import React from 'react';
import { CardListScreen } from '@/features/cardList/screens/CardListScreen';
import { useCardsStore } from '@/features/cardTypes/store/useCardsStore';
import { renderWithTheme, fireEvent, act } from '@/core/testing/testUtils';

describe('CardListScreen Unit Test', () => {
  const mockGoBack = jest.fn();
  const mockNavigation = { goBack: mockGoBack } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    useCardsStore.setState({
      cards: [
        { cardId: '1', name: 'Fireball', type: 'Spell', rarity: 'Free' },
        { cardId: '2', name: 'Frostbolt', type: 'Spell', rarity: 'Common' },
        { cardId: '3', name: 'Yeti', type: 'Minion', rarity: 'Common' },
      ],
      uniqueCardsByType: [],
      isLoading: false,
      error: null,
    });
  });

  afterEach(async () => {
    await act(async () => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });

  it('renders only cards matching the requested route param type', async () => {
    const mockRoute = { params: { type: 'Spell' } } as any;
    const { getByTestId, queryByTestId } = await renderWithTheme(
      <CardListScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(getByTestId('card-tile-1')).toBeTruthy();
    expect(getByTestId('card-tile-2')).toBeTruthy();
    expect(queryByTestId('card-tile-3')).toBeNull();
  });

  it('triggers navigation.goBack() when back button is pressed', async () => {
    const mockRoute = { params: { type: 'Spell' } } as any;
    const { getByTestId } = await renderWithTheme(
      <CardListScreen navigation={mockNavigation} route={mockRoute} />
    );

    const backButton = getByTestId('header-back-button');
    await fireEvent.press(backButton);
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('displays empty list message when no cards match the type', async () => {
    const mockRoute = { params: { type: 'Weapon' } } as any;
    const { getByTestId, queryByTestId, getByText } = await renderWithTheme(
      <CardListScreen navigation={mockNavigation} route={mockRoute} />
    );

    expect(queryByTestId('card-tile-1')).toBeNull();
    expect(queryByTestId('card-tile-3')).toBeNull();
    expect(getByTestId('empty-list-message')).toBeTruthy();
    expect(getByText('No cards found for type: Weapon')).toBeTruthy();
  });
});

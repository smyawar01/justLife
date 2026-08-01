import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { CardListScreen } from '@/features/cardList/screens/CardListScreen';
import { ThemeProvider } from '@/core/theme';
import { useCardsStore } from '@/features/cardTypes/store/useCardsStore';

describe('CardListScreen Unit Test', () => {
  const mockGoBack = jest.fn();
  const mockNavigation = { goBack: mockGoBack } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    act(() => {
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
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders only cards matching the requested route param type', () => {
    const mockRoute = { params: { type: 'Spell' } } as any;
    let tree: renderer.ReactTestRenderer;

    act(() => {
      tree = renderer.create(
        <ThemeProvider>
          <CardListScreen navigation={mockNavigation} route={mockRoute} />
        </ThemeProvider>
      );
    });

    const instance = tree!.root;

    // Both Spell cards should be present
    expect(instance.findByProps({ testID: 'card-tile-1' })).toBeTruthy();
    expect(instance.findByProps({ testID: 'card-tile-2' })).toBeTruthy();

    // The Minion card should NOT be rendered
    expect(() => instance.findByProps({ testID: 'card-tile-3' })).toThrow();

    act(() => {
      tree!.unmount();
    });
  });

  it('triggers navigation.goBack() when back button is pressed', () => {
    const mockRoute = { params: { type: 'Spell' } } as any;
    let tree: renderer.ReactTestRenderer;

    act(() => {
      tree = renderer.create(
        <ThemeProvider>
          <CardListScreen navigation={mockNavigation} route={mockRoute} />
        </ThemeProvider>
      );
    });

    const instance = tree!.root;
    const backButton = instance.findByProps({ testID: 'header-back-button' });
    expect(backButton).toBeTruthy();

    act(() => {
      backButton.props.onPress();
    });

    expect(mockGoBack).toHaveBeenCalledTimes(1);

    act(() => {
      tree!.unmount();
    });
  });

  it('displays empty list message when no cards match the type', () => {
    const mockRoute = { params: { type: 'Weapon' } } as any;
    let tree: renderer.ReactTestRenderer;

    act(() => {
      tree = renderer.create(
        <ThemeProvider>
          <CardListScreen navigation={mockNavigation} route={mockRoute} />
        </ThemeProvider>
      );
    });

    const instance = tree!.root;
    expect(() => instance.findByProps({ testID: 'card-tile-1' })).toThrow();
    expect(() => instance.findByProps({ testID: 'card-tile-3' })).toThrow();

    const emptyMsg = instance.findByProps({ testID: 'empty-list-message' });
    expect(emptyMsg.props.children).toEqual(['No cards found for type: ', 'Weapon']);

    act(() => {
      tree!.unmount();
    });
  });
});

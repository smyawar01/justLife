import { create } from 'zustand';
import { HearthstoneCard } from '../types/cards.types';
import { fetchCards } from '../cardsApi/cardsApi';

export interface CardsState {
  cards: HearthstoneCard[];
  uniqueCardsByType: HearthstoneCard[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadCards: () => Promise<void>;
}

export const useCardsStore = create<CardsState>((set) => ({
  cards: [],
  uniqueCardsByType: [],
  isLoading: false,
  error: null,

  loadCards: async () => {
    set({ isLoading: true, error: null });
    try {
      const { cards, error } = await fetchCards();
      const seenTypes = new Set<string>();
      const uniqueCardsByType: HearthstoneCard[] = [];

      for (const card of cards) {
        if (card.type && !seenTypes.has(card.type.toLowerCase())) {
          seenTypes.add(card.type.toLowerCase());
          uniqueCardsByType.push(card);
        }
      }

      set({ cards, uniqueCardsByType, isLoading: false, error });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.message || 'Failed to load cards',
      });
    }
  },
}));

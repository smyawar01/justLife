import { create } from 'zustand';
import { HearthstoneCard } from '@/features/cardTypes/types/cards.types';
import { fetchCards } from '@/features/cardTypes/cardsApi/cardsApi';
import { getUniqueCardsByType } from '@/features/cardTypes/utils/cardUtils';

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
      const uniqueCardsByType = getUniqueCardsByType(cards);
      set({ cards, uniqueCardsByType, isLoading: false, error });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err?.message || 'Failed to load cards',
      });
    }
  },
}));

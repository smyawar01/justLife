import { create } from 'zustand';
import { HearthstoneCard } from '@/features/cardTypes/types/cards.types';
import { fetchCards, searchCardBySlug } from '@/features/cardTypes/cardsApi/cardsApi';

export interface CardsState {
  cards: HearthstoneCard[];
  uniqueCardsByType: HearthstoneCard[];
  isLoading: boolean;
  error: string | null;
  
  // Search state
  searchQuery: string;
  isSearching: boolean;
  searchResults: HearthstoneCard[];
  searchError: string | null;

  // Actions
  loadCards: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  searchBySlug: (query: string) => Promise<void>;
  clearSearch: () => void;
}

export const useCardsStore = create<CardsState>((set, get) => ({
  cards: [],
  uniqueCardsByType: [],
  isLoading: false,
  error: null,

  searchQuery: '',
  isSearching: false,
  searchResults: [],
  searchError: null,

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

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    if (!query.trim()) {
      set({ searchResults: [], searchError: null, isSearching: false });
    }
  },

  searchBySlug: async (query: string) => {
    if (!query.trim()) {
      set({ isSearching: false, searchResults: [], searchError: null });
      return;
    }
    set({ isSearching: true, searchError: null });
    try {
      const { card, error } = await searchCardBySlug(query);
      if (error || !card) {
        set({
          isSearching: false,
          searchResults: [],
          searchError: error || 'No matching card found.',
        });
      } else {
        set({
          isSearching: false,
          searchResults: [card],
          searchError: null,
        });
      }
    } catch (err: any) {
      set({
        isSearching: false,
        searchResults: [],
        searchError: err?.message || 'Failed to search card',
      });
    }
  },

  clearSearch: () => {
    set({ searchQuery: '', searchResults: [], searchError: null, isSearching: false });
  },
}));

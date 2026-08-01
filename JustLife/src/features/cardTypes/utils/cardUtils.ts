import { HearthstoneCard } from '@/features/cardTypes/types/cards.types';

export const RARITY_COLORS: Record<string, string> = {
  Free: '#64748B',
  Common: '#94A3B8',
  Rare: '#3B82F6',
  Epic: '#A855F7',
  Legendary: '#F59E0B',
};

export const getRarityColor = (rarity?: string, fallbackColor: string = '#64748B'): string => {
  if (!rarity) return fallbackColor;
  return RARITY_COLORS[rarity] || fallbackColor;
};

export const getUniqueCardsByType = (cards: HearthstoneCard[]): HearthstoneCard[] => {
  const seenTypes = new Set<string>();
  const uniqueCards: HearthstoneCard[] = [];

  for (const card of cards) {
    if (card.type && !seenTypes.has(card.type.toLowerCase())) {
      seenTypes.add(card.type.toLowerCase());
      uniqueCards.push(card);
    }
  }

  return uniqueCards;
};

export const filterCardsByType = (cards: HearthstoneCard[], type: string): HearthstoneCard[] => {
  if (!type) return cards;
  const lowerType = type.toLowerCase();
  return cards.filter(
    (card) => (card.type || card.name)?.toLowerCase() === lowerType
  );
};

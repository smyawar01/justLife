export type CardRarityFilter = string;

export interface HearthstoneCard {
  cardId: string;
  slug?: string;
  name: string;
  rarity?: CardRarityFilter;
  text?: string;
  img?: string;
  type?: string;
}

export interface RawCardItem {
  id?: string | number;
  cardId?: string;
  slug?: string;
  name?: string;
  text?: string;
  image?: string;
  img?: string;
  rarity?: { name?: string; slug?: string; [key: string]: any } | string;
  type?: { name?: string; slug?: string; [key: string]: any } | string;
}

export interface CardsApiResponse {
  cards?: RawCardItem[];
  cardCount?: number;
  pageCount?: number;
  page?: string | number;
}

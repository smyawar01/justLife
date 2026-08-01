import { httpGet } from '@/core/networking/httpClient';
import { HearthstoneCard, RawCardItem, CardsApiResponse } from '@/features/cardTypes/types/cards.types';

export async function fetchCards(): Promise<{ cards: HearthstoneCard[]; error: string | null }> {
  const response = await httpGet<CardsApiResponse | RawCardItem[]>(
    '/cards',
    { params: { page: 1, pageSize: 100 } }
  );

  if (response.error || !response.data) {
    return {
      cards: [],
      error: response.error || 'Failed to fetch cards',
    };
  }

  let rawList: any[] = [];
  if (Array.isArray(response.data)) {
    rawList = response.data;
  } else if ('cards' in response.data && Array.isArray(response.data.cards)) {
    rawList = response.data.cards;
  }

  const allCards = rawList.map(parseCard);

  return {
    cards: allCards,
    error: null,
  };
}

function parseCard(raw: RawCardItem | any): HearthstoneCard {
  const rarityName =
    typeof raw?.rarity === 'object' ? raw.rarity?.name || raw.rarity?.slug : raw?.rarity;
  const typeName =
    typeof raw?.type === 'object' ? raw.type?.name || raw.type?.slug : raw?.type;

  let imageUrl = raw?.image || raw?.img;
  if (!imageUrl && raw?.slug) {
    imageUrl = `https://images.hearthstoneapi.com/enUS/${raw.slug}.png`;
  }

  return {
    cardId: String(raw?.cardId || raw?.id || raw?.slug || raw?.name || Math.random().toString()),
    slug: raw?.slug,
    name: raw?.name || 'Unnamed Card',
    rarity: rarityName,
    text: raw?.text,
    img: imageUrl,
    type: typeName,
  };
}
import { httpGet } from '@/core/networking/httpClient';
import { HearthstoneCard, RawCardItem, CardsApiResponse } from '@/features/cardTypes/types/cards.types';
import AppConfig from '@/config/AppConfig';

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

export async function searchCardBySlug(rawText: string): Promise<{ card: HearthstoneCard | null; error: string | null }> {
  const slug = rawText.trim().toLowerCase().replace(/\s+/g, '-');
  if (!slug) {
    return { card: null, error: null };
  }

  const response = await httpGet<RawCardItem | { error: string }>(`/cards/${slug}`);

  if (response.error || !response.data || ('error' in response.data && typeof response.data.error === 'string')) {
    return {
      card: null,
      error: response.error || (response.data && 'error' in response.data ? response.data.error : 'Card not found'),
    };
  }

  if ('name' in response.data || 'slug' in response.data || 'id' in response.data) {
    const card = parseCard(response.data as RawCardItem);
    return { card, error: null };
  }

  return { card: null, error: 'Card not found' };
}

function parseCard(raw: RawCardItem | any): HearthstoneCard {
  const rarityName =
    typeof raw?.rarity === 'object' ? raw.rarity?.name || raw.rarity?.slug : raw?.rarity;
  const typeName =
    typeof raw?.type === 'object' ? raw.type?.name || raw.type?.slug : raw?.type;

  let imageUrl = raw?.image || raw?.img;
  if (!imageUrl && raw?.slug) {
    const imageBaseUrl = AppConfig.IMAGE_BASE_URL;
    if (imageBaseUrl) {
      imageUrl = `${imageBaseUrl}/${raw.slug}.png`;
    }
  }

  return {
    cardId: String(raw?.cardId || Math.random().toString()),
    slug: raw?.slug,
    name: raw?.name || 'Unnamed Card',
    rarity: rarityName,
    text: raw?.text,
    img: imageUrl,
    type: typeName,
  };
}
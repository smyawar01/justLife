import { fetchCards, searchCardBySlug } from '@/features/cardTypes/cardsApi/cardsApi';
import { httpGet } from '@/core/networking/httpClient';

jest.mock('@/core/networking/httpClient', () => ({
  httpGet: jest.fn(),
}));

describe('cardsApi', () => {
  const mockHttpGet = httpGet as jest.MockedFunction<typeof httpGet>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCards', () => {
    it('returns formatted cards when API call is successful with array data', async () => {
      mockHttpGet.mockResolvedValueOnce({
        data: [
          { cardId: '1', name: 'Fireball', type: 'Spell', rarity: 'Free' },
          { cardId: '2', name: 'Yeti', type: 'Minion', rarity: { name: 'Common' }, img: 'http://example.com/yeti.png' },
        ],
        error: null,
        status: 200,
      });

      const result = await fetchCards();

      expect(mockHttpGet).toHaveBeenCalledWith('/cards', { params: { page: 1, pageSize: 100 } });
      expect(result.error).toBeNull();
      expect(result.cards).toHaveLength(2);
      expect(result.cards[0]).toEqual({
        cardId: '1',
        name: 'Fireball',
        type: 'Spell',
        rarity: 'Free',
        text: undefined,
        img: undefined,
        slug: undefined,
      });
      expect(result.cards[1].rarity).toBe('Common');
    });

    it('handles object response with cards property', async () => {
      mockHttpGet.mockResolvedValueOnce({
        data: {
          cards: [{ cardId: '3', name: 'Hero Power', type: { name: 'Power' } }],
        },
        error: null,
        status: 200,
      });

      const result = await fetchCards();
      expect(result.cards[0].type).toBe('Power');
    });

    it('returns error when httpGet fails', async () => {
      mockHttpGet.mockResolvedValueOnce({
        data: null,
        error: 'Network Error',
        status: 500,
      });

      const result = await fetchCards();
      expect(result.cards).toEqual([]);
      expect(result.error).toBe('Network Error');
    });
  });

  describe('searchCardBySlug', () => {
    it('returns formatted card when search by slug succeeds', async () => {
      mockHttpGet.mockResolvedValueOnce({
        data: {
          slug: 'a-light-in-the-darkness',
          name: 'A Light in the Darkness',
          type: 'Spell',
        },
        error: null,
        status: 200,
      });

      const result = await searchCardBySlug('  A Light in the Darkness  ');

      expect(mockHttpGet).toHaveBeenCalledWith('/cards/a-light-in-the-darkness');
      expect(result.error).toBeNull();
      expect(result.card?.name).toBe('A Light in the Darkness');
      expect(result.card?.img).toBe('https://images.hearthstoneapi.com/enUS/a-light-in-the-darkness.png');
    });

    it('returns null card and null error for empty input', async () => {
      const result = await searchCardBySlug('   ');
      expect(result.card).toBeNull();
      expect(result.error).toBeNull();
      expect(mockHttpGet).not.toHaveBeenCalled();
    });

    it('handles API errors during search', async () => {
      mockHttpGet.mockResolvedValueOnce({
        data: null,
        error: 'Card not found',
        status: 404,
      });

      const result = await searchCardBySlug('unknown-card');
      expect(result.card).toBeNull();
      expect(result.error).toBe('Card not found');
    });
  });
});

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { HearthstoneCard } from '../types/cards.types';
import { useTheme } from '../../../core/theme/useTheme';

export interface CardTileProps {
  card: HearthstoneCard;
  onPress?: () => void;
}

const RARITY_COLORS: Record<string, string> = {
  Free: '#64748B',
  Common: '#94A3B8',
  Rare: '#3B82F6',
  Epic: '#A855F7',
  Legendary: '#F59E0B',
};

export const CardTile: React.FC<CardTileProps> = ({ card, onPress }) => {
  const { colors } = useTheme();

  const rarityColor = (card.rarity && RARITY_COLORS[card.rarity]) || colors.textMuted;
  const cleanText = card.text ? card.text.replace(/<[^>]*>?/gm, '') : '';

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        {
          backgroundColor: colors.cardBackground,
          borderColor: colors.surfaceBorder,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
      testID={`card-tile-${card.cardId}`}
    >
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text style={[styles.cardName, { color: colors.text }]} numberOfLines={1}>
            {card.name}
          </Text>
        </View>

        {card.rarity ? (
          <View style={[styles.rarityBadge, { borderColor: rarityColor }]}>
            <Text style={[styles.rarityText, { color: rarityColor }]}>{card.rarity}</Text>
          </View>
        ) : null}
      </View>

      {card.img ? (
        <Image
          source={{ uri: card.img }}
          style={styles.cardImage}
          resizeMode="contain"
          testID={`card-image-${card.cardId}`}
        />
      ) : null}

      {cleanText ? (
        <Text style={[styles.cardText, { color: colors.text }]} numberOfLines={3}>
          {cleanText}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 14,
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardImage: {
    height: 140,
    width: '100%',
    marginVertical: 8,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
    marginVertical: 4,
  },
  rarityBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

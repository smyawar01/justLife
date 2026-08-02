import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { HearthstoneCard } from '@/features/cardTypes/types/cards.types';
import { useTheme } from '@/core/theme';
import { stripHtml } from '@/app/utils/textUtils';
import { getRarityColor } from '@/features/cardTypes/utils/cardUtils';

export interface CardTileProps {
  card: HearthstoneCard;
  onPress?: () => void;
}

const CardTileComponent: React.FC<CardTileProps> = ({ card, onPress }) => {
  const { colors } = useTheme();
  const [imageError, setImageError] = useState(false);

  const rarityColor = getRarityColor(card.rarity, colors.textMuted);
  const cleanText = useMemo(() => stripHtml(card.text), [card.text]);

  const accessibilityLabel = `${card.name}${card.rarity ? `, ${card.rarity} rarity` : ''}${
    card.type ? `, ${card.type}` : ''
  }`;

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
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={onPress ? 'Navigates to list of cards for this type' : undefined}
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

      {card.img && !imageError ? (
        <Image
          source={{ uri: card.img }}
          style={styles.cardImage}
          resizeMode="contain"
          onError={() => setImageError(true)}
          testID={`card-image-${card.cardId}`}
        />
      ) : card.img && imageError ? (
        <View style={[styles.placeholderContainer, { backgroundColor: colors.inputBackground }]}>
          <Text style={[styles.placeholderText, { color: colors.textMuted }]}>
            🖼️ Image Unavailable
          </Text>
        </View>
      ) : null}

      {cleanText ? (
        <Text style={[styles.cardText, { color: colors.text }]} numberOfLines={3}>
          {cleanText}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export const CardTile = React.memo(CardTileComponent);

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
  placeholderContainer: {
    height: 100,
    width: '100%',
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 12,
    fontWeight: '500',
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

import React, { useMemo } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { CardListScreenProps } from '../../../app/navigation/types';
import { useCardsStore } from '../../cardTypes/store/useCardsStore';
import { CardTile } from '../../cardTypes/components/CardTile';
import { Header } from '../../shared/components/Header';
import { useTheme } from '../../../core/theme/useTheme';
import { HearthstoneCard } from '../../cardTypes/types/cards.types';

export const CardListScreen: React.FC<CardListScreenProps> = ({ route, navigation }) => {
  const { type } = route.params;
  const { cards } = useCardsStore();
  const { colors } = useTheme();

  const filteredCards = useMemo(() => {
    return cards.filter(
      (card) => (card.type || card.name)?.toLowerCase() === type.toLowerCase()
    );
  }, [cards, type]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={`${type} Cards`}
        subtitle={`${filteredCards.length} cards`}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <FlatList<HearthstoneCard>
        data={filteredCards}
        keyExtractor={(item, index) => item.cardId || `${item.name}-${index}`}
        renderItem={({ item }) => <CardTile card={item} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              No cards found for type: {type}
            </Text>
          </View>
        }
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
  },
  listPadding: {
    paddingBottom: 20,
  },
});

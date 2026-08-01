import React, { useMemo, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { CardListScreenProps } from '@/app/navigation/types';
import { useCardsStore } from '@/features/cardTypes/store/useCardsStore';
import { CardTile } from '@/features/cardTypes/components';
import { Header } from '@/features/shared/components';
import { useTheme } from '@/core/theme';
import { HearthstoneCard } from '@/features/cardTypes/types/cards.types';
import { filterCardsByType } from '@/features/cardTypes/utils/cardUtils';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CardListScreen: React.FC<CardListScreenProps> = ({ route, navigation }) => {
  const { type } = route.params;
  const { cards } = useCardsStore();
  const { colors } = useTheme();

  const filteredCards = useMemo(() => {
    return filterCardsByType(cards, type);
  }, [cards, type]);

  const renderCardTile = useCallback(
    ({ item }: { item: HearthstoneCard }) => <CardTile card={item} />,
    []
  );

  const keyExtractor = useCallback(
    (item: HearthstoneCard, index: number) => item.cardId || `${item.name}-${index}`,
    []
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title={`${type} Cards`}
        subtitle={`${filteredCards.length} cards`}
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <FlatList<HearthstoneCard>
        data={filteredCards}
        keyExtractor={keyExtractor}
        renderItem={renderCardTile}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]} testID="empty-list-message">
              No cards found for type: {type}
            </Text>
          </View>
        }
        contentContainerStyle={styles.listPadding}
      />
    </SafeAreaView>
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

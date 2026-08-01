import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useCardsStore } from '@/features/cardTypes/store/useCardsStore';
import { CardTile } from '@/features/cardTypes/components';
import { Header, LoadingView, ErrorView } from '@/features/shared/components';
import { useTheme } from '@/core/theme';
import { HearthstoneCard } from '@/features/cardTypes/types/cards.types';
import { CardTypesScreenProps } from '@/app/navigation/types';

export const CardTypesScreen: React.FC<CardTypesScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const {
    uniqueCardsByType,
    isLoading,
    error,
    loadCards,
  } = useCardsStore();

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Cards By Type"
        subtitle={`${uniqueCardsByType.length} unique types`}
      />

      {isLoading ? (
        <LoadingView message="Loading cards..." />
      ) : error ? (
        <ErrorView message={error} onRetry={loadCards} />
      ) : (
        <FlatList<HearthstoneCard>
          data={uniqueCardsByType}
          keyExtractor={(item) => item.cardId || item.name}
          renderItem={({ item }) => (
            <CardTile
              card={item}
              onPress={() => {
                const cardType = item.type || item.name;
                navigation.navigate('CardListScreen', { type: cardType });
              }}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                No cards available.
              </Text>
            </View>
          }
          contentContainerStyle={styles.listPadding}
        />
      )}
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

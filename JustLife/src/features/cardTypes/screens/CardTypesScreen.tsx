import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useCardsStore } from '../store/useCardsStore';
import { CardTile } from '../components/CardTile';
import { Header } from '../../shared/components/Header';
import { LoadingView } from '../../shared/components/LoadingView';
import { ErrorView } from '../../shared/components/ErrorView';
import { useTheme } from '../../../core/theme/useTheme';
import { HearthstoneCard } from '../types/cards.types';
import { CardTypesScreenProps } from '../../../app/navigation/types';

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

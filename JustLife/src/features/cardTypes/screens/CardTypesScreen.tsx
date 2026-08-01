import React, { useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useCardsStore } from '@/features/cardTypes/store/useCardsStore';
import { searchCardBySlug } from '@/features/cardTypes/cardsApi/cardsApi';
import { CardTile } from '@/features/cardTypes/components';
import { Header, LoadingView, ErrorView, SearchBar, EmptySearchView, useSearch } from '@/features/shared/components';
import { useTheme } from '@/core/theme';
import { HearthstoneCard } from '@/features/cardTypes/types/cards.types';
import { CardTypesScreenProps } from '@/app/navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CardTypesScreen: React.FC<CardTypesScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const {
    uniqueCardsByType,
    isLoading,
    error,
    loadCards,
  } = useCardsStore();

  const handleSearchApi = useCallback(async (query: string) => {
    const { card, error: searchErr } = await searchCardBySlug(query);
    if (searchErr) throw new Error(searchErr);
    return card ? [card] : [];
  }, []);

  const search = useSearch<HearthstoneCard>({
    searchFn: handleSearchApi,
    debounceDelay: 500,
  });

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const listData = search.isActive ? search.results : uniqueCardsByType;

  const getSubtitle = () => {
    if (search.isActive) {
      if (search.isSearching) return 'Searching...';
      return `${search.results.length} search result${search.results.length === 1 ? '' : 's'}`;
    }
    return `${uniqueCardsByType.length} unique types`;
  };

  // Memoized renderItem to prevent function recreation on re-renders
  const renderCardTile = useCallback(
    ({ item }: { item: HearthstoneCard }) => (
      <CardTile
        card={item}
        onPress={() => {
          const cardType = item.type || item.name;
          navigation.navigate('CardListScreen', { type: cardType });
        }}
      />
    ),
    [navigation]
  );

  const keyExtractor = useCallback(
    (item: HearthstoneCard) => item.cardId || item.name,
    []
  );

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Cards By Type"
        subtitle={getSubtitle()}
      />

      <SearchBar
        value={search.query}
        onChangeText={search.setQuery}
        onClear={search.clear}
        placeholder="Search card by name or slug..."
      />

      {isLoading || search.isSearching ? (
        <LoadingView message={search.isSearching ? `Searching for "${search.query}"...` : "Loading cards..."} />
      ) : error && !search.isActive ? (
        <ErrorView message={error} onRetry={loadCards} />
      ) : search.isActive && (search.results.length === 0 || search.error) ? (
        <EmptySearchView
          query={search.query}
          title="No Card Found"
          message={`We couldn't find any card matching "${search.query}". Try searching by slug like "a-light-in-the-darkness".`}
          onClear={search.clear}
        />
      ) : (
        <FlatList<HearthstoneCard>
          data={listData}
          keyExtractor={keyExtractor}
          renderItem={renderCardTile}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews={true}
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

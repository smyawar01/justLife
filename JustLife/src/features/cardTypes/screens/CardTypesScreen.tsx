import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useCardsStore } from '@/features/cardTypes/store/useCardsStore';
import { CardTile, SearchBar, EmptySearchView } from '@/features/cardTypes/components';
import { Header, LoadingView, ErrorView } from '@/features/shared/components';
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
    searchQuery,
    isSearching,
    searchResults,
    searchError,
    setSearchQuery,
    searchBySlug,
    clearSearch,
  } = useCardsStore();

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const isSearchActive = searchQuery.trim().length > 0;
  const listData = isSearchActive ? searchResults : uniqueCardsByType;

  const getSubtitle = () => {
    if (isSearchActive) {
      if (isSearching) return 'Searching...';
      return `${searchResults.length} search result${searchResults.length === 1 ? '' : 's'}`;
    }
    return `${uniqueCardsByType.length} unique types`;
  };

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="Cards By Type"
        subtitle={getSubtitle()}
      />

      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={searchBySlug}
        onClear={clearSearch}
        placeholder="Search card by name or slug..."
      />

      {isLoading || isSearching ? (
        <LoadingView message={isSearching ? `Searching for "${searchQuery}"...` : "Loading cards..."} />
      ) : error && !isSearchActive ? (
        <ErrorView message={error} onRetry={loadCards} />
      ) : isSearchActive && (searchResults.length === 0 || searchError) ? (
        <EmptySearchView query={searchQuery} onClear={clearSearch} />
      ) : (
        <FlatList<HearthstoneCard>
          data={listData}
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

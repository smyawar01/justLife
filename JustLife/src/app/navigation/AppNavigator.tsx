import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { CardTypesScreen } from '../../features/cardTypes/screens/CardTypesScreen';
import { CardsByTypeScreen } from '../../features/cards/screens/CardsByTypeScreen';

export const AppNavigator: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <View style={[styles.container]}>
      {selectedType ? (
        <CardsByTypeScreen/>
      ) : (
        <CardTypesScreen/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

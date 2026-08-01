import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardListScreen } from '@/features/cardList/screens/CardListScreen';
import { CardTypesScreen } from '@/features/cardTypes/screens/CardTypesScreen';
import { RootStackParamList } from '@/app/navigation/types';
import { useTheme } from '@/core/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="CardTypesScreen"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="CardTypesScreen" component={CardTypesScreen} />
          <Stack.Screen name="CardListScreen" component={CardListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

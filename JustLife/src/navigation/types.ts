import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  CardTypesScreen: undefined;
  CardListScreen: { type: string };
};

export type CardTypesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CardTypesScreen'
>;

export type CardListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CardListScreen'
>;

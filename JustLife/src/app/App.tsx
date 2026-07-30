import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppNavigator } from './navigation/AppNavigator';

const MainApp: React.FC = () => {

  return (
    <SafeAreaView style={[styles.container]}>
      <AppNavigator />
    </SafeAreaView>
  );
};

export default function App() {
  return (
      <MainApp />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import 'react-native';

// Set test environment variables
process.env.API_BASE_URL = 'https://hearthstone11.p.rapidapi.com';
process.env.RAPIDAPI_HOST = 'hearthstone11.p.rapidapi.com';
process.env.RAPIDAPI_KEY = 'mock-test-api-key';
process.env.IMAGE_BASE_URL = 'https://images.hearthstoneapi.com/enUS';

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    SafeAreaProvider: ({ children }) => children,
    SafeAreaView: ({ children, style, ...props }) => React.createElement(View, { style, ...props }, children),
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

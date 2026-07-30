module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@core': './src/core',
          '@features': './src/features',
          '@theme': './src/core/theme',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};

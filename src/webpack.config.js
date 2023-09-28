const path = require('path');

module.exports = {
  // ... other webpack configuration settings ...
  module: {
    rules: [
      // Rule for processing CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    alias: {
      'react-native-maps': path.resolve(__dirname, '../node_modules/react-native-maps'), // For mobile
      // 'react-native-web-maps': path.resolve(__dirname, '../node_modules/react-native-web-maps'), // For web
      'react-native-web-maps': '@preflower/react-native-web-maps', // For web
      'react-native-maps-directions': path.resolve(__dirname, '../node_modules/react-native-maps-directions'), // For both
    },
  },
};
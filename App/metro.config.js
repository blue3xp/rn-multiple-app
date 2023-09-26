const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  projectRoot: path.resolve(__dirname, './dist'),
  watchFolders: [__dirname, path.resolve(__dirname, './dist')],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

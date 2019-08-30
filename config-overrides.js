/* jshint esversion: 6 */

const path = require('path');
const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
    config.resolve = {
        alias: {
            utils: path.resolve(__dirname, 'src/utils/'),
            config: path.resolve(__dirname, 'src/config/'),
            images: path.resolve(__dirname, 'src/assets/images'),
        }
    }
    if (env === 'production') {
        config.devtool = false;
    }
    config = injectBabelPlugin(["transform-decorators-legacy"], config);
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: "css" }], config);

    return config;
}
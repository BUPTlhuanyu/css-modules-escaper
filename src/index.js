const postcssEscapeKeyframe = require('./postcss-plugin');
const webpackCssModuleEscaperLoader = require('./loader');
const webpackCssModuleEscaperPlugin = require('./plugin');

webpackCssModuleEscaperLoader.postcssPlugin = postcssEscapeKeyframe;
webpackCssModuleEscaperLoader.prefixer = postcssEscapeKeyframe.__escapePrefix;
webpackCssModuleEscaperLoader.plugin = webpackCssModuleEscaperPlugin;

module.exports = webpackCssModuleEscaperLoader;

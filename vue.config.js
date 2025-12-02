// vue.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  chainWebpack: config => {
    // Cette section est généralement gérée par vue-cli-service,
    // mais nous la modifions en dernier recours.

    // Cible les fichiers CSS
    config.module.rule('css')
      .oneOf('normal')
      .use('extract-css-loader')
      .loader(MiniCssExtractPlugin.loader)
      .before('css-loader') 

    // Ajoutez explicitement le plugin
    config.plugin('extract-css')
      .use(MiniCssExtractPlugin, [{
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }]);
  }
};
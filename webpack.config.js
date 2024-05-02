const path = require('path');

module.exports = {
  entry: {
    index: './js/index.js',
    Game: './js/Game.js',
    Hero: './js/entities/Hero.js',
    Platform: './js/entities/Platform.js',
  },
  output: { 
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 8080,
    open: true,
  },
}
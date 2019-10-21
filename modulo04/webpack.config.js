const path = require('path');

module.exports = {
  //Arquivo de entrada para ser traduzido
  entry: path.resolve(__dirname, 'src', 'index.js'),

  //Arquivo gerado com a tradução do arquivo de entrada
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      //loader de arquivos JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};

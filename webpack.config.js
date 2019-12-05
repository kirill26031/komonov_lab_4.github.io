const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'js/main.js',
    },

	devServer: {
      inline: true,
      port: 8001
   },

	module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: "babel-loader"
                },               
                    
            },
            {
              test: /\.(sa|sc|c)ss$/,
              use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  'sass-loader',
              ],
              },
        ],
    },
    // ...previous Webpack config...
    plugins:[
      new HtmlWebpackPlugin({
         template: 'docs/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
    })
   ]
};
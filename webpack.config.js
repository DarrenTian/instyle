const webpack = require('webpack'); 
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  console.log(env);
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({ 
              fallback:'style-loader',
              use:['css-loader','sass-loader'],
          })
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PROD_ENV': JSON.stringify(env.PROD_ENV)
      }),
      new ExtractTextPlugin({filename:'styles.css'}),
    ]
  }
}

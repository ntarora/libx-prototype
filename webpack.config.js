 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './loader.js',
     output: {
         path: path.resolve('../libx/libx_unpacked_v2.0.17186/core/global/shared'),
         filename: 'bundle.js'
     },
     module: {
        rules: [{
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [{
            loader: 'babel-loader'
          }]
        },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }]
  },
     devtool: 'source-map',
     plugins: [
         new webpack.ProvidePlugin({
             $: "jquery",
             jQuery: "jquery"
         })
     ]
 };
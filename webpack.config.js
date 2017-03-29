 var path = require('path');
 var webpack = require('webpack');

 module.exports = {
     entry: './loader.js',
     output: {
         path: path.resolve(__dirname, 'build'),
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
const path = require('path');
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common');


module.exports = merge(commonConfig, {
   mode: 'development',
   devtool: 'inline-source-map',
   module: {
      rules: [
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         }
      ]
   },
   devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 8080,
      open: true,
      hot: true
   }
})
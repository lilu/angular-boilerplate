import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import common from './webpack.common';

const config: webpack.Configuration = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  devServer: {
    port: 4200,
    // publicPath: '/assets/',
    hot: true,
    historyApiFallback: true
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

export default merge(common, config);

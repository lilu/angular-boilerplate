import * as path from 'path';
import * as webpack from 'webpack';

import { AngularCompilerPlugin } from '@ngtools/webpack';
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  entry: {
    polyfills: './src/polyfills.ts',
    main: ['./src/styles.scss', './src/main.ts']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/assets/',
    filename: '[name].[hash].js'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: '@ngtools/webpack'
      },
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /[\/\\]@angular[\/\\]core[\/\\]fesm5[\/\\]core\.js$/,
        parser: { system: true }
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/app'),
        use: [
          'to-string-loader',
          'css-loader?sourceMap',
          'postcss-loader?sourceMap',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.scss$/,
        exclude: path.resolve(__dirname, 'src/app'),
        use: [
          'style-loader',
          'css-loader?sourceMap',
          'postcss-loader?sourceMap',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|otf|eot|ico)$/,
        loader: 'file-loader?name=[name].[hash].[ext]'
      }
    ]
  },

  plugins: [
    new AngularCompilerPlugin({
      tsConfigPath: 'src/tsconfig.app.json',
      entryModule: 'src/app/app.module#AppModule',
      sourceMap: true
    }),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunksSortMode: 'manual',
      chunks: ['polyfills', 'main']
    })
  ]
};

export default config;

const webpackBaseConfig = require('./webpack.config.base.cjs');
const { merge } = require('webpack-merge');
const { ModuleFederationPlugin } = require('webpack').container;
const CopyPlugin = require('copy-webpack-plugin');
const moduleFederationPluginOptions = require('./module-federation-plugin-options');
const fs = require('fs');
const path = require('path');
const process = require('process')
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'))
const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'manifest.json'), 'utf8'))
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
  console.log(env);
  return merge(webpackBaseConfig(), {
    mode: 'production',
    devtool: false,
    output: { publicPath: `/app/${pkg.name}/` },
    module:{
      rules:[
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: { presets: [['@babel/preset-env', {
              "useBuiltIns": "usage",
              "corejs": 3,
              "modules": false
            }]] } 
          },
          resolve: { fullySpecified: false }
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {}
            },
            require.resolve('css-loader'),
            require.resolve('postcss-loader'),
            {
              loader: require.resolve("sass-loader"),
              options: {
                implementation: require("sass"),
                sassOptions: {
                  outputStyle: 'expanded',
                  silenceDeprecations: ['legacy-js-api'],
                },
              },
            }
          ]
        }
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
            to: '' 
          }      
        ]
      }),
      new MiniCssExtractPlugin({ filename: 'assets/[name].[contenthash:8].css' }),
      new ModuleFederationPlugin({
        ...moduleFederationPluginOptions('production'),
        remoteType: 'module',
        remotes: {
          container: `promise import(window.location.origin+"/remoteEntry.js?_v="+ (window.__VERSION__? window.__VERSION__ : Date.now()))`,
          ...(Object.keys(manifest.dependencies).reduce((acc, module) => {
            acc[module] = `promise new Promise(window.__LOAD_MODULE_PROMISE__("${module}"))`;
            return acc;
          }, {}))
        } 
      })
    ]
  });
};
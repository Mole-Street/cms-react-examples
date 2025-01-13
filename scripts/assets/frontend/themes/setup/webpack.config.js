/* eslint-disable no-undef */
const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin');

// Define the project name
const projectName = '~replace_name~';

// Determines the output filename for JavaScript files
const outputJsFilename = (pathData) =>
  pathData.chunk.name.includes('.module') ? 'modules/[name]/module.js' : 'js/[name].js';

// Generate entry points for module JavaScript and SCSS files
const modulesEntryPoints = glob.sync('./src/modules/**.module/module.{jsx,scss}').reduce((filePaths, item) => {
  const moduleName = item.replace('./src/modules/', '').replace('module.jsx', '').replace('module.scss', '');

  if (!filePaths[moduleName]) {
    filePaths[moduleName] = [];
  }
  filePaths[moduleName].push(item);
  return filePaths;
}, {});

// Generate entry points for SCSS files
const styleEntryPoints = glob.sync('./src/scss/**.scss').reduce((filePaths, item) => {
  const fileName = item.replace('./src/scss/', '').replace('.scss', '');
  filePaths[fileName] = item;
  return filePaths;
}, {});

// Generate entry points for JavaScript files
const jsEntryPoints = glob.sync('./src/js/**.js').reduce((filePaths, item) => {
  const fileName = item.replace('./src/js/', '').replace('.js', '');
  filePaths[fileName] = item;
  return filePaths;
}, {});

// Export the Webpack configuration
module.exports = (env) => {
  // Environment variables for account and auto-upload settings
  const account = env.ACCOUNT || 'error';
  const autoupload = env.AUTOUPLOAD || true;

  console.log(`Uploading ${projectName} to ${account}`); // Logs the deployment target

  return {
    // Set the build mode and disable source maps
    mode: 'production',
    devtool: false,

    // Combine all entry points for modules, styles, and JavaScript
    entry: {
      ...modulesEntryPoints,
      ...styleEntryPoints,
      ...jsEntryPoints,
    },

    // Configure output settings
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: outputJsFilename,
      clean: true, // Cleans the output directory before each build
    },

    // Disable optimization/minimization for easier debugging
    optimization: {
      minimize: false,
    },

    // Define module rules for processing SCSS and JS files
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [
                    path.resolve(__dirname, 'src'), // Ensure that the 'src' directory is included for path resolution
                    path.resolve(__dirname, 'config/styles'), // Explicitly include the config/styles folder
                    path.resolve(__dirname, 'config/styles/mixins'), // Explicitly include the config/styles folder
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },

    // Add plugins for various tasks
    plugins: [
      // Automatically upload the build to HubSpot CMS
      new HubSpotAutoUploadPlugin({
        autoupload,
        account,
        src: 'dist',
        dest: projectName,
      }),

      // Copy static assets to the output directory
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, './src/templates'), to: 'templates' },
          {
            from: path.resolve(__dirname, './src/modules'),
            to: 'modules',
            globOptions: {
              ignore: ['**/module.jsx', '**/module.scss', '**/fields.js'],
            },
          },
          { from: path.resolve(__dirname, './src/theme.json'), to: 'theme.json' },
          {
            from: path.resolve(__dirname, './src/macros.html'),
            to: 'macros.html',
          },
        ],
      }),

      // Extract CSS into separate files
      new MiniCssExtractPlugin({
        filename: (pathData) => outputJsFilename(pathData).replace('.js', '.css').replace('js/', `css/`),
      }),

      // Remove empty scripts generated during the build
      new RemoveEmptyScriptsPlugin(),
    ],
  };
};

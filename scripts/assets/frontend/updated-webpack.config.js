// TODO: FINISH!, DO NOT USE
// NOTE: testing SCSS fix & reduce to 1 command in the terminal
const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const HubSpotAutoUploadPlugin = require('@hubspot/webpack-cms-plugins/HubSpotAutoUploadPlugin');
const { execSync } = require('child_process');

// Define the project name
const projectName = 'project-name';

// Determines the output filename for JavaScript and CSS files
const outputJsFilename = (pathData) => {
  const isModule = pathData.chunk.name.includes('.module');
  const isCSS = pathData.chunk.name.includes('scss');

  if (isModule) {
    return 'modules/[name]/module.js';
  } else if (isCSS) {
    return 'css/[name].css';
  } else {
    return 'js/[name].js';
  }
};

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
const styleEntryPoints = glob.sync('./src/scss/**/*.scss').reduce((filePaths, item) => {
  const fileName = path.basename(item, path.extname(item));
  filePaths[fileName] = item;
  return filePaths;
}, {});

// Generate entry points for JavaScript files
const jsEntryPoints = glob.sync('./src/js/**.js').reduce((filePaths, item) => {
  const fileName = item.replace('./src/js/', '').replace('.js', '');
  filePaths[fileName] = item;
  return filePaths;
}, {});

// Helper to compile fields.js into fields.json
const compileFields = () => {
  console.log('Compiling fields.js into fields.json...');
  try {
    execSync('npx hubspot-fields-js', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error compiling fields.js:', error);
    process.exit(1);
  }
};

module.exports = (env) => {
  const account = env.ACCOUNT || 'error';
  const autoupload = env.AUTOUPLOAD || true;

  console.log(`Uploading ${projectName} to ${account}`);

  // Run fields.js compilation before returning the Webpack configuration
  compileFields();

  return {
    mode: 'production',
    devtool: false,

    entry: {
      ...modulesEntryPoints,
      ...styleEntryPoints,
      ...jsEntryPoints,
    },

    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: outputJsFilename,
      clean: true,
    },

    optimization: {
      minimize: false,
    },

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
                additionalData: `
                  @import 'config/styles/theme.scss';
                  @import 'config/styles/mixins.scss';
                `,
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

    plugins: [
      new HubSpotAutoUploadPlugin({
        autoupload,
        account,
        src: 'dist',
        dest: projectName,
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, 'src/templates'), to: 'templates' },
          {
            from: path.resolve(__dirname, 'src/modules'),
            to: 'modules',
            globOptions: {
              ignore: ['**/module.jsx', '**/module.scss', '**/fields.js'],
            },
          },
          { from: path.resolve(__dirname, 'src/theme.json'), to: 'theme.json' },
          {
            from: path.resolve(__dirname, 'src/macros.html'),
            to: 'macros.html',
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: (pathData) => outputJsFilename(pathData).replace('.js', '.css').replace('js/', `css/`),
      }),
      new RemoveEmptyScriptsPlugin(),
    ],
  };
};

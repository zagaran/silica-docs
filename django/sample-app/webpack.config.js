// this webpack.config.js file is used to build the files in static/js/src; it is NOT used in the Vue build process

const path = require('path')
const TerserPlugin = require("terser-webpack-plugin")
const webpack = require('webpack')
const env = process.env.WEBPACK_ENV
const glob = require('glob');

const SRC_LOCATION = 'src/pages';
const DEST_LOCATION = 'static/js/dist';


function getEntries(pattern) {
  const entries = {};

  glob.sync(pattern).forEach((file) => {
    entries[file.replace(SRC_LOCATION, '')] = path.join(__dirname, file);
  });

  return entries;
}

const COPYRIGHT = ``

const { plugins, mode, watch, optimization } = env == 'build' 
	? { 
		plugins: [
			new TerserPlugin(), 
			new webpack.BannerPlugin(COPYRIGHT),
			new webpack.ProvidePlugin({
				Promise: ['es6-promise', 'Promise'],
			})
		], 
		mode: 'production',
		watch: false,
		optimization: {
			minimize: true,
			minimizer: [new TerserPlugin()],
		  },
	} 
	: { 
		plugins: [
			new webpack.BannerPlugin(COPYRIGHT),
		], 
		mode: 'development',
		watch: true,
		optimization: {
			minimize: false,
		}
	} 

module.exports = {
	mode,
	target: ['web', 'es5'],
	entry: getEntries(`${SRC_LOCATION}/**/*.js`),
	output: {
		path: path.join(__dirname, DEST_LOCATION),
		filename: '[name]',
	},
	module: {
		rules: [{
			// Only run `.js` files through Babel
			test: /\.m?js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}
			}
		}]
	},
	devtool: 'source-map',
	plugins,
	watch,
	optimization,
}
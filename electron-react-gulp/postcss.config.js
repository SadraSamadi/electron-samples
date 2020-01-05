const lost = require('lost');
const precss = require('precss');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');
const postcssFontMagician = require('postcss-font-magician');
const cssnano = require('cssnano');

module.exports = {
	plugins: [
		lost(),
		precss(),
		postcssPresetEnv(),
		autoprefixer(),
		postcssFontMagician({
			protocol: 'https:'
		}),
		cssnano()
	]
};

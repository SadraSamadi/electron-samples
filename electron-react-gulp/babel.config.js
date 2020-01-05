module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			[
				'minify',
				process.env.NODE_ENV === 'prod' ? undefined : false
			],
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'usage'
				}
			],
			[
				'@babel/preset-react',
				{
					development: process.env.NODE_ENV !== 'prod'
				}
			],
			[
				'@babel/preset-typescript',
				{
					isTSX: true,
					allExtensions: true
				}
			]
		],
		plugins: [
			[
				'@babel/plugin-transform-runtime'
			],
			[
				'@babel/plugin-proposal-decorators',
				{
					legacy: true
				}
			],
			[
				'@babel/plugin-proposal-class-properties',
				{
					loose: true
				}
			]
		]
	};
};

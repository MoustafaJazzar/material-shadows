import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const ENV = process.env.NODE_ENV;

const postcssOptions = (function() {
	let plugins = [];

	if (ENV === 'production') {
		plugins.push(require('cssnano'));
		plugins.push(require('autoprefixer'));
	}
	return {
		extract: true,
		plugins
	};
})();
export default {
	input: 'src/scripts/index.ts',
	output: {
		format: 'iife',
		file: 'dist/bundle.js'
	},

	plugins: [
		resolve({ extensions }),
		postcss(postcssOptions),

		babel({
			extensions,
			include: ['src/**/*'],
			exclude: 'node_modules/**'
		}),
		ENV === 'production' && terser()
	]
};

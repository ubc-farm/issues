import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
// import replace from 'rollup-plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import rollupTs from 'rollup-plugin-typescript';
import typescript from 'typescript'

const globals = {
	react: 'React',
	'react-dom': 'ReactDOM',
};

/**
 * Default browser rollup config.
 */
export default {
	sourceMap: true,
	format: 'iife',
	plugins: [
		nodeResolve({ browser: true, preferBuiltins: false, jsnext: true }),
		/* replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.browser': JSON.stringify(true),
		}), */
		commonjs({
			namedExports: {
				shortid: ['generate'],
				docuri: ['route'],
				events: ['EventEmitter'],
			},
		}),
		json(),
		nodeGlobals(),
		rollupTs({
			tsconfig: false,
			typescript,
			allowJs: true,
			strictNullChecks: true,
			jsx: 'React',
		}),
		babel({ exclude: 'node_modules/**', include: 'src/**/*.jsx' }),
	],
	globals,
	external: Object.keys(globals),
};

import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import multiEntry from '@rollup/plugin-multi-entry';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'test/**/*.test.js',
  output: {
    format: 'es',
    file: 'build/test-bundle.js',
    sourcemap: true,
  },
  plugins: [
    json(),
    nodeResolve({ browser: true, preferBuiltins: false }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // Exclude node_modules from babel
      presets: [['@babel/preset-env']] // Added presets
    }),
    multiEntry()
  ],
  external: ['lodash'] // lodash is external in main lib, keep it external for tests
};

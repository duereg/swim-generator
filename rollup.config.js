import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
  input: 'lib/index.js',
  output: {
    sourcemap: true,
    exports: 'auto', // Added exports: 'auto'
  },
  plugins: [
    json(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**', // Added exclude
      presets: [['@babel/preset-env']] // Added presets
    })
  ]
};

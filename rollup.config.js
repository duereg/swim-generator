import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
  entry: 'lib/index.js',
  sourceMap: true,
  plugins: [json(), babel()]
};

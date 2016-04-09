import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
  entry: 'test/**/*.test.js',
  plugins: [json(), babel(), multiEntry()],
  format: 'cjs',
  intro: 'require("source-map-support").install();',
  dest: 'build/test-bundle.js',
  sourceMap: true
};

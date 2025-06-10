import config from './rollup.config.js';

config.output.format = 'umd';
config.output.file = 'dist/swim-generator.umd.js';
config.output.name = 'swimGenerator';
config.output.globals = { lodash: '_' };
config.external = ['lodash'];

export default config;

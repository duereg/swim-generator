import config from './rollup.config.js';

config.output.format = 'es'; // 'es6' is now 'es'
config.output.file = 'dist/swim-generator.es6.js';
config.external = ['lodash'];

export default config;

import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/swim-generator.umd.js';
config.moduleName = 'swimGenerator';

export default config;

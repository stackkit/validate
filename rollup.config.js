
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json';

const INPUT_FILE_PATH = 'src/index.js';
const OUTPUT_NAME = 'Example';

const PLUGINS = [
  resolve({
    browser: true,
  }),
  commonjs(),
  filesize(),
];

const OUTPUT_DATA = [
  {
    file: pkg.browser,
    format: 'umd',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'es',
  },
];

const config = OUTPUT_DATA.map(({ file, format }) => ({
  input: INPUT_FILE_PATH,
  output: {
    file,
    format,
    name: OUTPUT_NAME,
    exports: 'default'
  },
  plugins: PLUGINS,
}));

export default config;

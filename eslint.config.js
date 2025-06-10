import globals from "globals";
import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      parser: babelParser,
      ecmaVersion: "latest", // For ESLint's core understanding
      sourceType: "module",
      parserOptions: { // Options specifically for @babel/eslint-parser
        requireConfigFile: false, // Do not look for .babelrc or babel.config.js
        babelOptions: { // Pass babel options if needed for parsing stages/features
          presets: ["@babel/preset-env"] // Ensure it can parse what @babel/preset-env supports
        }
      },
      globals: {
        ...globals.node,
        ...globals.mocha,
      },
    },
    rules: {
      "no-console": "warn",
    },
  },
];

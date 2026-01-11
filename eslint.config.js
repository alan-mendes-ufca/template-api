import js from "@eslint/js";
import jestPlugin from "eslint-plugin-jest";
import reactPlugin from "eslint-plugin-react";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
  {
    ignores: [".next", "node_modules", "dist", ".git"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      jest: jestPlugin,
      react: reactPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jestPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  prettierConfig,
];

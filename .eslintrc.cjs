module.exports = {
  env: { browser: true, commonjs: true, es2021: true, es6: true },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  overrides: [
    {
      files: ["**/*.test.js", "**/*.test.ts", "**/*.test.tsx"],
      env: { jest: true },
      extends: ["plugin:testing-library/react"],
      rules: {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
      },
    },
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
      plugins: ["@typescript-eslint"],
      rules: {
        "react/prop-types": "off",
        "@typescript-eslint/no-explicit-any": "error",
      },
    },
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
  plugins: ["prettier", "react", "testing-library", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
  settings: { react: { version: "detect" } },
};

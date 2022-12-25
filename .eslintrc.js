module.exports = {
  env: { browser: true, commonjs: true, es2021: true },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      files: ["**/*.test.js"],
      env: { jest: true },
      extends: ["plugin:testing-library/react"],
      rules: {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off",
      },
    },
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["prettier", "react", "testing-library"],
  rules: { "prettier/prettier": "error" },
  settings: { react: { version: "detect" } },
};

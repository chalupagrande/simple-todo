module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ['react', 'prettier'],
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": 0,
    "react/prop-types": 0,
    "import/no-unresolved": 0,
    camelcase: 0,
  },
};

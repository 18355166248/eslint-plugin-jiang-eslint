module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ["jiang-eslint"],
  rules: {
    "jiang-eslint/no-block-comments": "warn",
    "jiang-eslint/object-sort": "warn",
    "jiang-eslint/api-file-format": "error",
    "jiang-eslint/util-file-format": "error"
  }
};

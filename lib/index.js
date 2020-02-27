const requireIndex = require("requireindex");

module.exports.configs = {
  recommended: {
    plugins: ["eslint-plugin-jiang-eslint"],
    rules: {
      // "eslint-plugin-jiang-eslint/variable-name-array": "warn",
      // "eslint-plugin-jiang-eslint/util-file-struct": "error"
      "eslint-plugin-jiang-eslint/no-block-comments": "error",
      "eslint-plugin-jiang-eslint/api-file-format": "error",
      "eslint-plugin-jiang-eslint/object-sort": "error",
      "eslint-plugin-jiang-eslint/util-file-format": "error"
    }
  }
};

// import all rules in lib/rules
module.exports.rules = requireIndex(`${__dirname}/rules`);

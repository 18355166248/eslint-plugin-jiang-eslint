const requireIndex = require("requireindex");

module.exports = {
  configs: {
    base: require("./config/base")
  },
  rules: requireIndex(`${__dirname}/rules`)
};

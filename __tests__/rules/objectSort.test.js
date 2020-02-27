const RuleTester = require("eslint").RuleTester;
const rule = require("../../lib/rules/object-sort");

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2015
  }
});

ruleTester.run("object-sort", rule, {
  valid: [
    `const bar = {
      meta: {},
      double: num => num * 2
    }`
  ],
  invalid: [
    {
      code: `const bar = {
        double: num => num * 2,
        meta: {},
      }`,
      errors: [
        {
          message:
            'The "meta" property should be above the "double" property on line 2.'
        }
      ]
    }
  ]
});

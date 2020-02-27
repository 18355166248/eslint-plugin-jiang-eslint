const RuleTester = require("eslint").RuleTester;
const rule = require("../../lib/rules/noBlockComments");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 }
}); // You do have to tell eslint what js you're using

ruleTester.run("noBlockComments", rule, {
  valid: ["var a = 1; console.log(a)"],
  invalid: [
    {
      code: "var a = 1; /* block comments */ console.log(a)",
      errors: [
        {
          message: "No block comments",
          type: "Program",
          nodeType: "Block"
        }
      ]
    }
  ]
});

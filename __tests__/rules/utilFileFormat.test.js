"use strict";

var rule = require("../../lib/rules/utilFileFormat"),
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module"
  }
});

ruleTester.run("utilFileFormat", rule, {
  valid: [
    {
      filename: "foo.util.js",
      code: "" + "let fooUtil = {}; " + "export { fooUtil };"
    },
    {
      filename: "camelCase.util.js",
      code: "" + "let camelCaseUtil = {}; " + "export { camelCaseUtil };"
    }
  ],

  invalid: [
    {
      filename: "foo.util.js",
      code: "" + "let fooUtil = {}; " + "export default fooUtil;",
      errors: [
        {
          message: ".util.js 文件需要 export 一个 Util 对象",
          type: "Program"
        },
        {
          message: ".util.js 文件禁止使用 export defaul，应使用 export {} 替代",
          type: "ExportDefaultDeclaration"
        }
      ]
    },
    {
      filename: "foo.util.js",
      code: "" + "let fooUtil = {};",
      errors: [
        {
          message: ".util.js 文件需要 export 一个 Util 对象",
          type: "Program"
        }
      ]
    },
    {
      filename: "foo.util.js",
      code:
        "" +
        "let fooUtil = {}; " +
        "let barUtil = {}; " +
        "export { fooUtil };" +
        "export { barUtil };",
      errors: [
        {
          message: ".util.js 文件禁止使用多个 export {}",
          type: "ExportNamedDeclaration"
        }
      ]
    },
    {
      filename: "foo.util.js",
      code:
        "" +
        "let fooUtil = {}; " +
        "let barUtil = {}; " +
        "export { fooUtil, barUtil };",
      errors: [
        {
          message: ".util.js 文件应该仅 export 一个 Util 对象",
          type: "ExportSpecifier"
        }
      ]
    },
    {
      filename: "bar.util.js",
      code: "" + "let fooUtil = {}; " + "export { fooUtil };",
      errors: [
        {
          message: ".util.js 文件应该暴露一个名为 barUtil 的对象",
          type: "ExportSpecifier"
        }
      ]
    },
    {
      filename: "camelCase.util.js",
      code: "" + "let camelcaseUtil = {}; " + "export { camelcaseUtil };",
      errors: [
        {
          message: ".util.js 文件应该暴露一个名为 camelCaseUtil 的对象",
          type: "ExportSpecifier"
        }
      ]
    },
    {
      // linux 系统下有可能 filename 是一个全路径
      filename: "root/dir/camelCase.util.js",
      code: "" + "let camelcaseUtil = {}; " + "export { camelcaseUtil };",
      errors: [
        {
          message: ".util.js 文件应该暴露一个名为 camelCaseUtil 的对象",
          type: "ExportSpecifier"
        }
      ]
    },
    {
      // window 系统下有可能 filename 是一个全路径 且分隔符为 \
      filename: "c:\\\\root\\dir\\camelCase.util.js",
      code: "" + "let camelcaseUtil = {}; " + "export { camelcaseUtil };",
      errors: [
        {
          message: ".util.js 文件应该暴露一个名为 camelCaseUtil 的对象",
          type: "ExportSpecifier"
        }
      ]
    }
  ]
});

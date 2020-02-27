"use strict";

var rule = require("../../lib/rules/apiFileFormat"),
  RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module"
  }
});

ruleTester.run("apiFileFormat", rule, {
  valid: [
    {
      filename: "foo.api.js",
      code: "" + "let fooAPI = {}; " + "export { fooAPI };"
    },
    {
      filename: "camelCase.api.js",
      code: "" + "let camelCaseAPI = {}; " + "export { camelCaseAPI };"
    }
  ],

  invalid: [
    {
      filename: "foo.api.js",
      code: "" + "let fooAPI = {}; " + "export default fooAPI;",
      errors: [
        {
          message: ".api.js 文件需要 export 一个 API 对象",
          type: "Program"
        },
        {
          message: ".api.js 文件禁止使用 export defaul，应使用 export {} 替代",
          type: "ExportDefaultDeclaration"
        }
      ]
    },
    {
      filename: "foo.api.js",
      code: "" + "let fooAPI = {};",
      errors: [
        {
          message: ".api.js 文件需要 export 一个 API 对象",
          type: "Program"
        }
      ]
    },
    {
      filename: "foo.api.js",
      code:
        "" +
        "let fooAPI = {}; " +
        "let barAPI = {}; " +
        "export { fooAPI };" +
        "export { barAPI };",
      errors: [
        {
          message: ".api.js 文件禁止使用多个 export {}",
          type: "ExportNamedDeclaration"
        }
      ]
    },
    {
      filename: "foo.api.js",
      code:
        "" +
        "let fooAPI = {}; " +
        "let barAPI = {}; " +
        "export { fooAPI, barAPI };",
      errors: [
        {
          message: ".api.js 文件应该仅 export 一个 API 对象",
          type: "ExportSpecifier"
        }
      ]
    },
    {
      filename: "bar.api.js",
      code: "" + "let fooAPI = {}; " + "export { fooAPI };",
      errors: [
        {
          message: ".api.js 文件应该暴露一个名为 barAPI 的对象",
          type: "ExportSpecifier"
        }
      ]
    },
    {
      filename: "camelCase.api.js",
      code: "" + "let camelcaseAPI = {}; " + "export { camelcaseAPI };",
      errors: [
        {
          message: ".api.js 文件应该暴露一个名为 camelCaseAPI 的对象",
          type: "ExportSpecifier"
        }
      ]
    },
    {
      // linux 系统下有可能 filename 是一个全路径
      filename: "root/dir/camelCase.api.js",
      code: "" + "let camelcaseAPI = {}; " + "export { camelcaseAPI };",
      errors: [
        {
          message: ".api.js 文件应该暴露一个名为 camelCaseAPI 的对象",
          type: "ExportSpecifier"
        }
      ]
    },
    {
      // window 系统下有可能 filename 是一个全路径 且分隔符为 \
      filename: "c:\\\\root\\dir\\camelCase.api.js",
      code: "" + "let camelcaseAPI = {}; " + "export { camelcaseAPI };",
      errors: [
        {
          message: ".api.js 文件应该暴露一个名为 camelCaseAPI 的对象",
          type: "ExportSpecifier"
        }
      ]
    }
  ]
});

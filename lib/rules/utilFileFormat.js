var esquery = require('esquery');

module.exports = {
  meta: {
    docs: {
      description: 'check util file struct',
      category: 'Fill me in',
      recommended: true,
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function (context) {

    if (!(/.*\.util.js$/).test(context.getFilename())) return {};

    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    function getExactFilename(filename) {
      const pathArr = filename.split('/');

      return pathArr[pathArr.length - 1];
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      'ExportDefaultDeclaration': function (node) {
        context.report({
          node,
          message: '.util.js 文件禁止使用 export defaul，应使用 export {} 替代',
        });
      },
      'Program:exit': function (node) {
        const exportNamedDeclarations = esquery(node, 'ExportNamedDeclaration');

        if (exportNamedDeclarations.length < 1) {
          return context.report({
            node,
            message: '.util.js 文件需要 export 一个 Util 对象',
          });
        }

        if (exportNamedDeclarations.length > 1) {
          return context.report({
            node: exportNamedDeclarations[exportNamedDeclarations.length - 1],
            message: '.util.js 文件禁止使用多个 export {}',
          });
        }

        const exportSpecifiers = esquery(exportNamedDeclarations[0], 'ExportSpecifier');

        if (exportSpecifiers.length > 1) {
          return context.report({
            node: exportSpecifiers[1],
            message: '.util.js 文件应该仅 export 一个 Util 对象',
          });
        }

        const suggestNamespace = (
          getExactFilename(context.getFilename())
          .replace((/\\+/g), '/')
          .split('/')
          .slice(-1)[0]
          .split('.')[0]
        );

        if (exportSpecifiers[0].exported.name !== `${suggestNamespace}Util`) {
          return context.report({
            node: exportSpecifiers[0],
            message: `.util.js 文件应该暴露一个名为 ${suggestNamespace}Util 的对象`,
          });
        }
      },
    };
  },
};

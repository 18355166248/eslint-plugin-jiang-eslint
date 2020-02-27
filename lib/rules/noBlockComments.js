module.exports = {
  meta: {
    docs: {
      description: "禁止块级注释",
      category: "Stylistic Issues",
      recommended: true
    }
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      Program(node) {
        const comments = sourceCode.getAllComments();

        const blockComments = comments.filter(({ type }) => type === "Block");

        if (blockComments.length) {
          context.report({
            node: node,
            message: "No block comments"
          });
        }
      }
    };
  }
};

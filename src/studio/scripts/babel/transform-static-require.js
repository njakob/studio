module.exports = function transformStaticRequire() {
  return {
    visitor: {
      CallExpression(path) {
        if (path.node.callee.name === 'staticRequire') {
          path.node.callee.name = 'require';
        }
      },
    },
  };
};

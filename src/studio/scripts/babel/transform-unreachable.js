module.exports = function transformUnreachable() {
  return {
    visitor: {
      CallExpression(path) {
        if (path.node.callee.name === 'unreachable') {
          path.replaceWithSourceString('void 0');
        }
      },
    },
  };
};

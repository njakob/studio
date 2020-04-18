module.exports = function transformEnvironment({ types: t }) {
  return {
    visitor: {
      Identifier(path, { opts }) {
        if (path.node.name === '__ENVIRONMENT__') {
          path.replaceWith(
            t.stringLiteral(opts.target),
          );
        }
      },
    },
  };
};

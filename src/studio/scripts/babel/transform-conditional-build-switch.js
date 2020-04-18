module.exports = function transformConditionalBuildSwitch({ types: t }) {
  return {
    visitor: {
      SwitchStatement(path) {
        const isConditionalBuildSwitch = (node) => (
          t.isIdentifier(node.discriminant, { name: '__ENVIRONMENT__' })
          && node.cases.every((switchCase) => (
            switchCase.test === null
            || t.isStringLiteral(switchCase.test)
          ))
        );

        if (isConditionalBuildSwitch(path.node)) {
          const buildCase = (index, tests = []) => {
            const switchCase = path.node.cases[index];

            const localTests = [...tests, switchCase.test];

            if (switchCase.consequent.length === 0) {
              return buildCase(index + 1, localTests);
            }

            if (localTests.some((test) => test === null)) {
              return switchCase.consequent[0];
            }

            const buildTest = (testIndex) => {
              const binaryExpression = t.binaryExpression(
                '===',
                path.node.discriminant,
                localTests[testIndex],
              );
              if (testIndex === localTests.length - 1) {
                return binaryExpression;
              }
              return t.logicalExpression(
                '||',
                binaryExpression,
                buildTest(testIndex + 1),
              );
            };

            return t.ifStatement(
              buildTest(0),
              switchCase.consequent[0] || t.blockStatement([]),
              buildCase(index + 1),
            );
          };

          path.replaceWith(
            t.switchStatement(
              t.booleanLiteral(true),
              [t.switchCase(null, [buildCase(0)])],
            ),
          );
        }
      },
    },
  };
};

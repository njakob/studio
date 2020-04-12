const transformConditionalBuildSwitch = require('./src/studio/scripts/babel/transform-conditional-build-switch');
const transformStaticRequire = require('./src/studio/scripts/babel/transform-static-require');
const transformUnreachable = require('./src/studio/scripts/babel/transform-unreachable');

function getTarget(caller) {
  if (!caller) {
    return 'node';
  }
  if (caller.name === '@babel/register') {
    return 'node';
  }
  if (caller.name === '@babel/cli') {
    return 'node';
  }
  if (caller.name === 'babel-loader') {
    switch (caller.target) {
      case 'browser':
      case 'node':
        return caller.target;
      default:
        throw new Error(`Unknown target ${caller.target}`);
    }
  }
  throw new Error();
}

function hashContext(flags) {
  return flags.map(flag => (flag ? '0' : 1)).join();
}

module.exports = function (api) {
  const env = api.env();
  const isDevelopment = env === 'development';

  const target = api.caller(getTarget);

  const isTarget = (...values) => values.includes(target);

  api.cache.using(() => hashContext([target, isDevelopment]));

  return {
    presets: [
      isTarget('browser') && [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          modules: 'commonjs',
          corejs: {
            version: 3,
          },
        },
      ],
      isTarget('node') && [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          modules: 'commonjs',
          corejs: {
            version: 3,
          },
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/typescript',
      [
        '@babel/preset-react', {
          development: isDevelopment,
        },
      ],
    ].filter(Boolean),
    plugins: [
      [
        'babel-plugin-module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.js'],
        }
      ],
      [
        'babel-plugin-const-enum',
        {
          transform: 'constObject',
        },
      ],
      transformStaticRequire,
      transformUnreachable,
      transformConditionalBuildSwitch,
      '@babel/plugin-proposal-class-properties',
      '@babel/proposal-object-rest-spread',
      [
        'babel-plugin-styled-components',
        {
          displayName: isDevelopment,
          fileName: isDevelopment,
          ssr: !isDevelopment,
          minify: true,
          transpileTemplateLiterals: !isDevelopment,
          pure: !isDevelopment,
        },
      ],
      [
        '@babel/plugin-transform-runtime',
        {
          absoluteRuntime: false,
          corejs: false,
          helpers: true,
          regenerator: false,
          useESModules: false,
        },
      ],
    ].filter(Boolean),
  };
};


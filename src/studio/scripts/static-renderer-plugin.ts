/* eslint @typescript-eslint/ban-ts-ignore: 'warn' */

import * as path from 'path';
import * as webpack from 'webpack';

export type EntrypointAssets = {
  readonly scripts: string[];
  readonly styles: string[];
};

export class StaticRendererPlugin implements webpack.Plugin {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.make.tapPromise(this.constructor.name, async (compilation) => {
      const { publicPath } = compilation.mainTemplate.outputOptions;

      if (!publicPath) {
        throw new Error();
      }

      const outputOptions = {
        filename: `${this.constructor.name}-[name]`,
        publicPath: compilation.outputOptions.publicPath,
      };

      // @ts-ignore
      const childCompiler = compilation.createChildCompiler(this.constructor.name, outputOptions);

      const renderSource = path.join(__dirname, 'render-content.tsx');

      const entrypoint = 'index';

      const plugins = [
        new webpack.SingleEntryPlugin(compiler.context, renderSource, entrypoint),
      ];

      plugins.forEach((plugin) => plugin.apply(childCompiler));

      childCompiler.hooks.afterPlugins.call(childCompiler);

      compilation.hooks.additionalAssets.tapPromise(
        this.constructor.name,
        async () => {
          childCompiler.options.module.rules[1].use.options.caller.target = 'static-builder';

          const files = Array.from(compilation.entrypoints.values())[0].getFiles();
          const entrypointAssets: EntrypointAssets = {
            scripts: [],
            styles: [],
          };

          for (const file of files) {
            const publicFilePath = path.join(publicPath, file);
            if ((/\.js$/.test(file))) {
              entrypointAssets.scripts.push(publicFilePath);
            }
            if (/\.css$/.test(file)) {
              entrypointAssets.styles.push(publicFilePath);
            }
          }

          let source = '';

          await new Promise((resolve, reject) => {
            childCompiler.runAsChild((
              error: unknown,
              entries: unknown[],
              childCompilation: webpack.compilation.Compilation,
            ) => {
              if (error) {
                reject(error);
                return;
              }

              // @ts-ignore
              const name = compilation.mainTemplate.getAssetPath(outputOptions.filename, {
                hash: childCompilation.hash,
                chunk: entries[0],
                name: entrypoint,
              });

              // Do not emit the generated script
              delete compilation.assets[name];

              source = childCompilation.assets[name].source();

              resolve();
            });
          });

          // eslint-disable-next-line no-eval
          const { renderContent } = eval(source);

          const content = await renderContent(entrypointAssets);

          compilation.assets['index.html'] = {
            source() {
              return content;
            },
            size() {
              return content.length;
            },
          };
        },
      );
    });
  }
}

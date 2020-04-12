/* eslint @typescript-eslint/ban-ts-ignore: 'warn' */

import * as path from 'path';
import * as webpack from 'webpack';

const N = 'StaticRendererPlugin';

export type EntrypointAssets = {
  readonly scripts: string[];
  readonly styles: string[];
};

type Options = {
  renderContent(entrypointAssets: EntrypointAssets): Promise<string>;
};

export class StaticRendererPlugin implements webpack.Plugin {
  options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.emit.tapPromise(N, async (compilation) => {
      const { publicPath } = compilation.mainTemplate.outputOptions;

      if (!publicPath) {
        throw new Error();
      }

      for (const entrypoint of compilation.entrypoints.values()) {
        const files = entrypoint.getFiles();
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

        // eslint-disable-next-line no-await-in-loop
        const content = await this.options.renderContent(entrypointAssets);

        compilation.assets[`${entrypoint.name}.html`] = {
          source() {
            return content;
          },
          size() {
            return content.length;
          },
        };
      }
    });
  }
}

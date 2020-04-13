declare type N<T> = T | null;

declare interface BuildInfo {
  commitHash: string;
  buildTime: number;
}

/** Build time information. */
declare const __BUILD_INFO__: BuildInfo;

declare type Environment =
  /** Static building process. */
  | 'static-builder'
  /** Static building process in development mode. */
  | 'static-builder-dev'
  /** Browser bundle. */
  | 'browser'
  /** Browser bundle in development mode. */
  | 'browser-dev'
  ;

/** Running environment. */
declare const __ENVIRONMENT__: Environment;

/**
 * This section of code should never be reached.
 * https://github.com/typescript-eslint/typescript-eslint/issues/281
 */
declare function unreachable(v: never): never;

declare function staticRequire<T>(path: string): T;
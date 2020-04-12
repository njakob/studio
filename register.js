require('@babel/register')({
  // Without custom extensions, Babel will not compile TypeScript files.
  extensions: ['.ts', '.tsx', '.js'],
});

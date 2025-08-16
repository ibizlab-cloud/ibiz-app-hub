import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  clean: true,
  entries: [
    {
      declaration: true,
      input: 'src/',
      builder: 'mkdist',
      format: 'esm',
      ext: 'mjs',
      outDir: 'es',
    },
    {
      input: 'src/',
      builder: 'mkdist',
      format: 'cjs',
      ext: 'js',
      outDir: 'lib',
    }
  ],
});

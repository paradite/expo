import { resolveOptionsAsync } from '../resolveOptions';

describe(resolveOptionsAsync, () => {
  it(`asserts invalid platform`, async () => {
    await expect(resolveOptionsAsync({ '--platform': 'foobar' })).rejects.toThrow(
      /^Unsupported platform "foobar"\./
    );
  });

  it(`parses qualified options`, async () => {
    await expect(
      resolveOptionsAsync({
        '--output-dir': 'foobar',
        '--platform': 'android',
        '--clear': true,
        '--dev': true,
        '--dump-assetmap': true,
        '--dump-sourcemap': true,
        '--max-workers': 2,
      })
    ).resolves.toEqual({
      clear: true,
      dev: true,
      dumpAssetmap: true,
      dumpSourcemap: true,
      maxWorkers: 2,
      outputDir: 'foobar',
      platforms: ['android'],
    });
  });

  it(`parses default options`, async () => {
    await expect(resolveOptionsAsync({})).resolves.toEqual({
      clear: false,
      dev: false,
      dumpAssetmap: false,
      dumpSourcemap: false,
      maxWorkers: undefined,
      outputDir: 'dist',
      platforms: ['android', 'ios'],
    });
  });
});

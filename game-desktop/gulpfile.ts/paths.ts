import path from 'path';

export default class Paths {

  public static readonly ROOT = process.cwd();

  public static readonly SRC = path.join(Paths.ROOT, 'src');

  public static readonly SRC_MAIN = path.join(Paths.SRC, 'main');

  public static readonly SRC_RENDERER = path.join(Paths.SRC, 'renderer');

  public static readonly DIST = path.join(Paths.ROOT, 'dist');

  public static readonly DIST_MAIN = path.join(Paths.DIST, 'main');

  public static readonly DIST_RENDERER = path.join(Paths.DIST, 'renderer');

}

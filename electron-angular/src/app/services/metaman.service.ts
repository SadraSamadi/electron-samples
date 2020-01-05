import {Injectable} from '@angular/core';
import * as download from 'download';
import * as filenamify from 'filenamify';
import * as fse from 'fs-extra';
import * as path from 'path';
import {BehaviorSubject, Observable} from 'rxjs';
import {sprintf} from 'sprintf-js';
import {LoggerFactory} from '../classes/logger-factory';
import {MovieWrapper} from '../interfaces/movie-wrapper';
import {FileCryptoService} from './file-crypto.service';
import {TMDbService} from './tmdb.service';
import * as validFilename from 'valid-filename';

@Injectable({
  providedIn: 'root'
})
export class MetamanService {

  private logger = LoggerFactory.getLogger(MetamanService);

  private _movies = new BehaviorSubject<MovieWrapper[]>([]);

  private _movie = new BehaviorSubject<MovieWrapper>(null);

  public constructor(private fileCrypto: FileCryptoService,
                     private tmdb: TMDbService) {
  }

  public movies(): Observable<MovieWrapper[]> {
    return this._movies.asObservable();
  }

  public movie(): Observable<MovieWrapper> {
    return this._movie.asObservable();
  }

  public open(folder: string): Promise<any> {
    this.logger.info('open %s', folder);
    return fse.readdir(folder)
      .then(files => files.map(file => {
        let abs = path.join(folder, file);
        this.logger.info('file %s', abs);
        return {
          folder: folder,
          path: file
        } as MovieWrapper;
      }))
      .then(movies => this._movies.next(movies));
  }

  public select(movie: MovieWrapper): void {
    if (this._movie.value !== movie)
      this._movie.next(movie);
  }

  public title(movie: MovieWrapper): Promise<string> {
    let title = movie.path
      .replace(/(mkv)|(ganool)|(bluray)|(nightmovie)|(shaanig)|(yekmovie)|(nitro)|([0-9]{3,4}p)|(x[0-9]{3})/ig, '')
      .replace(/(6ch)|(nighthmovie)|(web)|(dl)|(30nama)|(glowgaze)|(com)|(mp4)|(hevc)|(psa)/ig, '')
      .replace(/(baranmovie)|(tmovz)|(dubbed)|(tinymoviez)|(farsi)|(hdtv)|(brrip)|(rarbg)/ig, '')
      .replace(/(\()|(\))|(\.)|(\[)|(])|(_)|(-)|([0-9]{4})/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return Promise.resolve(title);
  }

  public year(movie: MovieWrapper): Promise<number> {
    let year = parseInt(/(19|20)([0-9]{2})/.exec(movie.path)[0]);
    return Promise.resolve(year);
  }

  public save(movie: MovieWrapper): Promise<any> {
    console.log(validFilename(movie.details.title));
    console.log(validFilename(movie.details.title));
    console.log(validFilename(movie.details.title));
    let date = new Date(movie.details.release_date);
    let year = date.getFullYear();
    let name = sprintf('[%d] %s', year, movie.details.title);
    let folder = filenamify(name, {replacement: ','});
    let dir = path.join(movie.folder, folder);
    let metaPath = path.join(dir, '.json');
    let posterExt = path.extname(movie.details.poster_path);
    let posterPath = path.join(dir, 'poster' + posterExt);
    let movieName = filenamify(sprintf('%s %d', movie.details.original_title, year), {replacement: ','});
    let movieExt = path.extname(movie.path);
    let moviePath = path.join(dir, movieName + movieExt);
    return fse.ensureDir(dir)
      .then(() => this.fileCrypto.write(metaPath, movie.details))
      .then(() => this.tmdb.image(movie.details.poster_path))
      .then(url => this.download(url, posterPath))
      .then(() => fse.writeFile(moviePath, ''));
  }

  private download(url: string, dest: string): Promise<any> {
    let parse = path.parse(dest);
    return download(url, parse.dir, {filename: parse.base});
  }

}

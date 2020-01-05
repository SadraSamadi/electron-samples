import {Injectable} from '@angular/core';
import axios, {AxiosInstance} from 'axios';
import * as _ from 'lodash';
import {LoggerFactory} from '../classes/logger-factory';
import {MovieDetails} from '../interfaces/movie-details';
import {Page} from '../interfaces/page';
import {TMDbConfiguration} from '../interfaces/tmdb-configuration';
import {PreferencesService} from './preferences.service';

@Injectable({
  providedIn: 'root'
})
export class TMDbService {

  private logger = LoggerFactory.getLogger(TMDbService);

  private _client: AxiosInstance;

  private _configuration: TMDbConfiguration;

  public constructor(private prefs: PreferencesService) {
  }

  public configuration(): Promise<TMDbConfiguration> {
    if (this._configuration)
      return Promise.resolve(this._configuration);
    return this.client()
      .then(client => client.get('/configuration'))
      .then(res => this._configuration = res.data);
  }

  public search(title: string, year?: number, page?: number): Promise<Page<MovieDetails>> {
    this.logger.info('search "%s (%d)"', title, year);
    return this.client()
      .then(client => client.get('/search/movie', {
        params: {
          query: title,
          year: year,
          page: page,
          include_adult: true
        }
      }))
      .then(res => res.data);
  }

  public image(path: string, size = 'original'): Promise<string> {
    return this.configuration()
      .then(configuration => configuration.images.secure_base_url + size + path);
  }

  public movie(id: number): Promise<MovieDetails> {
    return this.client()
      .then(client => client.get('/movie/' + id, {
        params: {
          // append_to_response: 'videos,images,credits,keywords,translations,similar'
        }
      }))
      .then(res => res.data);
  }

  private client(): Promise<AxiosInstance> {
    if (this._client)
      return Promise.resolve(this._client);
    return this.prefs.get('client')
      .then(config => _.assign(config, {
        tmdbBaseUrl: process.env.TMDB_BASE_URL,
        tmdbApiKey: process.env.TMDB_API_KEY
      }))
      .then(config => axios.create({
        baseURL: config.tmdbBaseUrl,
        params: {
          api_key: config.tmdbApiKey
        }
      }))
      .then(client => this._client = client);
  }

}

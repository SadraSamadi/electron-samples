import {Collection} from './collection';
import {Company} from './company';
import {Country} from './country';
import {Genre} from './genre';
import {Language} from './language';

export interface MovieDetails {

  id?: number;

  title?: string;

  original_title?: string;

  overview?: string;

  release_date?: string;

  original_language?: string;

  genre_ids?: number[];

  popularity?: number;

  vote_average?: number;

  vote_count?: number;

  poster_path?: string;

  backdrop_path?: string;

  video?: boolean;

  adult?: boolean;

  belongs_to_collection?: Collection;

  budget?: number;

  genres?: Genre[];

  homepage?: string;

  imdb_id?: string;

  production_companies?: Company[];

  production_countries?: Country[];

  revenue?: number;

  runtime?: number;

  spoken_languages?: Language[];

  status?: string;

  tagline?: string;

}

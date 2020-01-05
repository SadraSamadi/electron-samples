import {Pipe, PipeTransform} from '@angular/core';
import {TMDbService} from '../services/tmdb.service';

@Pipe({
  name: 'tmdbImage'
})
export class TMDbImagePipe implements PipeTransform {

  public constructor(private tmdb: TMDbService) {
  }

  public transform(path: string, size?: string): Promise<string> {
    return path && this.tmdb.image(path, size);
  }

}

import {Component, OnInit} from '@angular/core';
import {MovieWrapper} from '../../interfaces/movie-wrapper';
import {DialogService} from '../../services/dialog.service';
import {MetamanService} from '../../services/metaman.service';
import {TMDbService} from '../../services/tmdb.service';
import {MovieSearchComponent} from '../movie-search/movie-search.component';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  public movie: MovieWrapper;

  public constructor(private dialog: DialogService,
                     private metaman: MetamanService,
                     private tmdb: TMDbService) {
  }

  public ngOnInit(): void {
    this.metaman.movie()
      .subscribe(movie => {
        console.log(movie);
        this.movie = movie;
      });
  }

  public onSearch(): void {
    let ref = this.dialog.open(MovieSearchComponent, {
      data: {
        movie: this.movie
      }
    });
    ref.afterClosed()
      .subscribe(res => res && this.movieDetails(res));
  }

  private movieDetails(id: number): Promise<any> {
    return this.dialog.startLoading()
      .then(() => this.tmdb.movie(id))
      .then(details => this.movie.details = details)
      .then(() => this.dialog.stopLoading());
  }

  public onSave(): void {
    this.save();
  }

  private save(): Promise<any> {
    return this.dialog.startLoading()
      .then(() => this.metaman.save(this.movie))
      .then(() => this.dialog.stopLoading());
  }

}

import {Component, OnInit} from '@angular/core';
import {MovieWrapper} from '../../interfaces/movie-wrapper';
import {DialogService} from '../../services/dialog.service';
import {MetamanService} from '../../services/metaman.service';
import {PreferencesService} from '../../services/preferences.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public movies: MovieWrapper[];

  public movie: MovieWrapper;

  public constructor(private dialog: DialogService,
                     private metaman: MetamanService,
                     private prefs: PreferencesService) {
  }

  public ngOnInit(): void {
    this.metaman.movies()
      .subscribe(movies => this.movies = movies);
    this.metaman.movie()
      .subscribe(movie => this.movie = movie);
    this.prefs.get('folder')
      .then(folder => folder && this.open(folder));
  }

  public onOpen(): void {
    this.dialog.openFolder()
      .then(folder => folder && this.open(folder, true));
  }

  private open(folder: string, save?: boolean): Promise<any> {
    return this.dialog.startLoading()
      .then(() => this.metaman.open(folder))
      .then(() => save && this.prefs.put('folder', folder))
      .then(() => this.dialog.stopLoading());
  }

  public onSelect(movie: MovieWrapper): void {
    this.metaman.select(movie);
  }

}

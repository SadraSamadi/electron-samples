import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef, PageEvent} from '@angular/material';
import {MovieDetails} from '../../interfaces/movie-details';
import {MovieWrapper} from '../../interfaces/movie-wrapper';
import {Page} from '../../interfaces/page';
import {DialogService} from '../../services/dialog.service';
import {MetamanService} from '../../services/metaman.service';
import {TMDbService} from '../../services/tmdb.service';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  public form: FormGroup;

  public movie: MovieWrapper;

  public page: Page<MovieDetails>;

  public constructor(private dialog: DialogService,
                     private formBuilder: FormBuilder,
                     private ref: MatDialogRef<MovieSearchComponent>,
                     private metaman: MetamanService,
                     private tmdb: TMDbService,
                     @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  public ngOnInit(): void {
    this.movie = this.data.movie;
    this.form = this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      year: this.formBuilder.control('')
    });
    this.metaman.title(this.movie)
      .then(title => this.form.controls.title.setValue(title))
      .then(() => this.metaman.year(this.movie))
      .then(year => this.form.controls.year.setValue(year))
      .then(() => this.onSearch());
  }

  public onSearch(event?: PageEvent): void {
    if (this.form.invalid)
      return;
    this.dialog.startLoading()
      .then(() => this.tmdb.search(this.form.value.title, this.form.value.year, event && event.pageIndex))
      .then(page => this.page = page)
      .then(page => console.log(page))
      .then(() => this.dialog.stopLoading());
  }

}

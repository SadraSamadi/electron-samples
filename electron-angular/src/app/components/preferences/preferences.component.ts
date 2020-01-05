import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoggerFactory} from '../../classes/logger-factory';
import {DialogService} from '../../services/dialog.service';
import {PreferencesService} from '../../services/preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  public form: FormGroup;

  private logger = LoggerFactory.getLogger(PreferencesComponent);

  public constructor(private formBuilder: FormBuilder,
                     private dialog: DialogService,
                     private prefs: PreferencesService) {
  }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      input: this.formBuilder.control(''),
      textarea: this.formBuilder.control(''),
      select: this.formBuilder.control('')
    });
    this.dialog.startLoading()
      .then(() => this.prefs.get('settings'))
      .then(settings => settings && this.form.patchValue(settings))
      .then(() => this.dialog.stopLoading());
  }

  public onSave(): void {
    this.dialog.startLoading()
      .then(() => this.prefs.put('settings', this.form.value))
      .then(() => this.form.reset(this.form.value))
      .then(() => this.dialog.stopLoading())
      .then(() => this.logger.info('prefs changed'));
  }

}

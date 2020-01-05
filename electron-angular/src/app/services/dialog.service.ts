import {ComponentType} from '@angular/cdk/portal';
import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {remote} from 'electron';
import {LoggerFactory} from '../classes/logger-factory';
import {LoadingComponent} from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private logger = LoggerFactory.getLogger(DialogService);

  private ref: MatDialogRef<LoadingComponent>;

  private counter = 0;

  public constructor(private dialog: MatDialog) {
  }

  public open<T>(component: ComponentType<T>, config?: MatDialogConfig): MatDialogRef<T> {
    return this.dialog.open(component, config);
  }

  public openFolder(): Promise<any> {
    return new Promise(resolve => {
      remote.dialog.showOpenDialog({properties: ['openDirectory']},
        paths => resolve(paths && paths[0]));
    });
  }

  public startLoading(): Promise<any> {
    this.logger.info('start loading %d', this.counter);
    return Promise.resolve()
      .then(() => {
        if (!this.counter++)
          this.ref = this.open(LoadingComponent);
      });
  }

  public stopLoading(): Promise<any> {
    this.logger.info('stop loading %d', this.counter);
    return Promise.resolve()
      .then(() => {
        if (this.counter > 0 && !--this.counter) {
          this.ref.close();
          this.ref = null;
        }
      });
  }

}

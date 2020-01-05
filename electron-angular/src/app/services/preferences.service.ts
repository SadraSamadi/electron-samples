import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import * as os from 'os';
import * as path from 'path';
import {LoggerFactory} from '../classes/logger-factory';
import {FileCryptoService} from './file-crypto.service';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private file: string;

  private logger = LoggerFactory.getLogger(PreferencesService);

  public constructor(private fileCrypto: FileCryptoService) {
    let homedir = os.homedir();
    this.file = path.join(homedir, '.metaman', '.prefs');
  }

  public put(key: string, value: any): Promise<any> {
    this.logger.info('put [%s => %s]', key, value);
    return this.read()
      .then(data => _.set(data, key, value))
      .then(data => this.write(data));
  }

  public get(key: string): Promise<any> {
    this.logger.info('get [%s]', key);
    return this.read()
      .then(data => _.get(data, key));
  }

  public remove(key: string): Promise<any> {
    this.logger.info('remove [%s]', key);
    return this.read()
      .then(data => _.omit(data, key))
      .then(data => this.write(data));
  }

  private write(data: any): Promise<any> {
    this.logger.info('write %s', this.file);
    return this.fileCrypto.write(this.file, data);
  }

  private read(): Promise<any> {
    this.logger.info('read %s', this.file);
    return this.fileCrypto.read(this.file)
      .catch(err => {
        if (err.code === 'ENOENT')
          return {};
        throw err;
      });
  }

}

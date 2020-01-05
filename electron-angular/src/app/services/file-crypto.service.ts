import {Injectable} from '@angular/core';
import * as crypto from 'crypto';
import * as fse from 'fs-extra';
import {LoggerFactory} from '../classes/logger-factory';

@Injectable({
  providedIn: 'root'
})
export class FileCryptoService {

  private static readonly PASSWORD = process.env.FILE_PASS || '';

  private logger = LoggerFactory.getLogger(FileCryptoService);

  public constructor() {
  }

  public write(file: string, data: any, password?: string): Promise<any> {
    this.logger.info('write %s', file);
    let decrypted = JSON.stringify(data);
    return this.encrypt(decrypted, password)
      .then(encrypted => fse.outputFile(file, encrypted));
  }

  public read(file: string, password?: string): Promise<any> {
    this.logger.info('read %s', file);
    return fse.readFile(file)
      .then(encrypted => encrypted.toString())
      .then(encrypted => this.decrypt(encrypted, password))
      .then(decrypted => JSON.parse(decrypted));
  }

  private encrypt(input: string, password = FileCryptoService.PASSWORD): Promise<string> {
    if (!password)
      return Promise.resolve(input);
    this.logger.info('encrypt');
    let iv = Buffer.alloc(16, 0);
    let key = crypto.scryptSync(password, 'salt', 24);
    let cipher = crypto.createCipheriv('aes-192-cbc', key, iv);
    let output = cipher.update(input, 'utf8', 'binary');
    output += cipher.final('binary');
    return Promise.resolve(output);
  }

  private decrypt(input: string, password = FileCryptoService.PASSWORD): Promise<string> {
    if (!password)
      return Promise.resolve(input);
    this.logger.info('decrypt');
    let iv = Buffer.alloc(16, 0);
    let key = crypto.scryptSync(password, 'salt', 24);
    let decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);
    let output = decipher.update(input, 'binary', 'utf8');
    output += decipher.final('utf8');
    return Promise.resolve(output);
  }

}

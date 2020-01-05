import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import * as dotenv from 'dotenv';
import 'hammerjs';
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

dotenv.config();

if (environment.production)
  enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

import 'dotenv/config';
import 'reflect-metadata';
import {series} from 'gulp';
import del from 'del';
import jest from 'jest';
import {compile, serve} from './builder';
import {pack} from './pack';
import Paths from './paths';

function clean(): Promise<any> {
  return del(Paths.DIST);
}

export const dev = series(clean, serve);

export const prod = series(clean, compile, pack);

export function test(): Promise<void> {
  return jest.run();
}

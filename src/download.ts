import fs from 'fs';
import R from 'ramda';
import request from "request";
import { promisify } from "./promisify";
import { proxyPlace } from './replace';

// tslint:disable-next-line: no-var-requires
const FileNameExpert = require('file-name-expert').default;

export const download = (fileUrl: string, proxy: (s: string) => string = (s: string) => s): Promise<any> =>
  promisify(request.get)(proxy(fileUrl), { encoding: null }).then(R.tap(res => console.log(proxyPlace(res.body.toString('utf-8')))), R.tap(console.error));

export const downloadToLocal = async (fileUrl: string): Promise<void> => {
  console.log('started to downloading...')

  const ws = fs.createWriteStream(FileNameExpert.getFileNameFromUrl(fileUrl))

  return new Promise((resolve, reject) => {
    ws.on('end', resolve);
    ws.on('error', reject);

    request.get(fileUrl).on('response', response => {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type']) // 'image/png'
    }).on('error', err => {
      console.error(err);
      reject(err);
    }).on('end', res => {
      console.log(res);
      resolve(res);
    }).pipe(ws);
  }).then(console.log, console.error);
}
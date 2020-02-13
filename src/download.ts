import fs from 'fs';
import request from "request";
import { promisify } from "./promisify";

// tslint:disable-next-line: no-var-requires
const FileNameExpert = require('file-name-expert').default;

export const download = (fileUrl: string): Promise<any> =>
  promisify(request.get)(fileUrl, { encoding: null });

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
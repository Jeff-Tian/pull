#! /usr/bin/env node

import { download, downloadToLocal } from './download';

// tslint:disable-next-line: no-var-requires
const FileNameExpert = require('file-name-expert').default;

export const dispatchTo = (originalUrl: string, proxy: (x: string) => string) => FileNameExpert.getFileNameFromUrl(originalUrl) ? downloadToLocal(proxy(originalUrl)) : download(originalUrl, proxy)

export const usage = () => console.log('Usage: pull file-url [-p]\nPull a remote file to local\n\t-p: to indicate use a proxy')


export const main = () => {
    if (process.argv.length <= 2) {
        usage();

        return;
    }

    dispatchTo(process.argv[2], (process.argv[3] === '-p' ? (fileUrl: string) => `https://uniheart.herokuapp.com/proxy/pipe-file?url=${encodeURIComponent(fileUrl)}` : (fileUrl: string) => fileUrl))
}

if (require.main === module) {
    main();
}

// tslint:disable-next-line
// require('yargs')
//   .usage('Usage: pull file-url')
//   .demandCommand(1)
//   .command(
//     [],
//     'pull a remote file to local',
//     () => {
//       console.log('pulling...')
//     },
//     downloadToLocal
//   ).argv;

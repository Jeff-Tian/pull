#! /usr/bin/env node

import { downloadToLocal } from './download';

console.log('Usage: pull file-url\nPull a remote file to local')

console.log(process.argv);
downloadToLocal(process.argv[2])

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

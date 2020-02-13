#! /usr/bin/env node

import { Argv } from 'yargs';
import { list } from './list';
import { switchTo } from './switch';

// tslint:disable-next-line
require('yargs')
  .usage('Usage: k8ss switch --cluster=your-cluster --namespace=your-namespace')
  .demandCommand(1)
  .demandOption('namespace')
  .command(
    ['switch', 's'],
    'switch clusters and namespace',
    (yargs: Argv) => {
      yargs
        .option('cluster', {
          default: '',
          describe: 'cluster name to switch',
        })
        .option('namespace', {
          default: 'dev',
          describe: 'namespace to switch',
        });
    },
    switchTo
  ).command(['list', 'l'], 'list configured clusters', (yargs: Argv) => {
    console.log('listing...');
    console.log(list());
    console.log('listing end.')
  }, (args: any) => {
    console.log('no effect code')
  }).argv;

import coffee from 'coffee';
import os from 'os';
import path from 'path';
import { getSubDirs } from '../list';

jest.setTimeout(7000)

const options = {
  env: {
    TS_NODE_PROJECT: path.resolve(__dirname, '../../tsconfig.json'),
  },
  execArgv: ['--require', require.resolve('ts-node/register/type-check')],
  cwd: path.resolve(__dirname, '../../'),
};

test('目标 config 文件不存在的情况', async () => {
  await coffee
    .fork('src/index.ts', ['switch', '--cluster=hello', '--namespace=world'], options)
    .expect('stdout', /^switching to --cluster=hello --namespace=world.../)
    .expect('stderr', /^没有找到目标文件：.+hello[\/\\]config\n/)
    .expect('code', 1)
    .end();
});

test('在当前上下文只切换 namespace', async () => {
  await coffee
    .fork('src/index.ts', ['switch', '--namespace=world'], options)
    .expect('stdout', /^switching to --cluster= --namespace=world.../)
    .end();
});

test('可以省略 switch 命令', async () => {
  await coffee
    .fork('src/index.ts', ['s', '--namespace=world'], options)
    .expect('stdout', /^switching to --cluster= --namespace=world.../)
    .end();
});

test.skip('list', async () => {
  await coffee
    .fork('src/index.ts', ['list'], options)
    .expect('stdout', ['listing...', getSubDirs(path.join(os.homedir(), '/k8s-config')).filter(x => x !== '.git').join('\n'), 'listing end.\n'].join('\n'))
    .end();
});

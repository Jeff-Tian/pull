import coffee from 'coffee';
import path from 'path';
import { testingXlsx } from './fixtures/testingFiles';

jest.setTimeout(7000)

const options = {
  env: {
    TS_NODE_PROJECT: path.resolve(__dirname, '../../tsconfig.json'),
  },
  execArgv: ['--require', require.resolve('ts-node/register/type-check')],
  cwd: path.resolve(__dirname, '../../'),
};

test('download to local', async () => {
  await coffee
    .fork('src/index.ts', [`${testingXlsx}`], options)
    .expect('stdout', /\s*/)
    .expect('stderr', /\s*/)
    .expect('code', 0)
    .end();
});

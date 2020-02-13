import os from 'os';
import path from 'path';

test('switches between clusters and it won\'t affect existing other files', async () => {
    jest.mock('fs');

    const fs = require('fs');
    const mockFiles = {
        [path.resolve(os.homedir(), '.kube/config')]: 'config',
        [path.resolve(os.homedir(), '.kube/file1')]: 'file1',
        [path.resolve(os.homedir(), 'k8s-config/cluster1/config')]: 'cluster1',
        [path.resolve(os.homedir(), 'k8s-config/cluster2/config')]: 'cluster2'
    };
    fs.__setMockFiles(mockFiles);

    const configFilePath = path.resolve(os.homedir(), '.kube/config');
    const getConfig = () => fs.readFileSync(configFilePath);

    const { switchTo } = require('../switch');

    expect(getConfig()).toEqual('config');

    switchTo({ cluster: 'cluster1', namespace: 'name' })

    expect(getConfig()).toEqual('cluster1');

    switchTo({ cluster: 'cluster2', namespace: 'name' });
    expect(getConfig()).toEqual('cluster2');
    expect(fs.existsSync(path.resolve(os.homedir(), '.kube/file1'))).toBe(true);
})

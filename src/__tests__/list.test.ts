test('list when there is no k8s-config folder under home directory', async () => {
    jest.mock('fs');
    require('fs').__setMockFiles({

    });

    const { list } = require('../list');
    expect(list()).toEqual('No configured clusters found. You can create an folder named `k8s-config` under your home directory, which contains the cluster config files inside each subfolder whose name is the cluster name.');
})

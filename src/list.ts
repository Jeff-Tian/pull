import { readdirSync } from 'fs';
import os from 'os';
import path from 'path';

export const list = () => {
    try {
        return (getSubDirs(path.join(os.homedir(), 'k8s-config')).filter(x => x !== '.git').join('\n'))
    } catch (ex) {
        return 'No configured clusters found. You can create an folder named `k8s-config` under your home directory, which contains the cluster config files inside each subfolder whose name is the cluster name.'
    }
}


export const getSubDirs = (parentDir: string) => readdirSync(parentDir, { withFileTypes: true }).filter(x => x.isDirectory()).map(x => x.name)

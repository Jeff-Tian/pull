// __mocks__/fs.js
'use strict';

const path = require('path');

const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
let fileContents = Object.create(null);

function __setMockFiles(newMockFiles) {
    fileContents = newMockFiles;

    mockFiles = Object.create(null);
    for (const file in newMockFiles) {
        const dir = path.dirname(file);

        if (!mockFiles[dir]) {
            mockFiles[dir] = [];
        }
        mockFiles[dir].push(path.basename(file));
    }
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
    __setMockFiles(fileContents);

    const list = mockFiles[directoryPath]

    if (list) {
        return list
    } else {
        throw new Error(`ENOENT: no such file or directory, scandir '${directoryPath}'`)
    }
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.readFileSync = filePath => fileContents[filePath];
fs.existsSync = filePath => Object.keys(fileContents).filter(x => x.startsWith(filePath)).length > 0
fs.renameSync = (from, to) => {
    for (let path of Object.keys(fileContents)) {
        if (path.startsWith(from)) {
            fileContents[path.replace(from, to)] = fileContents[path];

            delete fileContents[path];
        }
    }
}
fs.makeDirSync = dir => {
    mockFiles[dir] = []
}
fs.copyFileSync = (from, to) => {
    fileContents[to] = fileContents[from];
}

module.exports = fs;

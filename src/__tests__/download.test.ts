import fs from 'fs';
import path from 'path';
import { download, downloadToLocal } from "../download";
import { testingXlsx } from "./fixtures/testingFiles";

// tslint:disable-next-line: no-var-requires
const FileNameExpert = require('file-name-expert').default;

describe("download", () => {
    it("download a file into buffer", async () => {
        const res = await download(testingXlsx);

        expect(res.statusCode).toEqual(200);
        expect(res.headers["content-type"]).toEqual(
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        expect(res.body instanceof Buffer).toBe(true);
        expect(Object.prototype.toString.call(res.body)).toEqual(
            "[object Uint8Array]"
        );
    });

    it("download a file into local", async () => {
        await downloadToLocal(testingXlsx);
        const fileName = FileNameExpert.getFileNameFromUrl(testingXlsx);
        console.log('filename = ', fileName, process.cwd());
        expect(fs.existsSync(path.resolve(process.cwd(), fileName))).toBe(true);
    });
});

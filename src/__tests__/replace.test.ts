import { proxyPlace } from "../replace";

describe("Replace", () => {
    it("replaces", async () => {
        const originalString = 'this is a string contains an url, https://some.example.com, proxy it please';

        const result = proxyPlace(originalString);

        expect(result).toEqual('this is a string contains an url, https://uniheart.herokuapp.com/proxy/pipe-file?url=https://some.example.com, proxy it please')
    });
});

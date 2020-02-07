const model = require("./matches-model");
const db = require("../data/config");

describe("matches model", () => {
    beforeEach(async () => {
        await db.seed.run();
    });
    test("findUserMatches", async () => {
        const res = await model.findUserMatches(2);

        expect(res.length).toBe(1);
    });
    test("findCompanyMatches", async () => {
        const res = await model.findCompanyMatches(4);

        expect(res.length).toBe(2);
    });
    test("addCompanyMatch", async () => {
        const res = await model.addCompanyMatch(1);

        expect(res.match).toBe(true);
    });
    test("findCompanyUserMatches", async () => {
        const res = await model.findCompanyUserMatches(4);

        expect(res.length).toBe(2);
    });
    test("addUserMatch", async () => {
        const res = await model.addUserMatch({user_id: 2, job_id: 1});

        expect(res.user_id).toBe(2);
    });
    test("findMatchById", async () => {
        const res = await model.findMatchById(2);

        expect(res.length).toBe(1);
    });
});
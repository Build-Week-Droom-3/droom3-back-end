const model = require("./users-model");
const db = require("../data/config");

beforeEach(async () => {
    await db.seed.run();
});

describe("users model", () => {
    test("find", async () => {
        const res = await model.find();
        expect(res).toHaveLength(2);
    });
    test("findUser", async () => {
        const res = await model.findUser(1);
        expect(res.username).toMatch(/example/ig);
    });
    test("remove", async() => {
        const res = await model.remove(1);
        expect(res).toBeGreaterThan(0);
    });
})
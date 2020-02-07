const model = require("./users-model");
const db = require("../data/config");

describe("users model", () => {
    beforeEach(async () => {
        await db.seed.run();
    });
    test("find", async () => {
        const res = await model.find();
        expect(res).toHaveLength(4);
    });
    test("findUser", async () => {
        const res = await model.findUser(1);
        expect(res.username).toMatch(/example/i);
    });
    test("remove", async() => {
        const res = await model.remove(1);
        expect(res).toBeGreaterThan(0);
    });
    test("findCompanies", async () => {
        const res = await model.findCompanies();

        expect(res.length).toBe(2);
    });
    test("add", async () => {
        const res = await model.add({username:"Daniel", password: "password", name: "Daniel martin"});

        expect(res.username).toBe("Daniel");
    });
});
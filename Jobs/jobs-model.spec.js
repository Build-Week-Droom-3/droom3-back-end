const db = require("../data/config");
const model = require("./jobs-model");

describe("jobs model", () => {
    beforeEach(async () => {
        await db.seed.run();
    });
    test("find", async () => {
        const res = await model.find();

        expect(res.length).toBe(2);
    });
    test("add", async () => {
        const res = await model.add({company_id: 3, name: "Engineer", type: "Software"});

        expect(res.name).toBe("Engineer");
    });
    test("findJob", async () => {
        const res = await model.findJob(1);

        expect(res.name).toBe("Software Engineer");
    });
    test("update", async () => {
        const res = await model.update(1,{company_id: 3, name: "Software Engineer", type: "Software", description: "Test update"});

        expect(res.description).toBe("Test update");
    })
});


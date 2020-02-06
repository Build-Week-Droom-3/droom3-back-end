const model = require("./users-model");
const db = require("../data/config");

// afterAll(async() => {
//     await db.truncate();
// });

// beforeAll(async () => {
//     await db.seed.run();
// });
// describe("users model", () => {

//     test.only("find", async () => {
//         const res = await model.find();
//         expect(res).toHaveLength(4);
//     });
//     test("findUser", async () => {
//         const res = await model.findUser(1);
//         expect(res.username).toMatch(/example/i);
//     });
//     test("remove", async() => {
//         const res = await model.remove(1);
//         expect(res).toBeGreaterThan(0);
//     });
// })
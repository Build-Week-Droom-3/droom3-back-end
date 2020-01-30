const supertest = require("supertest");
const server = require("./index");
const db = require("./data/config");

beforeEach(async () => {
    await db.seed.run();
});

test("users Route", async () => {
    const user = await supertest(server).post("/users/login").send({username: "example", password: "password"});
    const res = await supertest(server).get('/users').set({authorization: user.body.token});
    console.log(user.body)


    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
});

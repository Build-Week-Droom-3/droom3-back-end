const supertest = require("supertest");
const server = require("./index");
const db = require("./data/config");

let token;

beforeAll(done => {
    supertest(server).post("/users/login").send({username: "example", password: "password"}).end((err, res) => {
        token = res.body.token;
        done();
    });
});
describe("usersRoute",  () => {
    beforeEach(async () => {
        await db.seed.run();
    });

    test("user login", async () => {
        const user = await supertest(server).post("/users/login").send({username: "example", password: "password"});

        expect(user.status).toBe(200);
        expect(user.type).toBe("application/json");
        expect(user.body.id).toBe(1);
    });
    test("users register", async () => {
        const res = await supertest(server).post("/users").send({username: "john", password: "password", name: "John Smith"});

        expect(res.status).toBe(201);
        expect(res.type).toBe("application/json");
        expect(res.body.username).toBe("john");
    });
    test("get companies", async () => {
        const res = await supertest(server).get('/users/companies').set({authorization: token});

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.length).toBe(2)
    });
    test("get specfic user", async () => {
        const res = await supertest(server).get("/users/1").set({authorization: token})

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.username).toBe("example");
    });
});

describe("jobs route", () => {
    beforeEach(async () => {
        await db.seed.run();
    });
    test("get jos", async () => {
        const res = await supertest(server).get("/jobs").set({authorization: token});

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.length).toBe(2);    
    });
    test("get specific job", async() => {
        const res = await supertest(server).get("/jobs/1").set({authorization: token});

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.name).toBe("Software Engineer");    
    });
    test("get company's jobs", async () => {
        const res = await supertest(server).get("/jobs/company/3").set({authorization: token});

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.length).toBe(1);
    });
    test("add job", async () => {
        const res = await supertest(server).post("/jobs").send({name: "Software Engineer", company_id: 4, type: "Software", description: "Java"}).set({authorization: token});

        expect(res.status).toBe(201);
        expect(res.type).toBe("application/json");
        expect(res.body.type).toBe("Software");
    });
    test("delete job", async () => {
        const res = await supertest(server).delete("/jobs/2").set({authorization: token});

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body).toBe(1);
    });
});

describe("matches route", () => {
    beforeEach(async () => {
        await db.seed.run();
    });
    test("get company's matches", async () => {
        const res = await supertest(server).get("/matches/company/4").set({authorization: token});

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.length).toBe(2);    
    });
    test("get user's matches", async() => {
        const res = await supertest(server).get("/matches/user/1").set({authorization: token});

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.length).toBe(1);    
    });
    test("get company's applications", async () => {
        const res = await supertest(server).get("/matches/3").set({authorization: token});

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.length).toBe(1);
    });
    test("add match", async () => {
        const res = await supertest(server).post("/matches").send({user_id: 2, job_id: 1}).set({authorization: token});

        expect(res.status).toBe(201);
        expect(res.type).toBe("application/json");
        expect(res.body.job_id).toBe(1);
    });
    test("add company match", async () => {
        const res = await supertest(server).put("/matches/1").set({authorization: token});

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.match).toBe(true);

    });
});

describe("auth route", () => {
    beforeEach(async () => {
        await db.seed.run();
    });
    test("auth", async () => {
        const res = await supertest(server).get("/auth").set({authorization: token});

        expect(res.status).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.password).toBe(undefined);
        expect(res.body.username).toBe("example");
    });
});

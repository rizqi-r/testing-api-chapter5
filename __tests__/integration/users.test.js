const app = require("../../app");
const request = require("supertest");

describe("test POST /v1/users endpoint", () => {
    let name = "testingemail";
    let email = "testing@gmail.com";
    let password = "password123";

    test("test email belum terdaftar -> success", async () => {
        try {
            let { statusCode, body } = await request(app).post("/v1/users").send({ name, email, password });

            console.log("body", body);

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id");
            expect(body.data).toHaveProperty("name");
            expect(body.data).toHaveProperty("email");
            expect(body.data).toHaveProperty("password");
            expect(body.data.name).toBe(name);
            expect(body.data.email).toBe(email);
            expect(body.data.password).toBe(password);
        } catch (err) {
            expect(err).toBe("error");
        }
    });

    test("test email sudah terdaftar -> error", async () => {
        try {
            let { statusCode, body } = await request(app).post("/v1/users").send({ name, email, password });
            expect(statusCode).toBe(400);
        } catch (err) {
            expect(err).toBe("email sudah dipakai");
        }
    });
});

describe("test GET /v1/users/{id} endpoint", () => {
    let id = 2;
    let name = "testlogin";
    let email = "testlogin@gmail.com";
    let password = "123";

    test("test id tersedia -> success", async () => {
        try {
            let { statusCode, body } = await request(app).get(`/v1/users/${id}`);

            console.log("body", body);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id");
            expect(body.data).toHaveProperty("name");
            expect(body.data).toHaveProperty("email");
            expect(body.data).toHaveProperty("password");
            expect(body.data.name).toBe(name);
            expect(body.data.email).toBe(email);
            expect(body.data.password).toBe(password);
        } catch (err) {
            expect(err).toBe("error");
        }
    });

    test("test id tidak terdaftar -> error", async () => {
        try {
            let id = 0;
            let { statusCode, body } = await request(app).get(`/v1/users/${id}`);
            expect(statusCode).toBe(400);
        } catch (err) {
            expect(err).toBe("email sudah dipakai");
        }
    });
});

describe("test POST /v1/login endpoint", () => {
    // let id = 2;
    // let name = "testlogin";
    let email = "testlogin@gmail.com";
    let password = "123";
    let invalidemail = "invalidemail@gmail.com";
    let invalidpassword = "abc";

    test("test login sukses -> success", async () => {
        try {
            let { statusCode, body } = await request(app).post(`/v1/login`).send({ email, password });

            console.log("body", body);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body).toHaveProperty("data");
            expect(body.data).toHaveProperty("id");
            expect(body.data).toHaveProperty("name");
            expect(body.data).toHaveProperty("email");
            expect(body.data).toHaveProperty("token");
            expect(body.data.email).toBe(email);
        } catch (err) {
            expect(err).toBe("error");
        }
    });

    test("test email tidak terdaftar -> error", async () => {
        try {
            let { statusCode, body } = await request(app).post(`/v1/login`).send({ invalidemail, invalidpassword });
            expect(statusCode).toBe(400);
            console.log(body);
            expect(body.data).toBe("email tidak terdaftar");
        } catch (err) {
            expect(err).toBe("email tidak terdaftar");
        }
    });

    test("test password salah -> error", async () => {
        try {
            let { statusCode, body } = await request(app).post(`/v1/login`).send({ email, invalidpassword });
            expect(statusCode).toBe(400);
            expect(body.data).toBe("password salah");
        } catch (err) {
            expect(err).toBe("password salah");
        }
    });
});

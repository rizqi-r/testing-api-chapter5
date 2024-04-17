const app = require("../../app");
const request = require("supertest");

describe("test GET /v1/ endpoint", () => {
    let resStatus = {
        status: 200,
        message: "OK"
    };
    test("test v1 up -> success", async () => {
        try {
            let { statusCode, body } = await request(app).get("/v1/");

            console.log("body", body);

            expect(statusCode).toBe(200);
            expect(body).toHaveProperty("status");
            expect(body).toHaveProperty("message");
            expect(body.status).toBe(resStatus.status);
            expect(body.message).toBe(resStatus.message);
        } catch (err) {
            console.error(err.matcherResult.actual);
            expect(err).toBe("error");
        }
    });
});

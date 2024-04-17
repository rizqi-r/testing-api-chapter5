const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createUser, getUser, getAuth } = require("../../services/users");

describe("test createUser()", () => {
    let name = "test";
    let email = "test@gmail.com";
    let password = "password123";

    let email2 = "testing@gmail.com";

    beforeAll(async () => {
        await prisma.user.deleteMany({ where: {email: {in: [email, email2]}} });
    });

    test("test email belum terdaftar -> sukses", async () => {
        try {
            let result = await createUser(name, email, password);
            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("name");
            expect(result).toHaveProperty("email");
            expect(result).toHaveProperty("password");
            expect(result.name).toBe(name);
            expect(result.email).toBe(email);
            expect(result.password).toBe(password);
        } catch (err) {
            expect(err).toBe("error");
        }
    });

    test("test email sudah terdaftar -> error", async () => {
        try {
            await createUser(name, email, password);
        } catch (err) {
            expect(err).toBe("email sudah dipakai");
        }
    });
});

describe("test getUserById(:id)", () => {
    test("test user tersedia -> sukses", async () => {
        let id = 2;
        let name = "testlogin";
        let email = "testlogin@gmail.com";
        let password = "123";

        try {
            let result = await getUser(id);
            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("name");
            expect(result).toHaveProperty("email");
            expect(result).toHaveProperty("password");
            expect(result.id).toBe(id);
            expect(result.name).toBe(name);
            expect(result.email).toBe(email);
            expect(result.password).toBe(password);
        } catch (err) {
            expect(err).toBe("error");
        }
    });
});

describe("test getAuth(email, password)", () => {
    test("test user telah login -> sukses", async () => {
        let id = 2;
        let name = "testlogin";
        let email = "testlogin@gmail.com";
        let password = "123";

        try {
            let result = await getAuth(email, password);
            expect(result).toHaveProperty("id");
            expect(result).toHaveProperty("name");
            expect(result).toHaveProperty("email");
            expect(result.id).toBe(id);
            expect(result.name).toBe(name);
            expect(result.email).toBe(email);
        } catch (err) {
            expect(err).toBe("error");
        }
    });
});
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (name, email, password) => {
    try {
        let exist = await prisma.user.findUnique({ where: { email } });
        if (exist) throw 'email sudah dipakai';

        let user = await prisma.user.create({ data: { name, email, password } });
        return user;
    } catch (err) {
        throw err;
    }
};

const getUser = async (id) => {
    try {
        let user = await prisma.user.findUnique({ where: { id } });
        if (!user) throw 'id tersedia';

        return user;
    } catch (error) {
        throw error;
    }
};

const getAuth = async (email, password) => {
    try {
        let user = await prisma.user.findUnique({ where: { email }});
        if (!user) throw 'email tidak terdaftar';
        if (user.password !== password) throw 'password salah';

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: new Date().getTime()
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createUser,
    getUser,
    getAuth
};
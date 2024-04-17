let { createUser, getUser, getAuth } = require("../services/users");

const index = async (req, res, next) => {
    try {
        return res.status(200).json({
            status: 200,
            message: "OK"
        });
    } catch (err) {
        next(err);
    }
};

const createUserData = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        try {
            let user = await createUser(name, email, password);
            return res.status(201).json({
                status: 201,
                message: "Created",
                data: user
            });
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: err,
                data: null
            });
        }
    } catch (err) {
        next(err);
    }
};

const getSpecificUser = async (req, res, next) => {
    try {
        const params = Number(req.params.id);
        try {
            let user = await getUser(params);
            return res.status(200).json({
                status: 200,
                message: "OK",
                data: user
            });
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: err,
                data: null
            });
        }
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        try {
            let user = await getAuth(email, password);
            return res.status(200).json({
                status: 200,
                message: "OK",
                data: user
            });
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: err,
                data: null
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    createUserData,
    getSpecificUser,
    login
};

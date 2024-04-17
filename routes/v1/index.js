const router = require("express").Router();
const v1 = require("../../controllers/baseController");

router.get("/", v1.index);
router.post("/users", v1.createUserData);
router.get("/users/:id", v1.getSpecificUser);

router.post("/login", v1.login);

module.exports = router;

const express = require("express");
const { register, login, setAvatar } = require("../controller/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers");

module.exports = router;

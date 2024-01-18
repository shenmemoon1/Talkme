const express = require("express");
const {
  register,
  login,
  setAvatar,
  getUsers,
} = require("../controller/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", getUsers);

module.exports = router;

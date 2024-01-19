const express = require("express");
const {
  register,
  login,
  setAvatar,
  getUsers,
  logout,
} = require("../controller/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", getUsers);
router.post("/logout/:id", logout);

module.exports = router;

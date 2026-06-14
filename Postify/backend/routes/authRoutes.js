const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/protectRoute");
const { signup, login, logout, me } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protectRoute, me);

module.exports = router;
const express = require("express");
const router = express.Router();
const { userProfile, profilePost } = require("../controllers/profileController");
const protectRoute = require("../middleware/protectRoute");

router.get("/:userId",
        protectRoute,
        userProfile
);

router.get("/posts/:userId",
        protectRoute,
        profilePost
);

module.exports = router;
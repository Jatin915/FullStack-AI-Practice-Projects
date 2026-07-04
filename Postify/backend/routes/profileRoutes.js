const express = require("express");
const router = express.Router();
const { userProfile, updateProfile } = require("../controllers/profileController");
const protectRoute = require("../middleware/protectRoute");
const upload = require("../middleware/uploadMiddleware");

router.get("/:userId",
        protectRoute,
        userProfile
);

router.put("/", 
        protectRoute,
        upload.single("profilePic"),
        updateProfile
);

module.exports = router;
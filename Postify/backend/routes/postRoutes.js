const express = require('express');
const router = express.Router();
const { uploadImage, allPosts, likePost } = require('../controllers/postController');
const protectRoute = require('../middleware/protectRoute');
const upload = require('../middleware/uploadMiddleware');

router.post("/upload", 
    protectRoute, 
    upload.single("image"), 
    uploadImage
);

router.get("/", 
    protectRoute, 
    allPosts
);

router.get("/like/:postId",
    protectRoute,
    likePost
);

module.exports = router;
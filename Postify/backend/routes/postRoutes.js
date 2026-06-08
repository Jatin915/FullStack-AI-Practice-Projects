const express = require('express');
const router = express.Router();
const { uploadImage, allPosts, likePost, commentPost } = require('../controllers/postController');
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

router.put("/:postId/like",
    protectRoute,
    likePost
);

router.post("/:postId/comment",
    protectRoute,
    commentPost
);

module.exports = router;
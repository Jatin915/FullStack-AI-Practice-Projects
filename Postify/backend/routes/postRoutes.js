const express = require('express');
const router = express.Router();
const { uploadImage, allPosts, likePost, commentPost, deleteComment, deletePost } = require('../controllers/postController');
const protectRoute = require('../middleware/protectRoute');
const upload = require('../middleware/uploadMiddleware');

router.post("/upload", 
    protectRoute, 
    upload.single("imageUrl"), 
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

router.put("/:postId/comment/:commentId",
    protectRoute,
    deleteComment
);

router.delete("/:postId/delete",
    protectRoute,
    deletePost
);

module.exports = router;
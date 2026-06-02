const express = require('express');
const router = express.Router();
const uploadImage = require('../controllers/postController');
const protectRoute = require('../middleware/protectRoute');
const upload = require('../middleware/uploadMiddleware');

router.post("/upload", 
    protectRoute, 
    upload.single("image"), 
    uploadImage
);

module.exports = router;
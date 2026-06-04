const cloudinary = require('../config/cloudinary');
const postModel = require('../models/Post');

const uploadImage = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                message: "No image uploaded!"
            });
        }
        
        const caption = req.body.caption;
        const userId = req.user._id;
        const result = await cloudinary.uploader.upload(req.file.path);
        const image = result.secure_url;
        const publicId = result.public_id;

        // console.log("caption: ",caption);
        // console.log("userId: ",userId);
        // console.log("image: ",image);
        // console.log("publicId: ",publicId);

        const newPost = await postModel.create({
            image,
            caption,
            userId,
            publicId
        });

        return res.status(200).json({
            message: "Post created successfully",
            Post: newPost
        });
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};


const allPosts = async (req,res) => {
    try {
        
        const posts = await postModel.find().populate("userId", "username profilePic").sort({ createdAt: -1 });
        return res.status(200).json({
            posts
        });

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: "Server error"
        });
    }
}


module.exports = { uploadImage, allPosts };
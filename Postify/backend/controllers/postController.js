const cloudinary = require('../config/cloudinary');
const postModel = require('../models/Post');

const uploadImage = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                message: "No image uploaded!"
            });
        }
        
        const result = await cloudinary.uploader.upload(req.file.path);

        return res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: result.secure_url
        });
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = uploadImage;
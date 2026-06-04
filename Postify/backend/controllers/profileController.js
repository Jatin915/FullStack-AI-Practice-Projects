const userModel = require('../models/User');
const postModel = require('../models/Post');

const userProfile = async (req,res) => {
    try {

        const { userId } = req.params;

        const user = await userModel.findById(userId).select("username profilePic bio createdAt");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

const profilePost = async (req,res) => {

    try {

        const { userId } = req.params;

        const posts = await postModel.find({userId}).sort({createdAt: -1});

        if (!posts) {
            return res.status(404).json({
                message: "No posts yet!"
            });
        }

        return res.status(200).json({
            posts
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = { userProfile, profilePost };
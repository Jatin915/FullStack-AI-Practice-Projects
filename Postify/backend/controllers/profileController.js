const userModel = require("../models/User");
const postModel = require("../models/Post");
const cloudinary = require("../config/cloudinary");

const userProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel
      .findById(userId)
      .select("username profilePic bio createdAt");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const posts = await postModel
      .find({ userId })
      .populate("userId", "username profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      user,
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, bio } = req.body;

    const user = await userModel.findById(userId).select("username profilePic profilePicPublicId bio createdAt");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (username && username !== user.username) {
      const existingUser = await userModel.findOne({ username });

      if (existingUser) {
        return res.status(409).json({
          message: "Username already taken",
        });
      }

      user.username = username.trim();
    }

    if (typeof bio === "string") {
      user.bio = bio.trim();
    }

    if (req.file) {
      if (user.profilePicPublicId) {
        await cloudinary.uploader.destroy(user.profilePicPublicId);
      }

      const result = await cloudinary.uploader.upload(req.file.path);

      user.profilePic = result.secure_url;
      user.profilePicPublicId = result.public_id;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { userProfile, updateProfile };

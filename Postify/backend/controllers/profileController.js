const userModel = require("../models/User");
const postModel = require("../models/Post");

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

module.exports = { userProfile };

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

const likePost = async (req,res) => {
    try {

        const userId = req.user._id;
        const { postId } = req.params;

        const likedUsers = await postModel.findById(postId).select("likes");

        if(!likedUsers) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        
        const existingUser = likedUsers.likes.some(
            id => id.toString() === userId.toString()
        );

        if(existingUser) {
            let updatedPost = await postModel.findByIdAndUpdate(
                postId, 
                {
                    $pull: {likes: userId}
                },
                {
                    returnDocument: "after"
                }
            );

            const post = await postModel.findById(postId);

            return res.status(200).json({
                post
            });
        } else {
            let updatedPost = await postModel.findByIdAndUpdate(
                postId, 
                {
                    $push: {likes: userId}
                },
                {
                    returnDocument: "after"
                }
            );

            const post = await postModel.findById(postId);
            
            return res.status(200).json({
                post
            })
        }

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error!"
        });
    }
}


const commentPost = async (req,res) => {
    try {

        const userId = req.user._id;
        const { postId } = req.params;
        const { text } = req.body;

        if(!text || !text.trim()) {
            return res.status(400).json({
                message: "Comment cannot be empty"
            });
        }
    
        const updatedPost = await postModel.findByIdAndUpdate(
            postId,
            {
                $push: 
                {
                    comments: 
                    {
                        userId,
                        text
                    }
    
                }
            },
            {
                returnDocument: "after"
            }
        ).populate("comments.userId", "username profilePic");
    
        if(!updatedPost) {
            return res.status(404).json({
                message: "Post not found!"
            })
        }
        
        return res.status(200).json({
            message: "Comment added successfully",
            comment: updatedPost.comments[updatedPost.comments.length-1],
            commentsCount: updatedPost.comments.length
        });


    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error!"
        });
    }
}


const deleteComment = async (req,res) => {
    try {
        const { postId, commentId } = req.params;
        const userId = req.user._id;

        const post = await postModel.findById(postId);

        if(!post) {
            return res.status(404).json({
                message: "Post not found!"
            });
        }

        const comment = post.comments.find(
            comment => comment._id.toString() === commentId        
        )

        if(!comment) {
            return res.status(404).json({
                message: "Comment not found!"
            });
        }

        if(comment.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You can only delete your own comment"
            });
        }

        const updatedPost = await postModel.findByIdAndUpdate(
            postId,
            {
                $pull: 
                {
                    comments: {
                        _id: commentId
                    }
                }
            },
            {
                returnDocument: "after"
            }
        );

        return res.status(200).json({
            message: "Comment deleted successfully",
            commentId,
            commentsCount: updatedPost.comments.length
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error!"
        });
    }
}


const deletePost = async (req,res) => {
    try {

        const { postId } = req.params;
        const userId = req.user._id;

        const post = await postModel.findById(postId);

        if(!post) {
            return res.status(404).json({
                message: "Post not found!"
            });
        }

        if(post.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "Only post owner can delete the post!"
            });
        }

        await cloudinary.uploader.destroy(post.publicId);

        const deletedPost = await postModel.findByIdAndDelete(postId);

        if(!deletedPost) {
            return res.status(400).json({
                message: "Unable to delete post from database!"
            });
        }

        return res.status(200).json({
            message: "Post deleted successfully",
            postId
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
}


module.exports = { uploadImage, allPosts, likePost, commentPost, deleteComment, deletePost };
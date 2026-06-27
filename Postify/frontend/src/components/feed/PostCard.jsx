// import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
// import { likePost } from "../../services/api";

const PostCard = ({ post, onLike }) => {

  const { user } = useAuth();

  const isLiked = post.likes.includes(user._id);
  const likesCount = post.likes.length;

  return (
    <article className="bg-white dark:bg-gray-900 mb-4 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">

      {/* Header */}
      <div className="flex items-center gap-3 p-4">

        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">

          {post.userId?.profilePic ? (
            <img
              src={post.userId.profilePic}
              alt={post.userId.username}
              className="w-full h-full object-cover"
            />
          ) : null}

        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {post.userId?.username}
          </h3>

          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

      </div>

      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full aspect-square object-cover"
        />
      )}

      {/* Content */}
      <div className="p-4 space-y-3">

        <p className="text-gray-800 dark:text-gray-200">
          {post.caption}
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-500">
              
          <button
            onClick={() => onLike(post._id)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
          >
            <span className="text-xl">
              {isLiked ? "❤️" : "🤍"}
            </span>
            <span>
              {likesCount}
            </span>
          </button>

          <button
              className="flex items-center gap-2 text-sm font-medium text-gray-600"
          >
              <span className="text-xl">💬</span>
              <span>
                  {post.comments?.length}
              </span>

          </button>

        </div>

      </div>

    </article>
  );
};

export default PostCard;
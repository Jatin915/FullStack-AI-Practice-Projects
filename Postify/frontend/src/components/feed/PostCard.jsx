import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const PostCard = ({ post, onLike, onComment, onDelete }) => {
  const { user } = useAuth();

  const [activeMenu, setActiveMenu] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const isLiked = post.likes.includes(user?._id);
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

        <div className="flex justify-between w-full">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {post.userId?.username}
            </h3>

            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>

          {user?._id === post.userId?._id && (
            <div className="relative">
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === post._id ? null : post._id)
                }
                className="w-8 h-8 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center transition"
                title="More"
              >
                ⋮
              </button>

              {activeMenu === post._id && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden z-20">
                  <button
                    onClick={() => {
                      setConfirmDeleteId(post._id);
                      setActiveMenu(null);
                    }}
                    className="w-full px-4 py-2 text-left text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}

          {confirmDeleteId && (
            <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center">
              <div className="w-[90%] max-w-sm rounded-2xl bg-white dark:bg-zinc-900 p-6 shadow-2xl border border-zinc-200 dark:border-zinc-700">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Delete Post?
                </h3>
                <p className="mt-2 text-sm text-zinc-500">
                  This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      onDelete(post._id);
                      setConfirmDeleteId(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
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
        <p className="text-gray-800 dark:text-gray-200">{post.caption}</p>

        <div className="flex items-center gap-6 text-sm text-gray-500">
          <button
            onClick={() => onLike(post._id)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
          >
            <span className="text-xl">{isLiked ? "❤️" : "🤍"}</span>
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => {
              onComment(post);
            }}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
          >
            <span className="text-xl">💬</span>
            <span>{post.comments.length}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;

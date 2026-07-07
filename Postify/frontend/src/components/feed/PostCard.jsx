import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const PostCard = ({ post, onLike, onComment, onDelete }) => {
  const { user } = useAuth();
  const shouldReduceMotion = useReducedMotion();

  const [activeMenu, setActiveMenu] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const isLiked = post.likes.includes(user?._id);
  const likesCount = post.likes.length;

  const navigate = useNavigate();

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.35, ease: "easeOut" }
      }
      className="bg-white dark:bg-zinc-950 mb-5 border border-zinc-200/80 dark:border-zinc-800/80 rounded-[1.4rem] overflow-hidden shadow-sm dark:shadow-none transition-colors"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
        <div
          onClick={() => navigate(`/profile/${post.userId._id}`)}
          className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden cursor-pointer ring-1 ring-zinc-200 dark:ring-zinc-700 transition-opacity hover:opacity-85"
        >
          {post.userId?.profilePic ? (
            <img
              src={post.userId.profilePic}
              alt={post.userId.username}
              className="w-full h-full object-cover"
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-between">
          <div className="min-w-0">
            <h3
              onClick={() => navigate(`/profile/${post.userId._id}`)}
              className="cursor-pointer truncate font-semibold text-[0.95rem] text-zinc-950 dark:text-zinc-100 hover:underline underline-offset-2"
            >
              {post.userId?.username}
            </h3>

            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>

          {user?._id === post.userId?._id && (
            <div className="relative">
              <button
                onClick={() =>
                  setActiveMenu(activeMenu === post._id ? null : post._id)
                }
                className="w-9 h-9 rounded-full text-xl leading-none text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center justify-center transition-colors"
                title="More"
              >
                ⋮
              </button>

              {activeMenu === post._id && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-xl overflow-hidden z-20">
                  <button
                    onClick={() => {
                      setConfirmDeleteId(post._id);
                      setActiveMenu(null);
                    }}
                    className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-2"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6V4h8v2" />
                      <path d="m19 6-1 15H6L5 6" />
                      <path d="M10 11v5" />
                      <path d="M14 11v5" />
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {confirmDeleteId && (
            <div className="fixed inset-0 z-60 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-sm rounded-[1.5rem] bg-white dark:bg-zinc-950 p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Delete Post?
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                  This action cannot be undone.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      onDelete(post._id);
                      setConfirmDeleteId(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-sm font-semibold text-white transition-all"
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
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="post"
          className="w-full max-h-[680px] object-cover bg-zinc-100 dark:bg-zinc-900"
        />
      )}

      {/* Content */}
      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center gap-1 mb-3">
          <button
            onClick={() => onLike(post._id)}
            className="group flex min-h-10 items-center gap-2 rounded-full px-2.5 -ml-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-6 w-6 transition-transform duration-200 group-active:scale-125 ${isLiked ? "text-red-500" : ""}`}
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
            </svg>
            <span>{likesCount}</span>
          </button>

          <button
            onClick={() => {
              onComment(post);
            }}
            className="group flex min-h-10 items-center gap-2 rounded-full px-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-500 transition-all active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 transition-transform duration-200 group-hover:scale-105"
              aria-hidden="true"
            >
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
            </svg>
            <span>{post.comments.length}</span>
          </button>
        </div>
        <p className="text-[0.95rem] leading-6 text-zinc-800 dark:text-zinc-200 break-words">
          {post.caption}
        </p>
      </div>
    </motion.article>
  );
};

export default PostCard;

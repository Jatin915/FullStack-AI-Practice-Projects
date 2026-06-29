import { useState } from "react";

const CommentModal = ({
  post,
  onClose,
  onComment,
  onDeleteComment,
  currentUser,
}) => {
  const [comment, setComment] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleSubmit = () => {
    const text = comment.trim();
    if (!text) return;
    onComment(post._id, text);
    setComment("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[80vh] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Comments
            </h2>
            <p className="text-sm text-zinc-500">
              {post?.comments.length} Comments
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center gap-3 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          {post?.userId?.profilePic ? (
            <img
              src={post.userId.profilePic}
              alt={post.userId.username}
              className="w-11 h-11 rounded-full object-cover"
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          )}

          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              {post?.userId?.username}
            </h3>
            <p className="text-sm text-zinc-500 line-clamp-1">
              {post?.caption}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {post?.comments.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 gap-2">
              <div className="text-5xl">💬</div>
              <h3 className="text-lg font-semibold">No comments yet</h3>
              <p>Be the first one to comment.</p>
            </div>
          ) : (
            post.comments.map((commentItem) => (
              <div key={commentItem._id} className="flex items-start gap-3">
                {commentItem.userId?.profilePic ? (
                  <img
                    src={commentItem.userId.profilePic}
                    alt={commentItem.userId.username}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-700 shrink-0" />
                )}

                <div className="flex-1 flex items-start justify-between gap-3 md:max-w-fit rounded-2xl bg-zinc-100 dark:bg-zinc-800 px-4 py-3">
                  <div>
                    <h4 className="font-semibold text-sm text-zinc-900 dark:text-white">
                      {commentItem.userId?.username}
                    </h4>
                    <p className="text-zinc-700 dark:text-zinc-300 mt-1 wrap-break-word">
                      {commentItem.text}
                    </p>
                  </div>
                  {(currentUser?._id === commentItem.userId?._id ||
                    currentUser?._id === post.userId?._id) && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === commentItem._id
                              ? null
                              : commentItem._id,
                          )
                        }
                        className="w-8 h-8 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center transition"
                        title="More"
                      >
                        ⋮
                      </button>

                      {activeMenu === commentItem._id && (
                        <div className="absolute right-0 mt-2 w-32 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden z-20">
                          <button
                            onClick={() => {
                              setConfirmDeleteId(commentItem._id);
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
                          Delete Comment?
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
                              onDeleteComment(post._id, confirmDeleteId);
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
            ))
          )}
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 flex gap-3">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="Write a comment..."
            className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleSubmit}
            disabled={!comment.trim()}
            className="px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;

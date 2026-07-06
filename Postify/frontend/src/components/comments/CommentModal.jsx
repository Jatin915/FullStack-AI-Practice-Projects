import { useState } from "react";
import { usePosts } from "../../context/PostsContext";
import { useAuth } from "../../context/AuthContext";

const CommentModal = () => {

  const {
    selectedPost,
    handleComment,
    handleDeleteComment,
    handleCloseComments,
  } = usePosts();

  const { user } = useAuth();

  const [comment, setComment] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleSubmit = () => {
    const text = comment.trim();
    if (!text) return;
    handleComment(selectedPost._id, text);
    setComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 backdrop-blur-sm pb-[calc(5.75rem+env(safe-area-inset-bottom))] sm:items-center sm:px-6 sm:pt-4 sm:pb-26">
      <div className="w-full h-[min(76dvh,calc(100%-1rem))] rounded-[1.75rem] border border-zinc-200/80 bg-white shadow-2xl flex flex-col overflow-hidden dark:border-zinc-800/80 dark:bg-zinc-950 sm:h-[78vh] sm:max-w-2xl sm:rounded-[1.75rem]">
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-200/80 px-4 py-3.5 dark:border-zinc-800/80 sm:px-6 sm:py-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-xl">
              Comments
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500 sm:text-sm">
              {selectedPost?.comments.length} Comments
            </p>
          </div>
          <button
            onClick={handleCloseComments}
            className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white active:scale-95 transition-all"
          >
            ✕
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-3 border-b border-zinc-200/80 bg-zinc-50/60 px-4 py-3 dark:border-zinc-800/80 dark:bg-zinc-900/35 sm:px-6 sm:py-4">
          {selectedPost?.userId?.profilePic ? (
            <img
              src={selectedPost.userId.profilePic}
              alt={selectedPost.userId.username}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-700"
            />
          ) : (
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-700 bg-zinc-300 dark:bg-zinc-700" />
          )}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-zinc-950 dark:text-zinc-100 sm:text-base">
              {selectedPost?.userId?.username}
            </h3>
            <p className="mt-0.5 truncate text-sm text-zinc-500 dark:text-zinc-400">
              {selectedPost?.caption}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-4 sm:px-6 sm:py-5 sm:space-y-5">
          {selectedPost?.comments.length === 0 ? (
            <div className="h-full min-h-52 flex flex-col items-center justify-center text-center text-zinc-500 dark:text-zinc-400 gap-2">
              <div className="text-4xl opacity-80 sm:text-5xl">💬</div>
              <h3 className="text-base font-semibold text-zinc-700 dark:text-zinc-300 sm:text-lg">No comments yet</h3>
              <p>Be the first one to comment.</p>
            </div>
          ) : (
            selectedPost.comments.map((commentItem) => (
              <div key={commentItem._id} className="flex items-start gap-2.5 sm:gap-3">
                {commentItem.userId?.profilePic ? (
                  <img
                    src={commentItem.userId.profilePic}
                    alt={commentItem.userId.username}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-700"
                  />
                ) : (
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-700 bg-zinc-300 dark:bg-zinc-700" />
                )}
                <div className="min-w-0 flex-1 flex items-start justify-between gap-2 rounded-[1.15rem] bg-zinc-100/90 px-3.5 py-2.5 dark:bg-zinc-900 sm:max-w-[85%] sm:px-4 sm:py-3">
                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                      {commentItem.userId?.username}
                    </h4>
                    <p className="mt-1 text-[0.95rem] leading-6 text-zinc-700 dark:text-zinc-300 break-words">
                      {commentItem.text}
                    </p>
                  </div>
                  {(user?._id === commentItem.userId?._id ||
                    user?._id === selectedPost.userId?._id) && (
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === commentItem._id
                              ? null
                              : commentItem._id,
                          )
                        }
                        className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-white transition-colors"
                        title="More"
                      >
                        ⋮
                      </button>

                      {activeMenu === commentItem._id && (
                        <div className="absolute right-0 mt-2 w-36 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl shadow-xl overflow-hidden z-20">
                          <button
                            onClick={() => {
                              setConfirmDeleteId(commentItem._id);
                              setActiveMenu(null);
                            }}
                            className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {confirmDeleteId && (
                    <div className="fixed inset-0 z-60 bg-black/55 backdrop-blur-sm flex items-center justify-center p-4">
                      <div className="w-full max-w-sm rounded-[1.5rem] bg-white dark:bg-zinc-950 p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                          Delete Comment?
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
                              handleDeleteComment(selectedPost._id, confirmDeleteId);
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
            ))
          )}
        </div>

        <div className="shrink-0 border-t border-zinc-200/80 bg-white/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/90 sm:p-4">
          <div className="flex items-end gap-2 sm:gap-3">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Write a comment..."
              className="min-w-0 flex-1 rounded-[1.15rem] border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 transition"
            />
            <button
              onClick={handleSubmit}
              disabled={!comment.trim()}
              className="min-h-11 shrink-0 px-4 sm:px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 text-sm text-white font-semibold transition-all"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;

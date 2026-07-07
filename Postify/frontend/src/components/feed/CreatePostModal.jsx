import React, { useRef, useState } from "react";
import { usePosts } from "../../context/PostsContext";
import { motion, useReducedMotion } from "framer-motion";

const CreatePostModal = () => {
  const shouldReduceMotion = useReducedMotion();

  const { handleCreatePost, handleCloseCreatePost } = usePosts();

  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [creating, setCreating] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-60"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 380, damping: 32, mass: 0.8 }
        }
        className="relative w-full max-w-lg mx-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Create Post
          </h2>
          <button
            className="text-2xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            onClick={handleCloseCreatePost}
            aria-label="Close"
            type="button"
          >
            &times;
          </button>
        </div>
        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Image Section */}
          {selectedImage ? (
            <div className="w-full flex justify-center">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="max-h-64 object-contain rounded-xl border border-zinc-200 dark:border-zinc-800"
              />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl py-10 bg-zinc-50 dark:bg-zinc-800">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2 h-14 w-14 text-zinc-400 dark:text-zinc-500"
                aria-hidden="true"
              >
                <path d="M14.5 4 16 6h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l1.5-2h5Z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              <span className="mb-3 text-zinc-500 dark:text-zinc-400 font-medium">
                Choose an image
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() => fileInputRef.current?.click()}
              >
                Select Image
              </button>
            </div>
          )}
          {/* Caption */}
          <textarea
            className="w-full min-h-20 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={2000}
          />
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            className="px-4 py-2 rounded-lg font-medium bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
            onClick={handleCloseCreatePost}
            disabled={creating}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow ${!selectedImage || creating ? "opacity-60 cursor-not-allowed" : ""}`}
            onClick={() =>
              handleCreatePost({
                caption,
                selectedImage,
                setCreating,
                resetForm: () => {
                  setCaption("");
                  setSelectedImage(null);
                },
              })
            }
            disabled={!selectedImage || creating}
          >
            {creating ? "Posting..." : "Post"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreatePostModal;

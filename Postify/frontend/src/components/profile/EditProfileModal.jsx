import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostsContext";
import { motion, useReducedMotion } from "framer-motion";

const EditProfileModal = () => {
  const shouldReduceMotion = useReducedMotion();
  const { user } = useAuth();
  const {handleUpdateProfile,handleCloseEditProfile,isEditProfileModalOpen,} = usePosts();
  
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isEditProfileModalOpen || !user?._id) return;
    
    setUsername(user.username || "");
    setBio(user.bio || "");
    setSelectedImage(null);
  }, [isEditProfileModalOpen, user]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(file);
  };

  const handleSubmit = () => {
    handleUpdateProfile({
      username,
      bio,
      selectedImage,
      setSaving,
      resetForm: () => {
        setSelectedImage(null);
      },
    });
  };

  return (
    <motion.div       
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3 backdrop-blur-sm sm:p-4">
      <motion.div 
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 380, damping: 32, mass: 0.8 }
        }
        className="w-full max-h-[90dvh] max-w-md overflow-y-auto rounded-[1.75rem] border border-zinc-200/80 bg-white shadow-2xl dark:border-zinc-800/80 dark:bg-zinc-950">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 px-4 py-3.5 dark:border-zinc-800/80 sm:px-6 sm:py-4">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button
            onClick={handleCloseEditProfile}
            className="text-zinc-400 hover:text-zinc-200 text-xl transition-colors"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {/* Body */}
        <div className="flex flex-col items-center px-6 py-6">
          {/* Avatar Preview */}
          <div className="relative mb-4">
            {selectedImage || user.profilePic ? (
              <img
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : user.profilePic
                }
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-zinc-200 dark:border-zinc-800"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800 border-4 border-zinc-100 dark:border-zinc-900" />
            )}
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute left-1/2 -bottom-3 -translate-x-1/2 bg-zinc-800 px-3 py-1 rounded-full text-xs text-zinc-300 hover:bg-zinc-700 transition-colors shadow"
            >
              Change Photo
            </button>
          </div>
          {/* Username */}
          <div className="w-full mb-3">
            <div className="mb-1 flex items-center justify-between">
              <label
                className="block text-sm text-zinc-500 dark:text-zinc-400"
                htmlFor="edit-username"
              >
                Username
              </label>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {username.length}/30
              </span>
            </div>
            <input
              id="edit-username"
              type="text"
              maxLength={30}
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={saving}
            />
          </div>
          {/* Bio */}
          <div className="w-full mb-2">
            <div className="mb-1 flex items-center justify-between">
              <label
                className="block text-sm text-zinc-500 dark:text-zinc-400"
                htmlFor="edit-bio"
              >
                Bio
              </label>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                {bio.length}/150
              </span>
            </div>
            <textarea
              id="edit-bio"
              maxLength={150}
              className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-950 dark:text-zinc-100 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={saving}
            />
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-zinc-800">
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition"
            onClick={handleCloseEditProfile}
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditProfileModal;

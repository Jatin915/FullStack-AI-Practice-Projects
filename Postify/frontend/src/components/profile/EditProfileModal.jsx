import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostsContext";

const EditProfileModal = () => {
  const { user } = useAuth();
  const { handleUpdateProfile, handleCloseEditProfile } = usePosts();
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900 bg-opacity-60">
      <div className="bg-zinc-950 text-zinc-100 w-full max-w-md mx-4 rounded-2xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
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
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : user.profilePic
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-zinc-800"
            />
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
            <label className="block text-sm text-zinc-400 mb-1" htmlFor="edit-username">
              Username
            </label>
            <input
              id="edit-username"
              type="text"
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-blue-500 transition"
              value={username}
              onChange={e => setUsername(e.target.value)}
              disabled={saving}
            />
          </div>
          {/* Bio */}
          <div className="w-full mb-2">
            <label className="block text-sm text-zinc-400 mb-1" htmlFor="edit-bio">
              Bio
            </label>
            <textarea
              id="edit-bio"
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-blue-500 transition resize-none"
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
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
      </div>
    </div>
  );
};

export default EditProfileModal;

import { usePosts } from "../context/PostsContext";
import PostCard from "../components/feed/PostCard";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { userId } = useParams();
  const {user} = useAuth();

  const {
    profile,
    profileLoading,
    getProfile,
    handleLike,
    handleOpenComments,
    handleDeletePost,
    handleOpenEditProfile
  } = usePosts();

  useEffect(() => {
    getProfile(userId);
  }, [userId]);

  if (profileLoading) {
    return (
      <div className="h-screen text-2xl flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const myPosts = profile?.posts || [];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <div className="flex gap-5">
          {profile.user.profilePic ? (
            <img
              src={profile.user.profilePic}
              alt={`${profile.user.username} profile`}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-gray-600 mb-4" />
          )}

          <div className="flex flex-col justify-center items-start">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {profile.user.username}
            </h1>
            <p className="text-gray-500 dark:text-gray-300 text-center">
              {profile.user.bio && profile.user.bio.trim() !== ""
                ? profile.user.bio
                : "No bio yet"}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          {(user._id === profile?.user._id) && <button
            onClick={handleOpenEditProfile}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Edit Profile
          </button>}

          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Total Posts
            </h2>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {myPosts.length}
            </p>
          </div>
        </div>
      </div>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          My Posts
        </h3>
        {myPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 space-y-4 py-20">
            <span className="text-7xl">📷</span>
            <h4 className="text-2xl font-semibold">No Posts Yet</h4>
            <p className="max-w-xs">
              You haven't created any posts yet. Start sharing your moments now!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {myPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onLike={handleLike}
                onComment={handleOpenComments}
                onDelete={handleDeletePost}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;

import { usePosts } from "../context/PostsContext";
import PostCard from "../components/feed/PostCard";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageLoader from "../components/ui/PageLoader";
import PageTransition from "../components/ui/PageTransition";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useAuth();

  const {
    profile,
    profileLoading,
    getProfile,
    handleLike,
    handleOpenComments,
    handleDeletePost,
    handleOpenEditProfile,
  } = usePosts();

  useEffect(() => {
    getProfile(userId);
  }, [userId]);

  if (profileLoading) {
    return <PageLoader text="Loading profile..." />;
  }

  if (!profile?.user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4 text-center">
        <div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto h-14 w-14 text-zinc-400 dark:text-zinc-500"
            aria-hidden="true"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
            <path d="M18 3l3 3" />
            <path d="m21 3-3 3" />
          </svg>
          <h2 className="mt-4 text-xl font-bold text-zinc-950 dark:text-zinc-100">
            Profile not found
          </h2>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            This profile may not exist or could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const myPosts = profile?.posts || [];

  return (
    <PageTransition className="w-full max-w-3xl mx-auto px-3 py-4 sm:px-5 sm:py-6">
      {/* existing Profile content */}
      <div className="w-full max-w-3xl mx-auto px-3 py-4 sm:px-5 sm:py-6">
        <div className="mb-7 overflow-hidden rounded-[1.6rem] border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800/80 dark:bg-zinc-950 dark:shadow-none sm:mb-9">
          <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              {profile.user.profilePic ? (
                <img
                  src={profile.user.profilePic}
                  alt={`${profile.user.username} profile`}
                  className="h-20 w-20 shrink-0 rounded-full object-cover ring-4 ring-zinc-100 dark:ring-zinc-900 sm:h-28 sm:w-28"
                />
              ) : (
                <div className="h-20 w-20 shrink-0 rounded-full bg-zinc-200 ring-4 ring-zinc-100 dark:bg-zinc-800 dark:ring-zinc-900 sm:h-28 sm:w-28" />
              )}

              <div className="min-w-0 flex-1">
                <h1 className="truncate text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-2xl">
                  {profile.user.username}
                </h1>
                <p className="mt-1.5 max-w-md break-words text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:text-[0.95rem]">
                  {profile.user.bio && profile.user.bio.trim() !== ""
                    ? profile.user.bio
                    : "No bio yet"}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-zinc-200/80 pt-4 dark:border-zinc-800/80 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
              <div className="flex items-baseline gap-1.5 sm:order-2 sm:mr-1">
                <span className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100">
                  {myPosts.length}
                </span>
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {myPosts.length === 1 ? "Post" : "Posts"}
                </span>
              </div>

              {user?._id === profile.user._id && (
                <button
                  onClick={handleOpenEditProfile}
                  className="cursor-pointer rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-800 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 sm:order-1"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <section className="pb-24 sm:pb-28">
          <div className="mb-4 flex items-center justify-between px-1 sm:mb-5">
            <h3 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-xl">
              Posts
            </h3>
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
              {myPosts.length} total
            </span>
          </div>
          {myPosts.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-zinc-300 bg-zinc-50/60 px-6 py-14 text-center dark:border-zinc-800 dark:bg-zinc-900/30">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-14 w-14 text-zinc-400 dark:text-zinc-500 sm:h-16 sm:w-16"
                aria-hidden="true"
              >
                <path d="M14.5 4 16 6h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l1.5-2h5Z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              <h4 className="mt-4 text-lg font-bold text-zinc-800 dark:text-zinc-200 sm:text-xl">
                No Posts Yet
              </h4>
              <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                You haven't created any posts yet. Start sharing your moments
                now!
              </p>
            </div>
          ) : (
            <div className="space-y-5">
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
    </PageTransition>
  );
};

export default Profile;

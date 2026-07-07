import PostCard from "../components/feed/PostCard";
import { usePosts } from "../context/PostsContext";
import PostSkeleton from "../components/ui/PostSkeleton";
import PageTransition from "../components/ui/PageTransition";

const Home = () => {
  const {
    posts,
    loadingPosts,
    handleLike,
    handleOpenComments,
    handleDeletePost,
  } = usePosts();

  if (loadingPosts) {
    <div className="mx-auto w-full max-w-2xl space-y-5 pb-24 sm:pb-28">
      {Array.from({ length: 3 }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>;
  }

  return (
    <PageTransition className="mx-auto w-full max-w-2xl pb-24 sm:pb-28">
      {/* existing Home content */}
      <div className="mx-auto w-full max-w-2xl pb-24 sm:pb-28">
        <div className="mb-4 flex items-end justify-between px-1 sm:mb-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-2xl">
              Feed
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              See what people are sharing
            </p>
          </div>
          <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </span>
        </div>

        {posts.length === 0 ? (
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
            <h2 className="mt-4 text-lg font-bold text-zinc-800 dark:text-zinc-200 sm:text-xl">
              No posts yet
            </h2>
            <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              The feed is empty right now. Create the first post and start
              sharing.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
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
      </div>
    </PageTransition>
  );
};

export default Home;

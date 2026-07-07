import PostCard from "../components/feed/PostCard";
import { usePosts } from "../context/PostsContext";

const Home = () => {
  const {
    posts,
    loadingPosts,
    handleLike,
    handleOpenComments,
    handleDeletePost,
  } = usePosts();

  if (loadingPosts) {
    return (
      <div className="h-screen text-2xl flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
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
          <span className="text-5xl opacity-80 sm:text-6xl">📷</span>
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
  );
};

export default Home;

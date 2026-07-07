const PostSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-[1.5rem] border border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-950">
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="h-11 w-11 rounded-full bg-zinc-200 dark:bg-zinc-800" />

        <div className="space-y-2">
          <div className="h-3.5 w-28 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-3 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>

      <div className="aspect-square w-full bg-zinc-200 dark:bg-zinc-800" />

      <div className="space-y-3 px-4 py-4">
        <div className="flex gap-4">
          <div className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="h-3.5 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-800" />

        <div className="h-3.5 w-2/5 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
};

export default PostSkeleton;
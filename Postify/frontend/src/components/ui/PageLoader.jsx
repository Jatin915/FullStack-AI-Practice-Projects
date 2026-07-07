const PageLoader = ({ text = "Loading..." }) => {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full items-center justify-center px-4">
      <div className="flex flex-col items-center gap-3 text-zinc-500 dark:text-zinc-400">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-zinc-700 dark:border-t-blue-500" />

        <p className="text-sm font-medium">{text}</p>
      </div>
    </div>
  );
};

export default PageLoader;
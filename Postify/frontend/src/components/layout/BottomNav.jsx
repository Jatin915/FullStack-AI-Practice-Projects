import { Link } from 'react-router-dom';
import { usePosts } from '../../context/PostsContext';
import { useAuth } from '../../context/AuthContext';

const BottomNav = () => {

  const {user} = useAuth();
  const {handleOpenCreatePost} = usePosts();

    return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">

      <div className="max-w-md mx-auto h-16 px-4 flex items-center justify-between">

        <Link
          to="/"
          className="flex flex-col items-center gap-1 text-gray-600 transition-colors hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs font-medium">Home</span>
        </Link>

        <button
          onClick={handleOpenCreatePost}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-r from-violet-600 to-blue-500 text-white text-2xl font-bold shadow-lg hover:scale-105 transition-transform"
        >
            +
        </button>

        <Link
          to={`/profile/${user._id}`}
          className="flex flex-col items-center gap-1 text-gray-600 transition-colors hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
        >
          <span className="text-xl">👤</span>
          <span className="text-xs font-medium">Profile</span>
        </Link>

      </div>

    </nav>
  );
}

export default BottomNav;
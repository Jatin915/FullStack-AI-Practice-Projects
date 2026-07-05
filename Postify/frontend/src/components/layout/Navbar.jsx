import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {usePosts} from "../../context/PostsContext";

const Navbar = () => {

  const navigate = useNavigate();
  const {resetPostsContext} = usePosts();
  const {handleLogout} = useAuth();

  async function logoutUser () {
    await handleLogout();
    resetPostsContext();
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-extrabold bg-linear-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent tracking-tight"
        >
          Postify
        </Link>

        <div className="flex items-center gap-3">

          <button className="px-4 py-2 rounded-xl border border-gray-200 bg-gray-100 text-sm font-medium transition-all hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800">
            🌙 Theme
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer md:block px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium transition-all hover:bg-red-600 shadow-sm">
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;
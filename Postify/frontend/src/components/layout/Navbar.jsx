import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {usePosts} from "../../context/PostsContext";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const {resetPostsContext} = usePosts();
  const {handleLogout} = useAuth();

  async function logoutUser() {
    const success = await handleLogout();

    if (success !== false) {
      resetPostsContext();
      navigate("/login");
    }
  }

  return (
    <nav className="sticky top-0 z-50 h-14 sm:h-16 border-b border-zinc-200/80 dark:border-zinc-800 bg-white/95 dark:bg-black/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/85 dark:supports-[backdrop-filter]:bg-black/85">
      <div className="w-full max-w-2xl mx-auto h-full px-3 sm:px-5 flex items-center justify-between gap-3">

        <Link
          to="/"
          className="text-[1.65rem] sm:text-3xl leading-none font-black tracking-[-0.055em] text-zinc-950 dark:text-white select-none transition-opacity duration-200 hover:opacity-70 shrink-0"
        >
          Postify
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-90 transition-all duration-150 touch-manipulation"
            aria-label="Toggle Theme"
          >
            <span className="text-[1.1rem] sm:text-xl leading-none">{theme === "dark" ? "☀️" : "🌙"}</span>
          </button>
          <button
            onClick={logoutUser}
            aria-label="Logout"
            className="h-9 sm:h-10 px-3 sm:px-4 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 text-xs sm:text-sm font-semibold transition-all duration-150 touch-manipulation whitespace-nowrap"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
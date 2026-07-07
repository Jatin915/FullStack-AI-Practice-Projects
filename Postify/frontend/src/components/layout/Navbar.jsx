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
            {theme === "dark" ? (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 sm:h-6 sm:w-6"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.42 1.42" />
    <path d="m17.65 17.65 1.42 1.42" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.35 17.65-1.42 1.42" />
    <path d="m19.07 4.93-1.42 1.42" />
  </svg>
) : (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 sm:h-6 sm:w-6"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
  </svg>
)}
          </button>
          <button
            onClick={logoutUser}
            aria-label="Logout"
            className="h-9 sm:h-10 px-3 sm:px-4 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 text-xs sm:text-sm font-semibold transition-all duration-150 touch-manipulation whitespace-nowrap flex items-center justify-center gap-1.5"
          >
            <svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]"
  aria-hidden="true"
>
  <path d="M10 17l5-5-5-5" />
  <path d="M15 12H3" />
  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
</svg>
<span>Logout</span>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
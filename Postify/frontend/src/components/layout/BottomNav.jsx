import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { usePosts } from "../../context/PostsContext";
import { useAuth } from "../../context/AuthContext";

const BottomNav = () => {
  const { user } = useAuth();
  const { handleOpenCreatePost, handleCloseCreatePost, handleCloseComments, handleCloseEditProfile } = usePosts();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const getRouteTab = () =>
    location.pathname.startsWith("/profile/") ? "profile" : "home";

  const [activeTab, setActiveTab] = useState(getRouteTab);

  useEffect(() => {
    setActiveTab(getRouteTab());
  }, [location.pathname]);

  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 420, damping: 34, mass: 0.8 };

  const openCreatePost = () => {
    handleOpenCreatePost();
  };

  const navItemClass =
    "relative z-10 flex h-13 min-w-0 flex-1 items-center justify-center rounded-[1.6rem] text-zinc-600 dark:text-zinc-300 transition-colors duration-200 touch-manipulation sm:h-14";

  const activeTextClass = "text-zinc-950 dark:text-white";

  const ActivePill = () => (
    <motion.span
      layoutId="bottom-nav-active-pill"
      transition={springTransition}
      className="absolute inset-0 -z-10 rounded-[1.6rem] border border-black/5 bg-black/10 shadow-sm shadow-black/10 backdrop-blur-xl dark:border-white/15 dark:bg-white/18 dark:shadow-black/30"
    />
  );

  return (
    <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] sm:px-5 sm:pb-4">
      <div className="pointer-events-auto mx-auto w-full max-w-[25rem] rounded-[2rem] border border-white/45 bg-white/55 p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.16)] backdrop-blur-3xl backdrop-saturate-150 dark:border-white/10 dark:bg-black/45 dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] sm:max-w-md sm:p-2">
        <div className="grid grid-cols-3 items-center gap-1">
          <Link
            to="/"
            onClick={() => {
              setActiveTab("home");
              handleCloseCreatePost();
              handleCloseComments();
              handleCloseEditProfile();
            }}
            aria-label="Home"
            className={`${navItemClass} ${activeTab === "home" ? activeTextClass : ""}`}
          >
            {activeTab === "home" && <ActivePill />}
            <span
              className="text-[1.45rem] leading-none sm:text-[1.55rem]"
              aria-hidden="true"
            >
              🏠
            </span>
          </Link>

          <button
            type="button"
            onClick={() => {
              openCreatePost();
              handleCloseComments();
              handleCloseEditProfile();
            }}
            aria-label="Create post"
            className={navItemClass}
          >
            <span
              className="flex h-8 cursor-pointer w-8 items-center justify-center rounded-[0.6rem] border-2 border-current text-[1.4rem] font-light leading-none sm:h-9 sm:w-9"
              aria-hidden="true"
            >
              +
            </span>
          </button>

          <Link
            to={`/profile/${user?._id}`}
            onClick={() => {
              setActiveTab("profile");
              handleCloseCreatePost();
              handleCloseComments();
              handleCloseEditProfile();
            }}
            aria-label="Profile"
            className={`${navItemClass} ${activeTab === "profile" ? activeTextClass : ""}`}
          >
            {activeTab === "profile" && <ActivePill />}
            <span
              className="text-[1.45rem] leading-none sm:text-[1.55rem]"
              aria-hidden="true"
            >
              👤
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;

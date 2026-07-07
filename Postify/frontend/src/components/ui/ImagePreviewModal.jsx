import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const ImagePreviewModal = ({ imageUrl, alt = "Post preview", onClose }) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-[100] flex h-dvh w-screen items-center justify-center bg-white/90 p-4 backdrop-blur-2xl dark:bg-black/90 sm:p-8"
    >
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, scale: 0.96, y: 12 }
        }
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 360,
                damping: 30,
                mass: 0.8,
              }
        }
        onClick={(event) => event.stopPropagation()}
        className="relative flex h-full w-full items-center justify-center"
      >
        <img
          src={imageUrl}
          alt={alt}
          className="block max-h-full max-w-full select-none object-contain"
          draggable="false"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close image preview"
          className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-zinc-950 shadow-lg backdrop-blur-xl transition-colors hover:bg-white/90 dark:border-white/15 dark:bg-black/60 dark:text-white dark:hover:bg-black/80 sm:right-6"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ImagePreviewModal;
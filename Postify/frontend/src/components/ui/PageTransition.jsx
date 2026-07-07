import { motion, useReducedMotion } from "framer-motion";

const PageTransition = ({ children, className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.3, ease: "easeOut" }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
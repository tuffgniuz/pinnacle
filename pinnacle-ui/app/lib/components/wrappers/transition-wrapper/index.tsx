import { FC, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TransitionWrapper: FC<{ key: string | number; children: ReactNode }> = ({
  key,
  children,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionWrapper;

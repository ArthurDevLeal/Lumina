import { ChildrenType } from "@/types/type";
import { AnimatePresence, motion } from "motion/react";
export default function Root({ children }: { children: ChildrenType }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex flex-col gap-8"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

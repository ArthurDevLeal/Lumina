import { ChildrenType } from "@/types/type";
import { motion } from "framer-motion";
export default function Root({ children }: { children: ChildrenType }) {
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, scale: 0.99, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-8 max-w-7xl mx-auto p-12 pb-12"
    >
      {children}
    </motion.div>
  );
}
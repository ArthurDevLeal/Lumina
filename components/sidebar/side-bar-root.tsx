import { motion } from "framer-motion";
import { ReactNode } from "react";
interface SidebarRootProps {
  children: ReactNode;
}

export default function SidebarRoot({ children }: SidebarRootProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.99, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="hidden md:flex flex-col gap-8 w-[280px] h-screen sticky top-0 pl-8 pr-6 py-8 bg-card backdrop-blur-2xl border-r border-border z-20"
    >
      {children}
    </motion.aside>
  );
}

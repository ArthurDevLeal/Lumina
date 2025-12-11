"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  to?: string;
  icon: LucideIcon;
  label: string;
}

export default function SidebarItem({ to, icon: Icon, label }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = to === pathname;
  return (
    <Link
      href={to!}
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm mb-1 ${
        isActive ? "text-white" : "text-slate-600 hover:bg-border hover:text-foreground"
      }`}
    >
      <div
        className={`p-2 rounded-lg transition-colors ${
          isActive
            ? "bg-card/20 text-primary-foreground"
            : "bg-slate-100 text-muted-foreground group-hover:bg-card group-hover:text-foreground"
        }`}
      >
        <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
      </div>
      <span className="font-medium tracking-tight">{label}</span>
      {isActive && (
        <motion.div
          layoutId="activeSidebar"
          className="absolute inset-0 bg-card-foreground rounded-xl -z-10 "
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}

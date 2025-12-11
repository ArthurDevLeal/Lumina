import { ReactNode } from "react";

interface SidebarRootProps {
  children: ReactNode;
}

export default function SidebarRoot({ children }: SidebarRootProps) {
  return (
    <aside className="hidden md:flex flex-col gap-8 w-[280px] h-screen sticky top-0 pl-8 pr-6 py-8 bg-card backdrop-blur-2xl border-r border-border z-20">
      {children}
    </aside>
  );
}

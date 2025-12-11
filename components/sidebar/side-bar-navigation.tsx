import { ReactNode } from "react";

interface SidebarNavigationProps {
  children: ReactNode;
}

export default function SidebarNavigation({ children }: SidebarNavigationProps) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar gap-4">
      {children}
    </div>
  );
}

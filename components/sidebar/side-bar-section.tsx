import { ReactNode } from "react";

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
}

export default function SidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
        {title}
      </div>
      <nav className="space-y-0.5">{children}</nav>
    </div>
  );
}

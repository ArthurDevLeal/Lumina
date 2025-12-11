import { Sparkles } from "lucide-react";

export default function SidebarLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-foreground to-slate-700 flex items-center justify-center text-primary-foreground shadow-xl shadow-slate-900/20 ring-1 ring-ring">
        <Sparkles size={20} fill="currentColor" className="text-blue-200" />
      </div>
      <div>
        <h1 className="text-lg font-bold text-foreground tracking-tight leading-none">Lumina</h1>
        <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase mt-1">
          Personal Finance
        </p>
      </div>
    </div>
  );
}

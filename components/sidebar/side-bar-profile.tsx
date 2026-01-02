"use client";
import { useTokenStore } from "@/store/token-store";
import { useUserStore } from "@/store/user-store";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SidebarProfile() {
  const router = useRouter();
  const { user, removeUser } = useUserStore();
  const { removeToken } = useTokenStore();

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeToken();
    removeUser();
    router.push("/auth/login");
  };
  const avatarSeed = user?.avatarUrl || user?.name || "User";
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`;

  return (
    <div className="pt-4 border-t border-slate-200/60 bg-white/40 ">
      <div
        onClick={() => router.push("/dashboard/settings")}
        className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border hover:bg-border transition-all cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border">
          <img src={avatarUrl} alt="Avatar" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground truncate">{user?.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-10 h-10 rounded-full bg-transparent hover:bg-slate-100 flex items-center justify-center text-muted-foreground hover:text-destructive cursor-pointer transition-colors"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}

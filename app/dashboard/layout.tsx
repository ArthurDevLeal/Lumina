"use client";
import DefaultSideBar from "@/components/sidebar/default-side-bar";
import { useTokenStore } from "@/store/token-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { token } = useTokenStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      <DefaultSideBar />
      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  );
}
import DefaultSideBar from "@/components/sidebar/default-side-bar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <DefaultSideBar />

      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  );
}

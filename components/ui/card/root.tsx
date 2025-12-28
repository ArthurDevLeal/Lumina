import { ChildrenType } from "@/types/type";

interface StatCardRootProps {
  children: ChildrenType;
  variant?: "dark" | "light";
  className?: string;
}

export default function StatCardRoot({ children, variant = "dark", className = "" }: StatCardRootProps) {
  const baseClasses =
    variant === "dark"
      ? "bg-primary text-primary-foreground "
      : "bg-card text-card-foreground border border-border";

  return (
    <div className={`rounded-4xl p-6 relative overflow-hidden transition-transform ${baseClasses} ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/40 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      {children}
    </div>
  );
}

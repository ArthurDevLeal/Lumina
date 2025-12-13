"use client";
import { ChildrenType } from "@/types/type";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardRootProps {
  children: ChildrenType;
  variant?: "dark" | "light";
  className?: string;
}

function StatCardRoot({ children, variant = "dark", className = "" }: StatCardRootProps) {
  const baseClasses =
    variant === "dark"
      ? "bg-primary text-primary-foreground shadow-lg"
      : "bg-card text-card-foreground shadow-lg border-border border";

  return (
    <div className={`rounded-4xl p-6 relative overflow-hidden transition-transform ${baseClasses} ${className}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/40 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      {children}
    </div>
  );
}

interface StatCardHeaderProps {
  icon: LucideIcon;
  badge?: ReactNode;
  variant?: "dark" | "light";
  customIconColor?: string;
  customIconBgColor?: string;
}

function StatCardHeader({
  icon: Icon,
  badge,
  variant = "dark",
  customIconColor,
  customIconBgColor,
}: StatCardHeaderProps) {
  const iconBgColor = variant === "dark" ? "bg-primary-foreground/10" : "bg-muted";
  const iconColor = variant === "dark" ? "text-primary-foreground" : "text-primary";
  const badgeBg = variant === "dark" ? "bg-primary-foreground/10" : "bg-muted";
  const badgeText = variant === "dark" ? "text-primary-foreground" : "text-muted-foreground";
  const currentIconColor = customIconColor ?? iconColor;
  const currentIconBgColor = customIconBgColor ?? iconBgColor;
  return (
    <div className="flex justify-between items-start mb-8">
      <div
        className={`w-10 h-10 rounded-full ${currentIconBgColor} flex items-center justify-center backdrop-blur-md`}
      >
        <Icon size={20} className={currentIconColor} />
      </div>
      {badge && (
        <span
          className={`px-3 py-1 ${badgeBg} rounded-full text-xs font-medium backdrop-blur-md ${badgeText}`}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

interface StatCardContentProps {
  label: string;
  value: string | number;
  variant?: "dark" | "light";
  formatter?: (value: string | number) => string;
}

function StatCardContent({ label, value, variant = "dark", formatter }: StatCardContentProps) {
  const labelColor = variant === "dark" ? "text-primary-foreground/70" : "text-muted-foreground";
  const valueColor = variant === "dark" ? "text-primary-foreground" : "text-card-foreground";

  const formattedValue = formatter
    ? formatter(value)
    : typeof value === "number"
    ? `$${value.toLocaleString()}`
    : value;

  return (
    <div>
      <p className={`${labelColor} text-sm font-medium mb-1`}>{label}</p>
      <h2 className={`text-3xl font-bold tracking-tight ${valueColor}`}>{formattedValue}</h2>
    </div>
  );
}

export const StatCard = {
  Root: StatCardRoot,
  Header: StatCardHeader,
  Content: StatCardContent,
};

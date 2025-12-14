"use client";
import { ChildrenType } from "@/types/type";
import { ReactNode } from "react";

interface StatCardHeaderProps {
  icon: ChildrenType;
  badge?: ReactNode;
  variant?: "dark" | "light";
  customIconBgColor?: string;
}

export default function StatCardHeader({
  icon: Icon,
  badge,
  variant = "dark",
  customIconBgColor,
}: StatCardHeaderProps) {
  const iconBgColor = variant === "dark" ? "bg-primary-foreground/10" : "bg-muted";
  const badgeBg = variant === "dark" ? "bg-primary-foreground/10" : "bg-muted";
  const badgeText = variant === "dark" ? "text-primary-foreground" : "text-muted-foreground";
  const currentIconBgColor = customIconBgColor ?? iconBgColor;
  return (
    <div className="flex justify-between items-start mb-8">
      <div
        className={`w-10 h-10 rounded-full ${currentIconBgColor} flex items-center justify-center backdrop-blur-md`}
      >
        {Icon}
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

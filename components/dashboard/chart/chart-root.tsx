"use client";
import { ChildrenType } from "@/types/type";

interface ChartRootProps {
  children: ChildrenType;
  className?: string;
}

export default function ChartRoot({ children, className = "" }: ChartRootProps) {
  return <div className={`relative ${className}`}>{children}</div>;
}

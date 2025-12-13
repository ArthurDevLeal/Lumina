"use client";
import { ChildrenType } from "@/types/type";

interface ChartLegendRootProps {
  children: ChildrenType;
  className?: string;
}

export default function ChartLegendRoot({ children, className = "" }: ChartLegendRootProps) {
  return <div className={`flex flex-col justify-center gap-4 ${className}`}>{children}</div>;
}


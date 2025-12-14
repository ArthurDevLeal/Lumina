"use client";
import { ChildrenType } from "@/types/type";

export default function FastActionsRoot({ children }: { children: ChildrenType }){
  return <div className="grid grid-cols-3 gap-2">{children}</div>
}
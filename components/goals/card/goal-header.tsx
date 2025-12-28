"use client";
import { Button } from "@/components/ui/button";
import { ChildrenType } from "@/types/type";
import { MoreVertical } from "lucide-react";

interface GoalCardHeaderProps {
  icon?: ChildrenType;
  onMenuClick?: () => void;
}

export default function GoalCardHeader({ icon, onMenuClick }: GoalCardHeaderProps) {
  return (
    <div className={`flex ${icon ? "justify-between" : "justify-end"} items-start mb-8 relative z-10`}>
      {icon && (
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg">
          {icon}
        </div>
      )}
      <Button
        onClick={onMenuClick}
        variant={"ghost"}
        size={"icon-sm"}
      >
        <MoreVertical size={20} />
      </Button>
    </div>
  );
}
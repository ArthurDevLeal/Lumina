"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface GoalCardHeaderProps {
  onMenuClick?: () => Promise<void>;
}

export default function GoalCardHeader({ onMenuClick }: GoalCardHeaderProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const toastId = toast.loading("Deleting goal...");

    try {
      await onMenuClick?.();
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`flex justify-end items-start mb-8 relative z-10`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon-sm"} disabled={isDeleting}>
            <MoreVertical size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDelete} disabled={isDeleting}>
            <Trash2 size={16} className="mr-2" />
            Delete Goal
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

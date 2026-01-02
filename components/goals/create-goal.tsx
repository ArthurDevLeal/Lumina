"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GoalForm from "../dashboard/fast-actions/goal/goal-form";
export interface GoalFormData {
  name: string;
  type: string;
  targetValue: number;
  currentValue: number;
  finalDate?: Date;
  status: string;
}

export interface GoalFormProps {
  formData: GoalFormData;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (data: Partial<GoalFormData>) => void;
}

export interface GoalFastActionButtonProps {
  handleClick: ({ data }: { data: GoalFormData }) => Promise<void>;
}
export default function CreateGoal({ handleClick }: GoalFastActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<GoalFormData>({
    name: "",
    type: "",
    targetValue: 0,
    currentValue: 0,
    finalDate: undefined,
    status: "active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.type || formData.targetValue <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.status) {
      toast.error("Please select a status");
      return;
    }

    setIsLoading(true);
    try {
      await handleClick({
        data: {
          name: formData.name,
          type: formData.type,
          targetValue: formData.targetValue,
          currentValue: formData.currentValue,
          finalDate: formData.finalDate,
          status: "active",
        },
      });

      setOpen(false);
      setFormData({
        name: "",
        type: "",
        targetValue: 0,
        currentValue: 0,
        finalDate: undefined,
        status: "active",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormDataChange = (data: Partial<GoalFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="cursor-pointer rounded-4xl border-2 border-dashed border-border0 bg-input/30 flex flex-col items-center min-h-80 justify-center text-muted-foreground hover:border-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground/70 transition-all group">
          <div className="w-16 h-16 rounded-full bg-card shadow-sm flex items-center justify-center mb-4 transition-transform">
            <Plus size={28} />
          </div>
          <span className="font-bold text-lg">Add New Goal</span>
          <span className="text-sm font-medium opacity-60 mt-1">Start saving for something new</span>
        </button>
      </SheetTrigger>
      <SheetContent>
        <GoalForm
          formData={formData}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onFormDataChange={handleFormDataChange}
        />
      </SheetContent>
    </Sheet>
  );
}

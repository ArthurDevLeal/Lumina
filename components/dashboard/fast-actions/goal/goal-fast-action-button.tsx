"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { toast } from "sonner";
import GoalForm from "./goal-form";
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
  Icon: React.ReactNode;
  bgColor: string;
  handleClick: ({ data }: { data: GoalFormData }) => Promise<void>;
  text: string;
}
export default function GoalFastActionButton({
  Icon,
  bgColor,
  handleClick,
  text,
}: GoalFastActionButtonProps) {
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
        <Button variant="secondary" className="flex flex-col font-semibold group">
          <div
            className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center backdrop-blur-md transition-colors`}
          >
            {Icon}
          </div>
          {text}
        </Button>
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

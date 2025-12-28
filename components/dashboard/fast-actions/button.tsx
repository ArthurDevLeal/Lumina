"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { toast } from "sonner";
import TransactionModal from "./form";
import { FastActionButtonProps, TransactionFormData } from "./types";

export default function FastActionButton({
  Icon,
  bgColor,
  handleClick,
  text,
  type,
  handleCreateCategory,
  categories,
}: FastActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<TransactionFormData>({
    name: "",
    value: 0,
    brand: "",
    type: "Variable",
    category: "",
    categoryId: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || formData.value <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (type === "outcome" && !formData.categoryId) {
      toast.error("Please select a category");
      return;
    }

    if (type === "income" && !formData.category) {
      toast.error("Please enter a category");
      return;
    }

    setIsLoading(true);

    try {
      await handleClick({
        name: formData.name,
        value: formData.value,
        brand: formData.brand,
        category: formData.category,
        categoryId: formData.categoryId,
        type: formData.type,
      });

      setOpen(false);
      setFormData({
        name: "",
        value: 0,
        brand: "",
        type: "Variable",
        category: "",
        categoryId: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormDataChange = (data: Partial<TransactionFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  if (type !== "income" && type !== "outcome") {
    return (
      <Button variant="secondary" className="flex flex-col font-semibold group" onClick={() => handleClick()}>
        <div
          className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center backdrop-blur-md transition-colors`}
        >
          {Icon}
        </div>
        {text}
      </Button>
    );
  }

  return (
    <Sheet   open={open} onOpenChange={setOpen}>
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

      <SheetContent >
        <TransactionModal
          type={type}
          formData={formData}
          isLoading={isLoading}
          categories={categories}
          onSubmit={handleSubmit}
          onFormDataChange={handleFormDataChange}
          onCreateCategory={handleCreateCategory}
        />
      </SheetContent>
    </Sheet>
  );
}

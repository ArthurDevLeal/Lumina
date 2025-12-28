"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Check, Loader2, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TransactionFormProps } from "./types";

export default function TransactionForm({
  type,
  formData,
  isLoading,
  categories,
  onSubmit,
  onFormDataChange,
  onCreateCategory,
}: TransactionFormProps) {
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    setIsCreatingNewCategory(true);
    try {
      if (onCreateCategory) await onCreateCategory({ name: newCategoryName });
      setNewCategoryName("");
      setIsCreatingCategory(false);
      toast.success("Category created successfully!");
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setIsCreatingNewCategory(false);
    }
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>{type === "income" ? "Add a new income" : "Add a new outcome"}</SheetTitle>
        <SheetDescription>
          Fill in the details below to add a new {type === "income" ? "income" : "expense"}.
        </SheetDescription>
      </SheetHeader>

      <form onSubmit={onSubmit} className="flex flex-col gap-4 px-4 py-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onFormDataChange({ name: e.target.value })}
            placeholder={type === "income" ? "Salary, Freelance..." : "Groceries, Coffee..."}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="value">
            Value <span className="text-destructive">*</span>
          </Label>
          <Input
            value={formData.value || ""}
            onChange={(e) => onFormDataChange({ value: parseFloat(e.target.value) || 0 })}
            id="value"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="brand">Brand / Source (optional)</Label>
          <Input
            value={formData.brand}
            onChange={(e) => onFormDataChange({ brand: e.target.value })}
            id="brand"
            placeholder="Walmart, Starbucks..."
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2 grow">
            <Label htmlFor="type">
              Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value: "Fixed" | "Variable") => onFormDataChange({ type: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fixed">Fixed</SelectItem>
                <SelectItem value="Variable">Variable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {type === "outcome" ? (
            <div className="flex flex-col gap-2 grow">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>

              {isCreatingCategory ? (
                <div className="flex gap-2">
                  <Input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category name..."
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCreateCategory();
                      }
                      if (e.key === "Escape") {
                        setIsCreatingCategory(false);
                        setNewCategoryName("");
                      }
                    }}
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-lg"
                    onClick={() => {
                      setIsCreatingCategory(false);
                      setNewCategoryName("");
                    }}
                    disabled={isCreatingNewCategory}
                  >
                    <X />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    className="rounded-lg"
                    onClick={handleCreateCategory}
                    disabled={isCreatingNewCategory || !newCategoryName.trim()}
                  >
                    {isCreatingNewCategory ? <Loader2 className="animate-spin" /> : <Check />}
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => onFormDataChange({ categoryId: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.data?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-lg"
                    onClick={() => setIsCreatingCategory(true)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2 grow">
              <Label htmlFor="category">
                Category <span className="text-destructive">*</span>
              </Label>
              <Input
                value={formData.category}
                onChange={(e) => onFormDataChange({ category: e.target.value })}
                id="category"
                placeholder="Salary, Investment..."
                required
              />
            </div>
          )}
        </div>

        <SheetFooter className="flex flex-col justify-between gap-2 mt-4">
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? "Adding..." : `Create ${type === "income" ? "Income" : "Expense"}`}
          </Button>
        </SheetFooter>
      </form>
    </>
  );
}

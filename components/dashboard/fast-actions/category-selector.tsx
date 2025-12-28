"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryStatsPropsReturn } from "@/types/category/type";
import { useState } from "react";
import { toast } from "sonner";

interface CategorySelectorProps {
  categories?: CategoryStatsPropsReturn;
  selectedCategoryId?: string;
  onCategoryChange: (categoryId: string) => void;
  onCreateCategory?: ({ name }: { name: string }) => Promise<void>;
}

export default function CategorySelector({
  categories,
  selectedCategoryId,
  onCategoryChange,
  onCreateCategory,
}: CategorySelectorProps) {
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);

  const handleSubmitNewCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategoryName) {
      toast.error("Please select the name for the new category");
      return;
    }
    if (!onCreateCategory) {
      toast.error("Function not found");
      return;
    }

    try {
      setCategoryLoading(true);
      await onCreateCategory({ name: newCategoryName });
      setNewCategoryName("");
      toast.success("Category created successfully!");
    } catch (error: any) {
      console.error("Error submitting form:", error);
    } finally {
      setCategoryLoading(false);
    }
  };

  if (categories?.data && categories.data.length <= 0) {
    return (
      <div className="flex flex-col gap-2 grow">
        <Label htmlFor="category">
          Category <span className="text-destructive">*</span>
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button type="button" className="font-normal text-sm" variant={"outline"} size={"sm"}>
              Criar categoria
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h4 className="leading-none font-medium">Create a new category</h4>
              <p className="text-muted-foreground text-sm">Set the name of the new category.</p>
            </div>
            <form onSubmit={handleSubmitNewCategory} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="category">
                  Category Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  id="category"
                  placeholder="Shopping,Outfits..."
                />
              </div>
              <Button type="submit" size="sm" disabled={categoryLoading}>
                {categoryLoading ? "Creating..." : `Create`}
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 grow">
      <Label htmlFor="category">
        Category <span className="text-destructive">*</span>
      </Label>
      <Select value={selectedCategoryId} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories?.data.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
// goal-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { GoalFormProps } from "./goal-fast-action-button";

export default function GoalForm({ formData, isLoading, onSubmit, onFormDataChange }: GoalFormProps) {
  return (
    <>
      <SheetHeader>
        <SheetTitle>Create a new goal</SheetTitle>
        <SheetDescription>Fill in the details below to add a new financial goal.</SheetDescription>
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
            placeholder="Emergency Fund, New Car..."
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="type">
            Type <span className="text-destructive">*</span>
          </Label>
          <Input
            id="type"
            value={formData.type}
            onChange={(e) => onFormDataChange({ type: e.target.value })}
            placeholder="Savings, Investment, Purchase..."
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="targetValue">
            Target Value <span className="text-destructive">*</span>
          </Label>
          <Input
            value={formData.targetValue || ""}
            onChange={(e) => onFormDataChange({ targetValue: parseFloat(e.target.value) || 0 })}
            id="targetValue"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="currentValue">Current Value (optional)</Label>
          <Input
            value={formData.currentValue || ""}
            onChange={(e) => onFormDataChange({ currentValue: parseFloat(e.target.value) || 0 })}
            id="currentValue"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="finalDate">Final Date (optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size={"lg"}
                className={cn(
                  "w-full justify-start text-left font-normal text-sm",
                  !formData.finalDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.finalDate ? format(formData.finalDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.finalDate}
                hidden={{ before: new Date() }}
                onSelect={(date) => onFormDataChange({ finalDate: date })}
                autoFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <SheetFooter className="flex flex-col justify-between gap-2 mt-4">
          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Goal"}
          </Button>
        </SheetFooter>
      </form>
    </>
  );
}

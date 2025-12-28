"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface GoalCardActionProps {
  label?: string;
  onClick?: ({ goalId, amount }: { goalId: string; amount: number }) => void;
  goalId: string;
}

export default function GoalCardAction({ label = "Deposit", onClick, goalId }: GoalCardActionProps) {
  const [amount, setAmount] = useState("0");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    const numericAmount = parseFloat(amount);

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    if (onClick) {
      onClick({ amount: numericAmount, goalId });
    }

    setAmount("");
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const formatDisplay = (value: string) => {
    if (!value) return "$";
    return `$${value}`;
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setTimeout(() => {
            setAmount("0");
          }, 200);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"default"} size={"sm"}>
          {label}
          <ChevronRight size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Progress</DialogTitle>
          <DialogDescription>Enter the amount you want to deposit to this goal.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <div className="relative w-full">
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleInputChange}
              placeholder="0"
              className="bg-transparent text-center text-6xl font-bold text-foreground focus:outline-none placeholder-input w-full"
              autoFocus
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-foreground pointer-events-none">
              {!amount && ""}
            </span>
          </div>

          <p className="text-sm text-slate-500 font-medium">{formatDisplay(amount)}</p>
        </div>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setAmount("");
              setIsOpen(false);
            }}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!amount || parseFloat(amount) <= 0}
            className="flex-1"
          >
            Add Deposit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import { Check, ChevronRight } from "lucide-react";

export default function FinishCard() {
  const handleButtonClick = () => {};
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col bg-card border border-border p-4 gap-4 rounded-3xl">
        <div className="flex gap-2 items-center">
          <div className="flex items-center justify-center rounded-full size-9 bg-green-500/10">
            <Check className="text-green-700" />
          </div>
            <p className="font-medium text-sm">Account created</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center justify-center rounded-full  size-9 bg-green-500/10">
            <Check className="text-green-700" />
          </div>
            <p className="font-medium text-sm">Created your wallet</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center justify-center rounded-full size-9 bg-green-500/10">
            <Check className="text-green-700" />
          </div>
            <p className="font-medium text-sm">Init your new account</p>
        </div>
      </div>
      <div>
        <Button onClick={() => handleButtonClick()} className="group">
          Enter the dashboard <ChevronRight className="group-hover:translate-x-2 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

export default function CreditHeader() {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-bold text-foreground">Quick actions</h3>

      <Button variant="ghost" size={"icon"}>
        <Ellipsis />
      </Button>
    </div>
  );
}

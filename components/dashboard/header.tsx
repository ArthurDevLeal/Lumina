import { format } from "date-fns";
import { BellDot, Calendar } from "lucide-react";
import { Button } from "../ui/button";

export default function Header({ name }: { name: string }) {
  const currentDate = format(new Date(), "EEEE, d MMM yyyy");

  return (
    <div className="flex items-center justify-between gap-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground tracking-tight">
          Hello, {name.split(" ")[0] || "User"} 👋
        </h1>
        <p className="text-muted-foreground font-medium mt-1 flex items-center gap-2">
          <Calendar size={16} />
          {currentDate}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button size={"icon-lg"} >
          <BellDot />
        </Button>
      </div>
    </div>
  );
}

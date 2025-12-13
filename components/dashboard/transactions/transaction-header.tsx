import { Button } from "@/components/ui/button";

export default function TransactionHeader() {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold text-foreground">Recent activity</h3>
      <Button variant={"ghost"} size={"sm"}>
        See all
      </Button>
    </div>
  );
}

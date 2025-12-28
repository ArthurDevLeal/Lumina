import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function GoalHeader() {
  const router = useRouter();
  return (
    <div className="flex w-full justify-between items-center">
      <h3 className="text-xl font-bold text-foreground">Saving goals</h3>
      <Button onClick={() => router.push("/dashboard/goals")} variant={"ghost"} size={"sm"}>
        See all
      </Button>
    </div>
  );
}

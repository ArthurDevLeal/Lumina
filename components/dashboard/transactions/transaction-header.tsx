import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TransactionHeader() {
    const router = useRouter();
  
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold text-foreground">Recent activity</h3>
      <Button onClick={()=>router.push("/dashboard/transactions")} variant={"ghost"} size={"sm"}>
        See all
      </Button>
    </div>
  );
}

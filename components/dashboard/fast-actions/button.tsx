import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
interface FastActionButtonProps {
  Icon: LucideIcon;
  bgColor: string;
  text: string;
  iconColor: string;
  handleClick?: VoidFunction;
}
export default function FastActionButton({
  Icon,
  bgColor,
  iconColor,
  handleClick,
  text,
}: FastActionButtonProps) {
  return (
    <Button
      onClick={() => (handleClick ? handleClick() : {})}
      variant={"secondary"}
      className="flex flex-col font-semibold"
    >
      <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center backdrop-blur-md`}>
        <Icon size={20} className={iconColor} />
      </div>
      {text}
    </Button>
  );
}

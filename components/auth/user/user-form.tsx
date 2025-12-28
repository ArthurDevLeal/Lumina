import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputAuth } from "@/components/ui/input-auth";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface UserFormProps {
  setStep: Dispatch<SetStateAction<number>>;
  setName: Dispatch<SetStateAction<string>>;
}
export default function UserForm({ setStep, setName }: UserFormProps) {
  const [user, setUser] = useState("");
  const handleButtonClick = () => {
    setName(user);
    setStep((state) => state + 1);
    toast.success("Name registered successfully!")
  };
  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <Label htmlFor="nameInput">What should we call you?</Label>
        <InputAuth
          name="nameInput"
          id="nameInput"
          onChange={(e) => setUser(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <div>
        <Button disabled={user.trim().length < 2} onClick={() => handleButtonClick()} className="group">
          Continue <ChevronRight className="group-hover:translate-x-2 transition-transform" />
        </Button>
      </div>
    </form>
  );
}

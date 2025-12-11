import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface UserFormProps {
  setPassword: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  isDisabled: boolean;
  handleButtonClick: VoidFunction;
  loading: boolean;
}
export default function RegisterForm({
  setEmail,
  setPassword,
  isDisabled,
  handleButtonClick,
  loading,
}: UserFormProps) {
  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <Label htmlFor="emailInput">Email adress</Label>
        <Input
          name="emailInput"
          id="emailInput"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="passwordInput">Password</Label>
        <Input
          name="passwordInput"
          id="passwordInput"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>
      <div>
        <Button disabled={isDisabled} onClick={() => handleButtonClick()} className={`group ${loading ? "pr-8":""}`}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              Continue <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

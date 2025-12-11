import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface UserFormProps {
  setPassword: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  isDisabled: boolean;
  handleButtonClick: VoidFunction;
  loading: boolean;
  setStep: Dispatch<SetStateAction<number>>;
  email: string;
  password: string;
}
export default function RegisterForm({
  setEmail,
  setPassword,
  isDisabled,
  handleButtonClick,
  loading,
  setStep,
  email,
  password,
}: UserFormProps) {
  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <Label htmlFor="emailInput">Email adress</Label>
        <Input
          name="emailInput"
          id="emailInput"
          value={email}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>
      <div className="flex items-center justify-between">
        <Button onClick={() => setStep((state) => state - 1)} className={`group pl-6 pr-8`}>
          <ChevronLeft className="group-hover:-translate-x-2 translate-y-px transition-transform" />
          Return
        </Button>
        <Button
          disabled={isDisabled}
          onClick={() => handleButtonClick()}
          className={`group ${loading ? "pr-8" : ""}`}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              Continue{" "}
              <ChevronRight className="group-hover:translate-x-2 translate-y-px transition-transform" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

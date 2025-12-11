"use client";
import { loginUser, registerUser } from "@/actions/auth";
import { Auth } from "@/components/auth";
import { useTokenStore } from "@/store/token-store";
import { useUserStore } from "@/store/user-store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AuthPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useTokenStore();
  const { setUser } = useUserStore();

  const counterList = [0, 1, 2];

  useEffect(() => {
    const isEmailValid = email.trim().length > 0 && email.includes("@");
    const isPasswordValid = password.length >= 6;
    setIsDisabled(!(isEmailValid && isPasswordValid));
  }, [email, password]);

  const handleButtonClick = async () => {
    if (disabled || isLoading) return;
    setIsLoading(true);

    try {
      const userReq = await registerUser({ email, name, password });

      if (userReq && userReq.data) {
        toast.success(userReq.message || "User registered successfully!");

        const loginReq = await loginUser({ email, password });

        if (loginReq && loginReq.token && loginReq.user) {
          setToken(loginReq.token);
          setUser(loginReq.user);

          toast.success("User logged successfully!");
          setStep(2);
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Error registering user");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Auth.Root>
        <>
          {step === 0 && (
            <>
              <Auth.User.Header />
              <Auth.User.Form setName={setName} setStep={setStep} />
            </>
          )}
          {step === 1 && (
            <>
              <Auth.Register.Header />
              <Auth.Register.Form
                handleButtonClick={handleButtonClick}
                isDisabled={disabled || isLoading}
                loading={isLoading}
                setPassword={setPassword}
                setEmail={setEmail}
                setStep={setStep}
                email={email}
                password={password}
              />
            </>
          )}
          {step === 2 && (
            <>
              <Auth.Finish.Header username={name} />
              <Auth.Finish.Card />
            </>
          )}
        </>
      </Auth.Root>
      <Auth.Counter counterList={counterList} step={step} />
      <Auth.Redirect type={"Register"} />
    </>
  );
}

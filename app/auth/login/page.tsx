"use client";
import { loginUser } from "@/actions/auth";
import { Auth } from "@/components/auth";
import { useTokenStore } from "@/store/token-store";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { setToken } = useTokenStore();
  const { setUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const isEmailValid = email.trim().length > 0 && email.includes("@");
    const isPasswordValid = password.length >= 6;
    setIsDisabled(!(isEmailValid && isPasswordValid));
  }, [email, password]);

  const handleButtonClick = async () => {
    if (disabled || isLoading) return;
    setIsLoading(true);

    try {
      const loginReq = await loginUser({ email, password });

      if (loginReq && loginReq.token && loginReq.user) {
        setToken(loginReq.token);
        setUser(loginReq.user);
        toast.success("User logged successfully!");

        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Error logging in");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Auth.Root>
        <Auth.Login.Header />
        <Auth.Login.Form
          handleButtonClick={handleButtonClick}
          isDisabled={disabled || isLoading}
          loading={isLoading}
          setPassword={setPassword}
          setEmail={setEmail}
        />
      </Auth.Root>
      <Auth.Redirect type="Login"/>
    </>
  );
}

import Link from "next/link";

interface RedirectButtonProps {
  type: "Register" | "Login";
}

export default function RedirectButton({ type }: RedirectButtonProps) {
  const isRegister = type === "Register";

  return (
    <Link
      href={isRegister ? "/auth/login" : "/auth/register"}
      className="absolute text-xs text-muted-foreground bottom-10"
    >
      {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
      <span className="text-accent underline decoration-accent hover:cursor-pointer">
        {isRegister ? "Log in" : "Create one"}
      </span>
    </Link>
  );
}

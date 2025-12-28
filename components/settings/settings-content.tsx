import { ReactNode } from "react";

interface SettingsContentProps {
  children: ReactNode;
}

export default function SettingsContent({ children }: SettingsContentProps) {
  return <div className="grid grid-cols-3 gap-6">{children}</div>;
}
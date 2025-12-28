import { ReactNode } from "react";

interface SettingsProfileProps {
  children: ReactNode;
}

export default function SettingsProfile({ children }: SettingsProfileProps) {
  return <div className="col-span-1">{children}</div>;
}
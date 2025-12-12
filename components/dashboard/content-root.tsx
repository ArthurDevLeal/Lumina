import { ChildrenType } from "@/types/type";

export default function ContentRoot({ children }: { children: ChildrenType }) {
  return <div className="flex gap-8 justify-between">{children}</div>;
}

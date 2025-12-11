import { ChildrenType } from "@/types/type";

export default function Root({ children }: { children: ChildrenType }) {
  return <div className="flex flex-col gap-8">{children}</div>;
}

import { ChildrenType } from "@/types/type";

export default function LeftContentRoot({ children }: { children: ChildrenType }) {
  return <div className="flex flex-col gap-8 grow h-fit">{children}</div>;
}

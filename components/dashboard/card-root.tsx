import { ChildrenType } from "@/types/type";

export default function CardRoot({ children }: { children: ChildrenType }) {
  return <div className="grid grid-cols-3 gap-4 grow h-fit">{children}</div>;
}

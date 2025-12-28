import { ChildrenType } from "@/types/type";

export default function CategoryRoot({ children }: { children: ChildrenType }) {
  return (
    <div className="col-span-1 bg-card rounded-4xl p-8 border border-border flex flex-col">{children}</div>
  );
}

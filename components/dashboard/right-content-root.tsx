import { ChildrenType } from "@/types/type";

export default function RightContentRoot({ children }: { children: ChildrenType }) {
  return <div className="flex flex-col gap-8 h-fit min-w-[400px]">{children}</div>;
}

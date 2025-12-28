import { ChildrenType } from "@/types/type";

export default function ReportRoot({ children }: { children: ChildrenType }) {
  return <div className="col-span-3 grid grid-cols-3 gap-6">{children}</div>;
}

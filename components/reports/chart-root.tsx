import { ChildrenType } from "@/types/type";

export default function ChartRoot({children}:{children:ChildrenType}){
  return <div className="col-span-2 bg-card rounded-4xl p-8 border border-border ">{children}</div>
}
import { ChildrenType } from "@/types/type";
interface ReportCardProps {
  Icon: ChildrenType;
  bgColor: string;
  amount: number;
  name: string;
  perMonth?: boolean;
}
export default function ReportCard({ Icon, bgColor, amount, name, perMonth = false }: ReportCardProps) {
  return (
    <div className="bg-card p-6 rounded-4xl border border-border flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bgColor}`}>
        {Icon && Icon}
      </div>
      <div>
        <p className="text-muted-foreground text-sm font-bold uppercase tracking-wider">{name}</p>
        <h3 className="text-3xl font-bold text-foreground">
          ${amount} {perMonth && <span className="text-lg text-slate-400 font-medium">/mo</span>}
        </h3>
      </div>
    </div>
  );
}

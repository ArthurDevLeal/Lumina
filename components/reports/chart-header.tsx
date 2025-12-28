export default function ChartHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h3 className="text-xl font-bold text-slate-900">Income vs Expense</h3>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-700"></div>
          <span className="text-xs font-bold text-slate-500">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-slate-800"></div>
          <span className="text-xs font-bold text-slate-500">Expense</span>
        </div>
      </div>
    </div>
  );
}

interface ProofStripItem {
  label: string;
  value: string;
}

interface ProofStripProps {
  items: ProofStripItem[];
}

export default function ProofStrip({ items }: ProofStripProps) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-white px-4 py-4 shadow-sm shadow-slate-200/50"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              {item.label}
            </div>
            <div className="mt-2 text-sm font-semibold leading-6 text-slate-800">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

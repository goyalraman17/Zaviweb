interface ComparisonRow {
  label: string;
  withoutZavi: string;
  withZavi: string;
}

interface SimpleComparisonTableProps {
  title: string;
  rows: ComparisonRow[];
  withoutLabel?: string;
  withLabel?: string;
}

export default function SimpleComparisonTable({
  title,
  rows,
  withoutLabel = 'Without Zavi',
  withLabel = 'With Zavi',
}: SimpleComparisonTableProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/50 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">{title}</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="py-3 pr-4 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Workflow
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                {withoutLabel}
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                {withLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.label}
                className={
                  index < rows.length - 1 ? 'border-b border-slate-100' : ''
                }
              >
                <td className="py-4 pr-4 align-top text-sm font-semibold text-slate-900">
                  {row.label}
                </td>
                <td className="px-4 py-4 align-top text-sm leading-6 text-slate-600">
                  {row.withoutZavi}
                </td>
                <td className="bg-blue-50/60 px-4 py-4 align-top text-sm font-medium leading-6 text-slate-800">
                  {row.withZavi}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

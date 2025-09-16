type Tile = {
  label: string
  value: number
  bg: string
  valueColor: string
  hasError?: boolean
}

const tiles: Tile[] = [
  { label: 'Overdue',        value: 3,  bg: '#FFE9E9', valueColor: '#E45454' },
  { label: 'Pending Manual', value: 10, bg: '#FEF3D2', valueColor: '#C58A00' },
  { label: 'Pending Auto',   value: 20, bg: '#EAF1FB', valueColor: '#557BD6', hasError: true },
  { label: 'Completed',      value: 8,  bg: '#E8F5D9', valueColor: '#2E8B57' },
]

function ChevronRight({ className = 'h-4 w-4 text-slate-400' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M10 7l5 5-5 5" stroke="currentColor" strokeWidth={1.8} />
    </svg>
  )
}

export default function TodaysTasksCard(): JSX.Element {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
      <h3 className="text-sm font-semibold text-slate-900 mb-3">Today’s tasks</h3>
      <div className="flex items-stretch">
        <TaskTile {...tiles[0]} className="flex-1" />
        <Separator />
        <TaskTile {...tiles[1]} className="flex-1" />
        <TaskTile {...tiles[2]} className="flex-1" />
        <Separator />
        <TaskTile {...tiles[3]} className="flex-1" />
      </div>
    </section>
  )
}

function Separator() {
  return <div className="w-px mx-4 bg-slate-200 rounded-full" aria-hidden />
}

function TaskTile({
  label,
  value,
  bg,
  valueColor,
  hasError,
  className = '',
}: Tile & { className?: string }) {
  return (
    <button
      type="button"
      className={`relative rounded-xl px-5 py-4 text-left transition focus:outline-none focus:ring-2 focus:ring-sky-400 ${className}`}
      style={{ backgroundColor: bg }}
    >
      {hasError && (
        <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-rose-600 shadow-sm ring-1 ring-rose-100">
          1&nbsp;error
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
            <path d="M12 8v4m0 4h.01M3 19h18L12 3 3 19Z" stroke="currentColor" strokeWidth={1.6} />
          </svg>
        </span>
      )}

      <div className="flex items-center justify-between">
        <div style={{ color: valueColor }} className="text-2xl font-bold leading-none">
          {value}
        </div>
        <ChevronRight />
      </div>

      <div className="mt-1 text-xs text-slate-600">{label}</div>
    </button>
  )
}
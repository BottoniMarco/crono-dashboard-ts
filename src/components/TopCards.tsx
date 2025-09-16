type TopCardsProps = {
  replies?: number
  overdue?: number
  pendingManual?: number
  pendingAuto?: number
  completed?: number
}

export default function TopCards({
  replies = 24,
  overdue = 3,
  pendingManual = 10,
  pendingAuto = 20,
  completed = 8,
}: TopCardsProps): JSX.Element {
  return (
    <>
      {/* Card 1 — Welcome */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-4">
        <div className="text-lg font-semibold text-gray-900">Welcome Alex,</div>
        <p className="mt-2 text-sm text-gray-500">
          Here’s your performance overview where you can track your daily and monthly KPIs
        </p>
      </div>

      {/* Card 2 — Replies */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700">Replies</div>
          <a href="#" className="text-xs text-sky-500 underline">
            Open inbox
          </a>
        </div>
        <div className="mt-6 text-4xl font-bold text-gray-900">{replies}</div>
      </div>

      {/* Card 3 — Today’s tasks */}
      <div className="bg-white border border-gray-100 rounded-xl shadow p-4">
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="rounded-xl p-3 bg-rose-50">
            <div className="text-2xl font-bold text-rose-600">{overdue}</div>
            <div className="mt-1 text-xs text-gray-500">Overdue</div>
          </div>
          <div className="rounded-xl p-3 bg-amber-50">
            <div className="text-2xl font-bold text-amber-600">{pendingManual}</div>
            <div className="mt-1 text-xs text-gray-500">Pending Manual</div>
          </div>
          <div className="rounded-xl p-3 bg-indigo-50">
            <div className="text-2xl font-bold text-indigo-600">{pendingAuto}</div>
            <div className="mt-1 text-xs text-gray-500">Pending Auto</div>
          </div>
          <div className="rounded-xl p-3 bg-emerald-50">
            <div className="text-2xl font-bold text-emerald-600">{completed}</div>
            <div className="mt-1 text-xs text-gray-500">Completed</div>
          </div>
        </div>
      </div>
    </>
  )
}

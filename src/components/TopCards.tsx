import RepliesCard from './RepliesCard'
import TodaysTasksCard from './TodaysTasksCard'

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
  completed = 8
}: TopCardsProps): JSX.Element {
  return (
    <>
      {/* Welcome */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <div className="text-lg font-semibold text-slate-900">Welcome Alex,</div>
        <p className="mt-1.5 text-sm text-slate-500">
          Here’s your performance overview where you can track your daily and monthly KPIs
        </p>
      </div>

      {/* Replies */}
      <RepliesCard count={replies} />

    </>
  )
}
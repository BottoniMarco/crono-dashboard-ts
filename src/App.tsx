import Sidebar from './components/Sidebar'
import TopCards from './components/TopCards'
import RepliesCard from './components/RepliesCard'
import TodaysTasksCard from './components/TodaysTasksCard'
import SignalsList from './components/SignalsList'
import RightPanel from './components/RightPanel'

export default function App(): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-6">
        <Sidebar />

        <main className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left */}
            <div className="lg:col-span-6 space-y-6">
              <TopCards />
              <TodaysTasksCard />
              <SignalsList />
            </div>

            {/* Middle */}
            <div className="lg:col-span-3 space-y-6">
              <RepliesCard count={24} />
            </div>

            {/* Right */}
            <div className="lg:col-span-3 space-y-6">
              <RightPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

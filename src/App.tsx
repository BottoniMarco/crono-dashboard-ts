import Sidebar from './components/Sidebar'
import TopCards from './components/TopCards'
import SignalsList from './components/SignalsList'
import RightPanel from './components/RightPanel'


export default function App(): JSX.Element {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Row: sidebar + main */}
      <div className="flex gap-4">
        {/* Sidebar column */}
        <div className="w-60 shrink-0">
          <Sidebar />
        </div>

        {/* Main column */}
        <main className="flex-1 space-y-4">
          {/* Top 3 cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TopCards />
          </div>

          {/* Lower area: Signals (2/3) + Right panel (1/3) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl shadow p-4">
              <SignalsList />
            </div>
            <div className="bg-white border border-gray-100 rounded-xl shadow p-4">
              <RightPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}



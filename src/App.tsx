import Sidebar from "./components/Sidebar";
import TopCards from "./components/TopCards";
import RepliesCard from "./components/RepliesCard";
import TodaysTasksCard from "./components/TodaysTasksCard";
import Performance from "./components/Performance";
import SignalsList from "./components/SignalsList";
import Onboarding from "./components/Onboarding"; 

export default function App(): JSX.Element {
  return (

    <div className="w-full mx-auto px-6 flex gap-6">
      <Sidebar />

      <main className="flex-1">

          <div className="grid gap-6 items-stretch min-w-0 grid-cols-1">

            <div className="lg:col-start-1 lg:row-start-1 min-w-0">
              <div className="grid lg:grid-cols-2 gap-6 min-w-0">
                <div className="min-w-0"><TopCards /></div>
                <div className="min-w-0"><RepliesCard count={24} /></div>
              </div>
            </div>

            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 h-full min-w-0">
              <Performance />
            </div>

            <div className="lg:col-start-1 lg:row-start-2 min-w-0">
              <TodaysTasksCard />
            </div>

            <div className="lg:col-start-1 lg:row-start-3 min-w-0">
              <SignalsList />
            </div>
            <div className="lg:col-start-2 lg:row-start-3 min-w-0">
              <Onboarding />
            </div>
          </div>
 
      </main>
    </div>
  );
}
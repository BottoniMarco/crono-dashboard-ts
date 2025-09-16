type Step = { id: number; title: string; time: string; status?: 'todo' | 'done' }

export default function RightPanel(): JSX.Element {
  const steps: Step[] = [
    { id: 1, title: 'Integrations Setup', time: '5 min' },
    { id: 2, title: 'Add new Contact', time: '5 min' },
    { id: 3, title: 'Create your first sequence', time: '10 min' },
    { id: 4, title: 'Add contacts to sequence', time: '5 min' },
    { id: 5, title: 'Run your first task', time: '10 min' }
  ]

  return (
    <div>
<div className="text-sm font-semibold text-slate-900">Onboarding</div>

<div className="mt-2">
  {steps.map((step, idx) => (
    <div
      key={step.id}
      className={`flex items-center justify-between py-3 rounded-xl px-3 -mx-3 hover:bg-slate-50 transition
                  ${idx !== steps.length - 1 ? 'border-b border-slate-100' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="h-6 w-6 rounded-full bg-violet-50 flex items-center justify-center">
          <span className="text-violet-600 text-xs">•</span>
        </div>
        <div className="text-sm text-slate-900">{step.title}</div>
      </div>
      <div className="text-[11px] text-slate-500">{step.time}</div>
    </div>
  ))}
</div>
    </div>
  )
}
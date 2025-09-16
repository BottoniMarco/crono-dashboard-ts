type Step = {
  id: number
  title: string
  time: string
  status?: 'todo' | 'done'
}

export default function RightPanel(): JSX.Element {
  const steps: Step[] = [
    { id: 1, title: 'Integrations Setup', time: '5 min' },
    { id: 2, title: 'Add new Contact', time: '5 min' },
    { id: 3, title: 'Create your first sequence', time: '10 min' },
    { id: 4, title: 'Add contacts to sequence', time: '5 min' },
    { id: 5, title: 'Run your first task', time: '10 min' },
  ]

  return (
    <div>
      <div className="text-base font-semibold text-gray-900">Onboarding</div>

      <div className="mt-2">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className={`flex items-center justify-between py-3 rounded-lg px-2 -mx-2 hover:bg-gray-50 transition ${
              idx !== steps.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-8 w-8 rounded-xl flex items-center justify-center ${
                  step.status === 'done' ? 'bg-emerald-50' : 'bg-purple-50'
                }`}
              >
                <span className={step.status === 'done' ? 'text-emerald-600 text-sm' : 'text-purple-600 text-sm'}>
                  {step.status === 'done' ? '✓' : '•'}
                </span>
              </div>
              <div className="text-sm text-gray-900">{step.title}</div>
            </div>

            <div className="text-xs text-gray-500">{step.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
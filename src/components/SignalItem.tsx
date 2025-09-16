import { useState } from 'react'
import ActionMenu from './ActionMenu'
import type { Signal, SignalAction } from '../types'
import { SIGNAL_COLORS } from '../types'

interface Props {
  signal: Signal
  onUpdate: (id: string, action: SignalAction) => void
}

export default function SignalItem({ signal, onUpdate }: Props): JSX.Element {
  const [open, setOpen] = useState(false)
  const dotClass = SIGNAL_COLORS[signal.type] ?? 'bg-gray-400'

  return (
    <div className="flex items-start justify-between border-b border-slate-100 py-3.5">
      {/* left */}
      <div className="flex items-start gap-3">
        <div className={`mt-1 h-2.5 w-2.5 rounded-full ${dotClass}`} />
        <div>
          <div className={`text-[13px] ${signal.unread ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
            {signal.title}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
            <span>{signal.subtitle}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="text-slate-400">In sequence</span>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex items-center gap-4">
        <div className="text-[11px] text-slate-500">{signal.date}</div>
        <div className="relative">
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            Action
          </button>


          {open && (
            <ActionMenu
              onClose={() => setOpen(false)}
              onComplete={() => { setOpen(false); onUpdate(signal.id, 'complete') }}
              onDelete={() => { setOpen(false); onUpdate(signal.id, 'delete') }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
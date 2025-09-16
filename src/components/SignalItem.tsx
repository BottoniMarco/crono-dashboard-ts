import { useState } from 'react'
import ActionMenu from './ActionMenu'
import type { Signal, SignalAction } from '../types'

interface Props {
  signal: Signal
  onUpdate: (id: string, action: SignalAction) => void
}

export default function SignalItem({ signal, onUpdate }: Props) : JSX.Element {
  // Local UI state: menu open/closed
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-start justify-between border-b border-gray-100 py-4">
      {/* Left: icon + text */}
      <div className="flex items-start gap-3">
        {/* Simple placeholder "icon" */}
        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-teal-400" />
        <div>
          <div className="text-sm font-medium text-gray-900">{signal.title}</div>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
            <span>{signal.subtitle}</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span className="text-gray-400">In sequence</span>
          </div>
        </div>
      </div>

      {/* Right: date + action */}
      <div className="flex items-center gap-4">
        <div className="text-xs text-gray-500">{signal.date}</div>

        <div className="relative">
          <button
            type="button"
            className="rounded-full border bg-white px-4 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-400"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            Action
          </button>

          {open && (
            <ActionMenu
              onClose={() => setOpen(false)}
              onComplete={() => {
                setOpen(false)
                onUpdate(signal.id, 'complete')
              }}
              onDelete={() => {
                setOpen(false)
                onUpdate(signal.id, 'delete')
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

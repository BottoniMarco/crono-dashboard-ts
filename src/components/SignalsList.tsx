import { useEffect, useState } from 'react'
import SignalItem from './SignalItem'
import type { Signal, SignalAction } from '../types'

export default function SignalsList(): JSX.Element {
  const [signals, setSignals] = useState<Signal[]>([])

  // Fetch once on mount; abort if unmounted
  useEffect(() => {
    const controller = new AbortController()

    ;(async () => {
      try {
        const res = await fetch('/signals.json', { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = (await res.json()) as Signal[]
        setSignals(data)
      } catch (err: unknown) {
        if ((err as { name?: string })?.name !== 'AbortError') {
          console.error(err)
        }
      }
    })()

    return () => controller.abort()
  }, [])

  // Derived, not stored: unread counter
  const unreadCount = signals.reduce((n, s) => n + (s.unread ? 1 : 0), 0)

  // Single updater that rows call
  const handleUpdate = (id: string, action: SignalAction) => {
    setSignals(prev => {
      if (action === 'complete') {
        return prev.map(s => (s.id === id ? { ...s, unread: false } : s))
      }
      if (action === 'delete') {
        return prev.filter(s => s.id !== id)
      }
      return prev
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div className="font-semibold text-gray-900">
          Signals
          <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
            {unreadCount}
          </span>
        </div>
      </div>

      {/* Rows */}
      <div className="-mx-4 px-4">
        {signals.map(s => (
          <SignalItem key={s.id} signal={s} onUpdate={handleUpdate} />
        ))}
      </div>

      {/* Empty state */}
      {signals.length === 0 && (
        <div className="py-10 text-center text-sm text-gray-500">No signals</div>
      )}
    </div>
  )
}

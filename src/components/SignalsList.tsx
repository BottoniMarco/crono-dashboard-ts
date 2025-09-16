import { useEffect, useState } from 'react'
import SignalItem from './SignalItem'
import type { Signal, SignalAction } from '@/types'

export default function SignalsList(): JSX.Element {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  // Load from localStorage (if present) 
useEffect(() => {
  const saved = localStorage.getItem('signals')
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as Signal[]
      if (Array.isArray(parsed)) setSignals(parsed)
    } catch {}
  }
}, [])

// Fetch mock data and abort on unmount
useEffect(() => {
  const controller = new AbortController()

  ;(async () => {
    try {
      const url = `${import.meta.env.BASE_URL}signals.json` // robust path
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as Signal[]
      setSignals(data) // <-- overwrite regardless of localStorage
    } catch (err: unknown) {
      if ((err as { name?: string })?.name !== 'AbortError') {
        console.error(err)
      }
    } finally {
      setLoading(false)
    }
  })()

  return () => controller.abort()
}, [])

// Persist changes
useEffect(() => {
  localStorage.setItem('signals', JSON.stringify(signals))
}, [signals])

  const unreadCount = signals.reduce((n, s) => n + (s.unread ? 1 : 0), 0)

  const handleUpdate = (id: string, action: SignalAction) => {
    setSignals(prev => {
      if (action === 'complete') return prev.map(s => (s.id === id ? { ...s, unread: false } : s))
      if (action === 'delete')   return prev.filter(s => s.id !== id)
      return prev
    })
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Signals
          <span
            className="ml-2 inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-700"
            aria-live="polite"
          >
            {unreadCount}
          </span>
        </div>
      </div>


      <div className="-mx-4 px-4 min-h-[18rem]">  {/* gives the big airy area like mock */}
        {signals.map(s => (
          <SignalItem key={s.id} signal={s} onUpdate={handleUpdate} />
        ))}
      </div>
    </div>
  )
}

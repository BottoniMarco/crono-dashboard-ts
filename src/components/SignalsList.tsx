import { useEffect, useState } from 'react';
import SignalItem from './SignalItem';
import type { Signal, SignalAction } from '@/types';

export default function SignalsList(): JSX.Element {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const saved = localStorage.getItem('signals');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Signal[];
        if (Array.isArray(parsed)) setSignals(parsed);
      } catch {}
    }
  }, []);

  // fetch mock data
useEffect(() => {
  const controller = new AbortController();

  (async () => {
    try {
      const url = `${import.meta.env.BASE_URL}signals.json`;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as Signal[];
      setSignals(data);
    } catch (err) {
      // Ignore fetch/json aborts
      const name = (err as any)?.name;
      if (name === 'AbortError' || name === 'CanceledError') return;
      console.error(err);
    } finally {
      // Only update state if not aborted
      if (!controller.signal.aborted) setLoading(false);
    }
  })().catch((err) => {
  if (err.name === "AbortError") {
    return;
  }
  console.error("Fetch failed:", err);
});


  return () => controller.abort();
}, []);

  // persist
  useEffect(() => {
    localStorage.setItem('signals', JSON.stringify(signals));
  }, [signals]);

  const unreadCount = signals.reduce((n, s) => n + (s.unread ? 1 : 0), 0);

  const handleUpdate = (id: string, action: SignalAction) => {
    setSignals(prev => {
      if (action === 'complete') return prev.map(s => (s.id === id ? { ...s, unread: false } : s));
      if (action === 'delete')   return prev.filter(s => s.id !== id);
      return prev;
    });
  };

  return (
    <section className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 min-w-0">
      <div className="mb-3 flex items-center">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold text-slate-900">Signals</div>

          <span
            className="inline-flex items-center justify-center rounded-full text-[11px] font-bold text-white h-5 w-5"
            style={{ backgroundColor: "#F9BB06" }}
            aria-live="polite"
          >
            {unreadCount}
          </span>
        </div>
      </div>

<p className="mt-1 mb-4 text-[13px] text-slate-500">
  Never miss a single opportunity: check out your top signals from your 1st-degree LinkedIn connections.
</p>

      <div className="-mx-4 px-4">
        {loading ? (
          <div className="text-slate-400 text-sm">Loading…</div>
        ) : (
          signals.map(s => <SignalItem key={s.id} signal={s} onUpdate={handleUpdate} />)
        )}
      </div>
    </section>
  );
}

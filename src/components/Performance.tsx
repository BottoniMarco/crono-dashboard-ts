import React from 'react'

type KPIKey = 'contacts' | 'companies' | 'activities' | 'meetings' | 'deals' | 'pipeline'
type KPI = { key: KPIKey; label: string; value: number; target: number; color: string; format?: (n: number) => string }
const euroK = (n: number) => `€${n}K`

const KPIS: KPI[] = [
  { key: 'contacts',  label: 'Contacts engaged',  value: 0,    target: 500,  color: '#3B85E8' },
  { key: 'companies', label: 'Companies engaged', value: 0,    target: 500,  color: '#3B58DB' },
  { key: 'activities',label: 'Activities',        value: 1000, target: 2000, color: '#8846DC' },
  { key: 'meetings',  label: 'Meetings',          value: 20,   target: 30,   color: '#E2AD13' },
  { key: 'deals',     label: 'Deals',             value: 100,  target: 200,  color: '#E769CB' },
  { key: 'pipeline',  label: 'Pipeline',          value: 50,   target: 100,  color: '#1A9D6E', format: euroK },
]

const Icon = ({ name, color }: { name: KPIKey; color: string }) => {
  const p = { width: 16, height: 16, style: { color } } as React.SVGProps<SVGSVGElement>
  switch (name) {
    case 'contacts':  return <svg {...p} viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.4"/><circle cx="10" cy="7" r="4" stroke="currentColor" strokeWidth="1.4"/></svg>
    case 'companies': return <svg {...p} viewBox="0 0 24 24" fill="none"><path d="M3 21h18M4 21V7l8-4 8 4v14M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.4"/></svg>
    case 'activities':return <svg {...p} viewBox="0 0 24 24" fill="none"><path d="M13 3l-3 7h5l-4 11" stroke="currentColor" strokeWidth="1.4"/></svg>
    case 'meetings':  return <svg {...p} viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.4"/></svg>
    case 'deals':     return <svg {...p} viewBox="0 0 24 24" fill="none"><path d="M4 14l4 4 12-12" stroke="currentColor" strokeWidth="1.4"/></svg>
    case 'pipeline':  return <svg {...p} viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/><path d="M4 10h16M4 14h16" stroke="currentColor" strokeWidth="1.4"/></svg>
  }
}

function Card({ k }: { k: KPI }) {
  const pct = Math.max(0, Math.min(100, (k.value / (k.target || 1)) * 100))
  const fmt = k.format ?? ((n: number) => String(n))
  return (
    <div className="rounded-xl border border-slate-200 p-2.5">
      <div className="text-[12px] font-medium text-slate-800 mb-1">{k.label}</div>
      <div className="flex items-center gap-1 leading-none">
        <Icon name={k.key} color={k.color} />
        <span className="text-[16px] font-semibold" style={{ color: k.color }}>{fmt(k.value)}</span>
        <span className="text-[16px] text-slate-400">/{fmt(k.target)}</span>
      </div>
      <div className="mt-1 h-[3px] w-full rounded-full bg-slate-100 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: k.color }} />
      </div>
    </div>
  )
}

function Pencil(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" {...props}><path d="M3 17.25V21h3.75L19.81 7.94l-3.75-3.75L3 17.25z" stroke="currentColor" strokeWidth="1.3"/><path d="M14.06 4.19l3.75 3.75" stroke="currentColor" strokeWidth="1.3"/></svg>
}

export default function Performance(): JSX.Element {
  return (
    <section className="h-full flex flex-col justify-center bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-[16px] font-semibold text-slate-900">May’s performance</h3>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:underline"
        >
          Edit KPIs
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {KPIS.map((k) => (
          <Card key={k.key} k={k} />
        ))}
      </div>
    </section>
  );
}
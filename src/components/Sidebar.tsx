import { useMemo, useState } from 'react'

type ItemKey =
  | 'dashboard'
  | 'find'
  | 'lists'
  | 'templates'
  | 'sequences'
  | 'tasks'
  | 'inbox'
  | 'deals'
  | 'analytics'

type NavItem = {
  key: ItemKey
  label: string
  badge?: number
  children?: { key: string; label: string }[]
}

const NAV_ITEMS: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'find', label: 'Find New' },
  { key: 'lists', label: 'Lists' },
  { key: 'templates', label: 'Templates' },
  { key: 'sequences', label: 'Sequences' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'inbox', label: 'Inbox', badge: 24 },
  { key: 'deals', label: 'Deals' },
  {
    key: 'analytics',
    label: 'Analytics',
    children: [
      { key: 'overview', label: 'Overview' },
      { key: 'reports', label: 'Reports' },
      { key: 'pipelines', label: 'Pipelines' },
    ],
  },
]

function Icon({
  name,
  className = 'h-5 w-5 stroke-[1.75]',
}: {
  name: ItemKey | 'chev' | 'brand'
  className?: string
}) {
  switch (name) {
    case 'brand':
      return (
        <svg viewBox="0 0 24 24" className={className + ' fill-teal-500 stroke-none'}>
          <path d="M10 2h4l-2 8h4l-6 12 2-8H8l2-12Z" />
        </svg>
      )
    case 'dashboard':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="5" rx="2" />
          <rect x="13" y="10" width="8" height="11" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
        </svg>
      )
    case 'find':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M16 16l5 5" />
        </svg>
      )
    case 'lists':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path d="M9 6h12M9 12h12M9 18h12" />
          <circle cx="4" cy="6" r="1.5" />
          <circle cx="4" cy="12" r="1.5" />
          <circle cx="4" cy="18" r="1.5" />
        </svg>
      )
    case 'templates':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 8h10M7 12h6" />
        </svg>
      )
    case 'sequences':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <circle cx="5" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M7 7l3 3M14 13l3 3" />
        </svg>
      )
    case 'tasks':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 12h8M8 8h6M8 16h5" />
        </svg>
      )
    case 'inbox':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path d="M4 13l2-7h12l2 7v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5Z" />
          <path d="M4 13h5a3 3 0 0 0 6 0h5" />
        </svg>
      )
    case 'deals':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path d="M4 12h16M7 5h10M7 19h10" />
        </svg>
      )
    case 'analytics':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path d="M4 20h16M7 16V8M12 20V4M17 20v-6" />
        </svg>
      )
    case 'chev':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
          <path d="M9 6l6 6-6 6" />
        </svg>
      )
  }
}

export default function Sidebar(): JSX.Element {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState<ItemKey>('dashboard')
  const [analyticsOpen, setAnalyticsOpen] = useState(false)

  const widthClass = useMemo(() => (collapsed ? 'w-16' : 'w-48'), [collapsed])

  const handleToggleCollapsed = () => {
    setCollapsed(v => {
      const next = !v
      if (next) setAnalyticsOpen(false)
      return next
    })
  }

  return (
    <aside className={`${widthClass} shrink-0 transition-all duration-200`}>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm h-full flex flex-col">
        {/* collapse toggle */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <Icon name="brand" className="h-5 w-5" />
            {!collapsed && <span className="font-semibold text-slate-900">crono</span>}
          </div>

          <button
            type="button"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="rounded-full p-1.5 ring-1 ring-slate-200 hover:bg-slate-50 text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
            onClick={handleToggleCollapsed}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            <Icon
              name="chev"
              className={`h-4 w-4 stroke-[2] transition-transform ${!collapsed ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Nav */}
        <nav className="px-2 space-y-1 overflow-visible">
          {NAV_ITEMS.map(item => {
            const isActive = active === item.key
            const isAnalytics = item.key === 'analytics'
            const showLabel = !collapsed

            const base =
              'group flex items-center gap-3 w-full rounded-xl px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-teal-400'
            const inactive = 'text-slate-700 hover:bg-slate-50'
            const activeExpanded =
              'text-teal-600 border-l-4 pl-2.5 font-medium' 

            const buttonCls =
              base + ' ' + (isActive && !collapsed ? activeExpanded : inactive)

            const titleAttr = collapsed ? item.label : undefined

            return (
              <div key={item.key}>
                <button
                  type="button"
                  aria-current={isActive ? 'page' : undefined}
                  className={buttonCls}
                  onClick={() => {
                    setActive(item.key)
                    if (isAnalytics && !collapsed) setAnalyticsOpen(v => !v)
                  }}
                  title={titleAttr}
                >

                  <span className={isActive && !collapsed ? 'text-teal-600' : 'text-slate-500'}>
                    <Icon name={item.key} />
                  </span>

                  {showLabel && (
                    <span
                      className={
                        'flex-1 text-left ' + (isActive ? 'text-teal-700' : 'text-slate-700')
                      }
                    >
                      {item.label}
                    </span>
                  )}


                  {!collapsed && item.key === 'inbox' && item.badge ? (
                    <span
                      className="ml-auto inline-flex items-center justify-center rounded-full px-2.5 h-5 text-[11px] bg-amber-400 text-white font-semibold"
                      aria-label={`${item.badge} unread`}
                    >
                      {item.badge}
                    </span>
                  ) : null}

 
                  {isAnalytics && showLabel && (
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-4 w-4 text-slate-400 transition-transform ${
                        analyticsOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" fill="none" />
                    </svg>
                  )}
                </button>

                {isAnalytics && analyticsOpen && !collapsed && (
                  <div className="ml-9 mt-1 mb-2 space-y-1">
                    {item.children!.map(child => (
                      <button
                        key={child.key}
                        type="button"
                        className="text-left text-sm text-slate-600 hover:text-slate-900"
                        onClick={() => setActive('analytics')}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="flex-1" />

        {!collapsed && (
          <div className="px-4">
            <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 mb-3">
              <div className="text-[13px] text-slate-800 font-medium">Trial ends in 2 days</div>
              <button
                type="button"
                className="mt-2 inline-flex items-center gap-1 rounded-lg bg-amber-400 text-white text-xs font-semibold px-3 py-1.5 hover:brightness-95"
              >
                Upgrade plan <span aria-hidden>🔒</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-auto border-t border-slate-100 px-4 py-3">
          <button
            type="button"
            className={
              'w-full flex items-center rounded-xl ' +
              (collapsed
                ? 'justify-center px-0 py-2' 
                : 'gap-3 px-2 py-2 hover:bg-slate-50')
            }
            title={collapsed ? 'William Robertson — Sales' : undefined}
          >
            <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold">
              <span>WR</span>
            </div>
            {!collapsed && (
              <div className="text-left">
                <div className="text-sm text-slate-900">William Robertson</div>
                <div className="text-xs text-slate-500">Sales</div>
              </div>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}


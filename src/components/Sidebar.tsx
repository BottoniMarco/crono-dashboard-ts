type NavItemProps = {
  label: string
  active?: boolean
}

function NavItem({ label, active = false }: NavItemProps): JSX.Element {
  return (
    <button
      type="button"
      aria-current={active ? 'page' : undefined}
      className={`w-full text-left px-3 py-2 rounded-xl text-sm transition
        ${active ? 'bg-white shadow text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      {label}
    </button>
  )
}

export default function Sidebar(): JSX.Element {
  return (
    <aside className="w-60 shrink-0 p-4 bg-gray-50">
      <div className="flex items-center gap-2 font-bold text-lg mb-6">
        <div className="h-3 w-3 rounded-full bg-teal-400" />
        <span>crono</span>
      </div>

      <nav className="space-y-1">
        <NavItem label="Dashboard" active />
        <NavItem label="Find New" />
        <NavItem label="Lists" />
        <NavItem label="Templates" />
        <NavItem label="Sequences" />
        <NavItem label="Tasks" />
        <NavItem label="Inbox" />
        <NavItem label="Deals" />
        <NavItem label="Analytics" />
      </nav>
    </aside>
  )
}


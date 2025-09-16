import React from 'react'

type RepliesCardProps = {
  count: number
  avatars?: string[]
}

function MailboxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>

      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth={1.8}
      />

      <path
        d="M3 10h18"
        stroke="currentColor"
        strokeWidth={1.8}
      />
      <path
        d="M12 7v6m0 0l-3-3m3 3l3-3"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M10 7l5 5-5 5" stroke="currentColor" strokeWidth={1.8} />
    </svg>
  )
}

export default function RepliesCard({
  count,
  avatars = ['🦊', 'C', 'M', 'M'],
}: RepliesCardProps): JSX.Element {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 h-full flex flex-col">
      {/* header row */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-slate-700">Replies</div>

        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm font-medium hover:underline"
          style={{ color: '#0A9B94' }}
          aria-label="Open inbox"
        >
          Open inbox
          <ChevronRightIcon className="h-4 w-4" />
        </a>
      </div>

      {/* content panel */}
      <div
        className="mt-4 rounded-xl p-4 flex items-center justify-between"
        style={{ backgroundColor: '#E9F8F8' }} // exact light blue from the mock
      >
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center"
               style={{ backgroundColor: '#D7F1F0' }}>
              <MailboxIcon className="h-6 w-6" style={{ color: '#0A9B94' }} />

          </div>

          <div className="text-4xl font-bold text-slate-900">{count}</div>
        </div>

        <div className="flex items-center">
          {avatars.slice(0, 5).map((a, i) => (
            <div
              key={i}
              className={`h-8 w-8 rounded-full bg-white ring-2 ring-white flex items-center justify-center text-sm select-none ${
                i === 0 ? '' : '-ml-2'
              }`}
              title={typeof a === 'string' ? a : undefined}
            >
              <span className="leading-none">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
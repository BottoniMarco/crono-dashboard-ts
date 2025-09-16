import { useState } from 'react';
import ActionMenu from './ActionMenu';
import type { Signal, SignalAction } from '../types';

interface Props {
  signal: Signal;
  onUpdate: (id: string, action: SignalAction) => void;
}

function SignalAvatar({ unread }: { unread: boolean }) {
  return (
    <div className="relative">

      <div className="h-9 w-9 rounded-full bg-[#1F2833] ring-2 ring-slate-100/70 shadow-sm flex items-center justify-center">

        <GenericIcon className="h-4 w-4 text-slate-200" />
      </div>


      {unread && (
        <span
          className="absolute -top-0.5 -left-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white"
          style={{ backgroundColor: "#F9BB06" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}


function GenericIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3v18m9-9H3"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const TYPE_CHIPS: Record<Signal["type"],{ bg: string; color: string; label: string }> = {
    role_change:    { bg: "#EAF2FF", color: "#2F6FED", label: "Role change" },
    company_change: { bg: "#F3E9FF", color: "#7A3AED", label: "Company change" },
    website_view:   { bg: "#EAFBF3", color: "#22A06B", label: "Website view" },
  };

const SEQ_CHIP = { bg: "#E6FBF9", color: "#1EBAB2", label: "In sequence" };


function highlightText(text: string, highlights: string[]) {
  const parts = text.split(new RegExp(`(${highlights.join("|")})`, "gi"));
  return parts.map((part, i) =>
    highlights.some(h => h.toLowerCase() === part.toLowerCase()) ? (
      <span key={i} className="font-medium"
        style={{ color: "#1EBAB2" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function SignalItem({ signal, onUpdate }: Props): JSX.Element {
  const [open, setOpen] = useState(false);
 

  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3.5">

      <div className="flex items-start gap-3">

        <SignalAvatar unread={signal.unread} />

        <div className="min-w-0">
          <div
            className={`text-[14px] ${
              signal.unread ? "font-semibold text-slate-900" : "text-slate-800"
            }`}
          >
            {highlightText(signal.title, ["2 pages"])}
          </div>

            <div className="mt-1 flex flex-wrap items-center gap-2">

              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                style={{
                  backgroundColor: TYPE_CHIPS[signal.type]?.bg ?? "#EEF2F7",
                  color: TYPE_CHIPS[signal.type]?.color ?? "#475569",
                }}
              >
                {TYPE_CHIPS[signal.type]?.label ?? signal.subtitle ?? "Signal"}
              </span>

              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                style={{ backgroundColor: SEQ_CHIP.bg, color: SEQ_CHIP.color }}
              >
                {SEQ_CHIP.label}
              </span>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-[11px] text-slate-500 whitespace-nowrap">{signal.date}</div>

        <div className="relative">
          <button
            type="button"
            className="rounded-full px-4 h-9 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0"
            style={{ backgroundColor: '#1EBAB2' }}           // <-- button color
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            Action
          </button>

          {open && (
            <ActionMenu
              onClose={() => setOpen(false)}
              onComplete={() => { setOpen(false); onUpdate(signal.id, 'complete'); }}
              onDelete={() => { setOpen(false); onUpdate(signal.id, 'delete'); }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
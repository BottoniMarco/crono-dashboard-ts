import { useEffect, useRef } from 'react';

interface Props {
  onComplete: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function ActionMenu({ onComplete, onDelete, onClose }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const items = Array.from(
      ref.current?.querySelectorAll<HTMLButtonElement>('button[data-menuitem]') ?? []
    );
    let i = 0;
    items[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose();
      if (!items.length) return;
      if (e.key === 'ArrowDown') { i = (i + 1) % items.length; items[i].focus(); }
      if (e.key === 'ArrowUp')   { i = (i - 1 + items.length) % items.length; items[i].focus(); }
    };
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Signal actions"
      className="
        absolute right-0 top-full z-30 mt-2 w-60
        rounded-2xl border border-slate-200 bg-white p-2 shadow-xl
      "
    >

      <div className="absolute -top-2 right-6 h-3 w-3 rotate-45 bg-white border-t border-l border-slate-200" />

      <button
        type="button"
        data-menuitem
        role="menuitem"
        onClick={onComplete}
        className="
          w-full rounded-xl px-3 py-2.5 text-sm font-medium
          flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-sky-300
        "
        style={{ backgroundColor: '#E9F8F8', color: '#1EBAB2' }}
      >
        <span>Complete</span>
        <CheckCircle className="h-5 w-5" color="#1EBAB2" />
      </button>

      <div className="my-2 h-px bg-slate-100" />

      {/* DELETE */}
      <button
        type="button"
        data-menuitem
        role="menuitem"
        onClick={onDelete}
        className="
          w-full rounded-xl px-3 py-2.5 text-sm font-medium
          text-slate-700 hover:bg-slate-50
          flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-sky-300
        "
      >
        <span>Delete</span>
        <Trash className="h-5 w-5 text-slate-400" />
      </button>
    </div>
  );
}

/* Icons */
function CheckCircle({
  className,
  color = '#1EBAB2',
}: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Trash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path d="M9 4h6m-8 3h10m-1 0l-.7 12.1a2 2 0 0 1-2 1.9H10.7a2 2 0 0 1-2-1.9L8 7"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 10v8M14 10v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
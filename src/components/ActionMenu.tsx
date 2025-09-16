import { useEffect, useRef } from 'react'

interface Props {
  onComplete: () => void
  onDelete: () => void
  onClose: () => void
}

export default function ActionMenu({ onComplete, onDelete, onClose }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null)

  // Close on click-outside + Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Signal actions"
      className="absolute right-0 top-full z-20 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow"
    >
      <button
        type="button"
        role="menuitem"
        className="block w-full px-3 py-2 text-left hover:bg-gray-50"
        onClick={onComplete}
      >
        Complete
      </button>
      <button
        type="button"
        role="menuitem"
        className="block w-full px-3 py-2 text-left text-rose-600 hover:bg-gray-50"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  )
}

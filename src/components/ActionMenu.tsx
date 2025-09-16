import { useEffect, useRef } from 'react'

interface Props {
  onComplete: () => void
  onDelete: () => void
  onClose: () => void
}

export default function ActionMenu({ onComplete, onDelete, onClose }: Props): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const items = Array.from(
      ref.current?.querySelectorAll<HTMLButtonElement>('button[data-menuitem]') ?? []
    )
    let i = 0
    items[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (!items.length) return
      if (e.key === 'ArrowDown') { i = (i + 1) % items.length; items[i].focus() }
      if (e.key === 'ArrowUp')   { i = (i - 1 + items.length) % items.length; items[i].focus() }
    }
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDown)
    }
  }, [onClose])

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Signal actions"
      className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow"
    >
      <button
        type="button"
        data-menuitem
        role="menuitem"
        className="block w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
        onClick={onComplete}
      >
        Complete
      </button>
      <button
        type="button"
        data-menuitem
        role="menuitem"
        className="block w-full px-3 py-2 text-left text-rose-600 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  )
}

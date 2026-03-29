import { useEffect, useRef } from 'react'

export interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
}

export function useKeyboardShortcut(
  shortcut: KeyboardShortcut,
  handler: (event: KeyboardEvent) => void,
  options: { enabled?: boolean; target?: EventTarget } = {}
): void {
  const { enabled = true, target } = options
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (!enabled) return

    const eventTarget = target ?? window

    const listener = (event: Event) => {
      const e = event as KeyboardEvent
      const matchKey = e.key.toLowerCase() === shortcut.key.toLowerCase()
      const matchCtrl = !!shortcut.ctrlKey === e.ctrlKey
      const matchMeta = !!shortcut.metaKey === e.metaKey
      const matchShift = !!shortcut.shiftKey === e.shiftKey
      const matchAlt = !!shortcut.altKey === e.altKey

      if (matchKey && matchCtrl && matchMeta && matchShift && matchAlt) {
        handlerRef.current(e)
      }
    }

    eventTarget.addEventListener('keydown', listener)
    return () => eventTarget.removeEventListener('keydown', listener)
  }, [shortcut, enabled, target])
}

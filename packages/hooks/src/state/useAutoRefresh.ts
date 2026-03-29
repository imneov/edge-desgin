import { useEffect, useRef, useCallback } from 'react'

export interface UseAutoRefreshOptions {
  /** Interval in milliseconds. Set to 0 or null to disable. */
  interval: number | null
  /** Whether the auto-refresh is active. Defaults to true. */
  enabled?: boolean
  /** Whether to fire immediately on mount before the first interval. */
  immediate?: boolean
}

export function useAutoRefresh(
  callback: () => void,
  options: UseAutoRefreshOptions
): { refresh: () => void } {
  const { interval, enabled = true, immediate = false } = options
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!enabled || !interval) return

    if (immediate) {
      callbackRef.current()
    }

    const id = setInterval(() => {
      callbackRef.current()
    }, interval)

    return () => clearInterval(id)
  }, [interval, enabled, immediate])

  const refresh = useCallback(() => {
    callbackRef.current()
  }, [])

  return { refresh }
}

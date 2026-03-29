import { useState, useEffect, useCallback } from 'react'

type Serializer<T> = {
  read: (value: string) => T
  write: (value: T) => string
}

const defaultSerializer: Serializer<unknown> = {
  read: (value) => {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  },
  write: (value) => JSON.stringify(value),
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  serializer?: Serializer<T>
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const s = (serializer ?? defaultSerializer) as Serializer<T>

  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? s.read(item) : initialValue
    } catch {
      return initialValue
    }
  }, [key, initialValue, s])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      if (typeof window === 'undefined') return
      try {
        const newValue = value instanceof Function ? value(readValue()) : value
        window.localStorage.setItem(key, s.write(newValue))
        setStoredValue(newValue)
        window.dispatchEvent(new StorageEvent('storage', { key }))
      } catch {
        // ignore write errors
      }
    },
    [key, readValue, s]
  )

  const removeValue = useCallback(() => {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(key)
    setStoredValue(initialValue)
  }, [key, initialValue])

  useEffect(() => {
    setStoredValue(readValue())
  }, [readValue])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(readValue())
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, readValue])

  return [storedValue, setValue, removeValue]
}

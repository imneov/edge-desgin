import { useState, useEffect, useCallback, useRef } from 'react'
import type { ApiClientConfig, Cluster, UseDataResult } from './types'

export interface UseClustersOptions {
  /** Filter clusters by name (case-insensitive substring match on server side) */
  search?: string
}

function buildUrl(baseUrl: string, search?: string): string {
  const url = new URL(`${baseUrl}/clusters`)
  if (search) url.searchParams.set('search', search)
  return url.toString()
}

function buildHeaders(config: ApiClientConfig): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...config.headers,
  }
  if (config.token) {
    headers['Authorization'] = `Bearer ${config.token}`
  }
  return headers
}

export function useClusters(
  config: ApiClientConfig,
  options: UseClustersOptions = {}
): UseDataResult<Cluster[]> {
  const { search } = options

  const [data, setData] = useState<Cluster[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(() => {
    // Cancel any in-flight request
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    fetch(buildUrl(config.baseUrl, search), {
      headers: buildHeaders(config),
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        return res.json() as Promise<Cluster[]>
      })
      .then((result) => {
        setData(result)
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err : new Error(String(err)))
        setLoading(false)
      })
  }, [config.baseUrl, config.token, JSON.stringify(config.headers), search]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData()
    return () => abortRef.current?.abort()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

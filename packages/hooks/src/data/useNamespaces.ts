import { useState, useEffect, useCallback, useRef } from 'react'
import type { ApiClientConfig, Namespace, UseDataResult } from './types'

export interface UseNamespacesOptions {
  /** Required: scope the list to a specific cluster */
  clusterId: string
  /** Optional: further scope to a specific workspace */
  workspaceId?: string
  /** Filter namespaces by name */
  search?: string
}

function buildUrl(baseUrl: string, options: UseNamespacesOptions): string {
  const url = new URL(`${baseUrl}/namespaces`)
  url.searchParams.set('clusterId', options.clusterId)
  if (options.workspaceId) url.searchParams.set('workspaceId', options.workspaceId)
  if (options.search) url.searchParams.set('search', options.search)
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

export function useNamespaces(
  config: ApiClientConfig,
  options: UseNamespacesOptions
): UseDataResult<Namespace[]> {
  const [data, setData] = useState<Namespace[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(() => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setLoading(true)
    setError(null)

    fetch(buildUrl(config.baseUrl, options), {
      headers: buildHeaders(config),
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
        return res.json() as Promise<Namespace[]>
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
  }, [ // eslint-disable-line react-hooks/exhaustive-deps
    config.baseUrl,
    config.token,
    JSON.stringify(config.headers),
    options.clusterId,
    options.workspaceId,
    options.search,
  ])

  useEffect(() => {
    fetchData()
    return () => abortRef.current?.abort()
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

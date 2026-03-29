/**
 * Configuration for the API client.
 * Pass this to data hooks to specify where to fetch from and how to authenticate.
 */
export interface ApiClientConfig {
  /** Base URL of the API server, e.g. "https://api.example.com" */
  baseUrl: string
  /** Bearer token for Authorization header */
  token?: string
  /** Additional HTTP headers to include in every request */
  headers?: Record<string, string>
}

/** Common return shape for all data-fetching hooks */
export interface UseDataResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

// ─── Domain resource types ───────────────────────────────────────────────────

export interface Cluster {
  id: string
  name: string
  status?: string
  /** Optional metadata labels */
  labels?: Record<string, string>
}

export interface Workspace {
  id: string
  name: string
  clusterId: string
  labels?: Record<string, string>
}

export interface Namespace {
  id: string
  name: string
  clusterId: string
  workspaceId?: string
  labels?: Record<string, string>
}

export interface NodeGroup {
  id: string
  name: string
  clusterId: string
  labels?: Record<string, string>
}

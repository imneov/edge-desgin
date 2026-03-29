"use client"

import * as React from "react"
import { SearchableSelect, SearchableSelectOption } from "@edge/ui"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface NamespaceData {
  metadata: {
    name: string
    annotations?: Record<string, string>
  }
}

export interface NamespaceSelectorProps {
  /** Current selected namespace name */
  value: string
  /** Callback when selection changes */
  onValueChange: (value: string) => void
  /** Namespace data to display */
  namespaces: NamespaceData[]
  /** Whether data is loading */
  loading?: boolean
  /** Placeholder text */
  placeholder?: string
  /** Additional CSS classes */
  className?: string
  /** Width of the selector */
  width?: string | number
  /** Whether to include "All Namespaces" option */
  includeAllOption?: boolean
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function namespacesToOptions(
  namespaces: NamespaceData[],
  includeAll: boolean
): SearchableSelectOption[] {
  const options: SearchableSelectOption[] = []

  if (includeAll) {
    options.push({ value: 'all', label: '所有命名空间' })
  }

  return options.concat(
    namespaces.map((namespace) => ({
      value: namespace.metadata.name,
      label: namespace.metadata.name,
    }))
  )
}

function filterNamespaces(
  namespaces: NamespaceData[],
  query: string
): NamespaceData[] {
  if (!query.trim()) return namespaces

  const lowerQuery = query.toLowerCase()
  return namespaces.filter((namespace) => {
    const name = namespace.metadata.name.toLowerCase()
    return name.includes(lowerQuery)
  })
}

// ─── Component ───────────────────────────────────────────────────────────────

export function NamespaceSelector({
  value,
  onValueChange,
  namespaces,
  loading = false,
  placeholder = "选择命名空间",
  className,
  width,
  includeAllOption = true,
}: NamespaceSelectorProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

  // Filter namespaces based on search query
  const filteredNamespaces = React.useMemo(() => {
    return filterNamespaces(namespaces, searchQuery)
  }, [namespaces, searchQuery])

  // Convert to options
  const options = React.useMemo(() => {
    return namespacesToOptions(filteredNamespaces, includeAllOption)
  }, [filteredNamespaces, includeAllOption])

  const handleSearch = React.useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  return (
    <SearchableSelect
      value={value}
      onValueChange={onValueChange}
      options={options}
      onSearch={handleSearch}
      loading={loading}
      placeholder={placeholder}
      searchPlaceholder="搜索命名空间名称..."
      className={className}
      width={width}
      emptyText="未找到匹配的命名空间"
      loadingText="加载命名空间中..."
      clearable
    />
  )
}

"use client"

import * as React from "react"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LabelsDisplayProps {
  /** Labels object to display */
  labels?: { [key: string]: string }
  /** Message shown when no labels exist */
  emptyMessage?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * LabelsDisplay - Kubernetes labels display component
 *
 * Shows labels in a badge format:
 * - Left side: dark gray background with white key text
 * - Right side: light gray background with dark value text
 * - Auto-wrapping flex layout
 *
 * @example
 * ```tsx
 * <LabelsDisplay
 *   labels={{
 *     'app': 'nginx',
 *     'environment': 'production'
 *   }}
 * />
 * ```
 */
export function LabelsDisplay({
  labels,
  emptyMessage = "无标签",
  className = "",
}: LabelsDisplayProps) {
  if (!labels || Object.keys(labels).length === 0) {
    return <span className={`text-gray-500 text-xs ${className}`}>{emptyMessage}</span>
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {Object.entries(labels).map(([key, value]) => (
        <div key={key} className="inline-flex">
          <span className="bg-gray-800 text-white px-2 py-1 text-xs rounded-l border">
            {key}
          </span>
          <span className="bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-r border border-l-0">
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}

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
          <span
            style={{ backgroundColor: "#1e293b", color: "white", padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "0.25rem 0 0 0.25rem" }}
          >
            {key}
          </span>
          <span
            style={{ backgroundColor: "#f1f5f9", color: "#1e293b", padding: "0.25rem 0.5rem", fontSize: "0.75rem", borderRadius: "0 0.25rem 0.25rem 0" }}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  )
}

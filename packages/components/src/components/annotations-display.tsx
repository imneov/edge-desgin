"use client"

import * as React from "react"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface AnnotationsDisplayProps {
  /** Annotations object to display */
  annotations?: { [key: string]: string }
  /** Message shown when no annotations exist */
  emptyMessage?: string
  /** Column span for grid layout [key-cols, value-cols] */
  colSpan?: [number, number]
  /** Additional CSS classes */
  className?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * AnnotationsDisplay - Kubernetes annotations display component
 *
 * Shows annotations in a grid layout:
 * - 12-column grid system
 * - Left side: key (gray text, wrappable)
 * - Right side: value (monospace font, light gray background, wrappable)
 *
 * @example
 * ```tsx
 * <AnnotationsDisplay
 *   annotations={{
 *     'kubectl.kubernetes.io/last-applied-configuration': '{}',
 *     'description': 'Production web server'
 *   }}
 * />
 * ```
 */
export function AnnotationsDisplay({
  annotations,
  emptyMessage = "无注解",
  colSpan = [3, 9],
  className = "",
}: AnnotationsDisplayProps) {
  if (!annotations || Object.keys(annotations).length === 0) {
    return <span className={`text-gray-500 text-xs ${className}`}>{emptyMessage}</span>
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Object.entries(annotations).map(([key, value]) => (
        <div key={key} className="grid grid-cols-12 gap-4 text-xs">
          <div className={`col-span-${colSpan[0]} text-gray-600 break-words p-2`}>
            {key}
          </div>
          <div className={`col-span-${colSpan[1]} text-gray-900 break-all font-mono bg-gray-50 p-2 rounded`}>
            {value}
          </div>
        </div>
      ))}
    </div>
  )
}

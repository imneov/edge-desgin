"use client"

import * as React from "react"
import { cn } from "../utils"

export interface PropertyItem {
  /** Property label (key) */
  label: string
  /** Property value — string or custom ReactNode */
  value: React.ReactNode
  /** Span multiple columns (defaults to 1) */
  span?: number
}

export interface PropertyListProps {
  /** Array of property items to display */
  items: PropertyItem[]
  /** Number of columns in the grid (1–4) */
  columns?: 1 | 2 | 3 | 4
  /** Additional CSS classes for the grid container */
  className?: string
  /** CSS classes for individual label elements */
  labelClassName?: string
  /** CSS classes for individual value elements */
  valueClassName?: string
}

const columnClasses: Record<1 | 2 | 3 | 4, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
}

const spanClasses: Record<number, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
}

export function PropertyList({
  items,
  columns = 3,
  className,
  labelClassName,
  valueClassName,
}: PropertyListProps) {
  return (
    <div
      className={cn(
        "grid gap-x-12 gap-y-3 text-sm",
        columnClasses[columns],
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center min-w-0",
            item.span && item.span > 1 ? spanClasses[item.span] : undefined
          )}
        >
          <span
            className={cn(
              "text-muted-foreground shrink-0 mr-2",
              labelClassName
            )}
          >
            {item.label}:
          </span>
          <span className={cn("text-foreground truncate", valueClassName)}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

"use client"

import { Package } from "lucide-react"
import { cn } from "../utils"

export interface EmptyStateProps {
  title?: string
  icon?: React.ComponentType<{ className?: string }>
  loading?: boolean
}

export function EmptyState({ title = "暂无数据", icon: Icon = Package, loading = false }: EmptyStateProps) {
  return (
    <div className={cn("p-8 text-center text-gray-500", loading && "opacity-60 pointer-events-none")}>
      <Icon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}

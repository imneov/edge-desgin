"use client"

import { Loading } from "./spinner"
import { cn } from "../utils"

export interface LoadingOverlayProps {
  loading: boolean
  text?: string
  className?: string
}

export function LoadingOverlay({ loading, text = "加载中...", className }: LoadingOverlayProps) {
  if (!loading) return null

  return (
    <div className={cn("absolute top-12 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-10", className)}>
      <Loading text={text} />
    </div>
  )
}

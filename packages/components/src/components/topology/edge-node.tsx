"use client"

import * as React from "react"
import { memo } from "react"
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import { Cpu, CheckCircle2, AlertTriangle, AlertCircle, Activity } from "lucide-react"

// ─── Types ────────────────────────────────────────��──────────────────────────

export type EdgeNodeStatus = 'healthy' | 'warning' | 'error'

export interface EdgeNodeData extends Record<string, unknown> {
  label: string
  status?: EdgeNodeStatus
  metadata?: Record<string, string | number>
  cpuPercent?: number
  memPercent?: number
}

type EdgeNodeType = Node<EdgeNodeData, 'edgeNode'>

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * EdgeNode - Edge node component for topology visualization
 *
 * Displays individual edge compute nodes with:
 * - Semi-transparent green background
 * - CPU icon for visual identification
 * - Status with animated pulse dot
 * - Optional CPU/Memory metrics
 */
export const EdgeNode = memo(({ data }: NodeProps<EdgeNodeType>) => {
  const status = data.status || 'healthy'

  const statusConfig = {
    healthy: { icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-500', label: '运行中' },
    warning: { icon: AlertTriangle, color: 'text-amber-600', bgColor: 'bg-amber-500', label: '警告' },
    error: { icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-500', label: '离线' },
  }

  return (
    <div
      className={`
        px-3 py-2 w-[180px] rounded-lg
        border-2 border-solid
        transition-all duration-200 hover:shadow-md
      `}
      style={{
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'var(--node)',
      }}
    >
      {/* Top handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!w-2.5 !h-2.5 !border-2"
        style={{
          backgroundColor: 'var(--node)',
          borderColor: 'var(--topology-bg)',
        }}
      />

      <div className="flex items-center gap-2.5">
        <div
          className="p-1.5 rounded-md"
          style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}
        >
          <Cpu className="w-4 h-4" style={{ color: 'var(--node-foreground)' }} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium" style={{ color: 'var(--node-foreground)' }}>
            {data.label}
          </span>
          <span className="text-xs text-gray-500">节点</span>
        </div>
      </div>

      {/* Status info */}
      <div
        className="mt-2 pt-2 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(16, 185, 129, 0.3)' }}
      >
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${statusConfig[status].bgColor} animate-pulse`} />
          <span className={`text-xs ${statusConfig[status].color}`}>
            {statusConfig[status].label}
          </span>
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Activity className="w-3 h-3" />
          <span className="text-xs">活跃</span>
        </div>
      </div>

      {/* Monitoring metrics */}
      {(data.cpuPercent !== undefined || data.memPercent !== undefined) && (
        <div className="mt-2 flex gap-3 text-xs">
          {data.cpuPercent !== undefined && (
            <div className="flex items-center gap-1">
              <span className="text-gray-500">CPU</span>
              <span className="text-blue-600 font-medium">{data.cpuPercent}%</span>
            </div>
          )}
          {data.memPercent !== undefined && (
            <div className="flex items-center gap-1">
              <span className="text-gray-500">内存</span>
              <span className="text-green-600 font-medium">{data.memPercent}%</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
})

EdgeNode.displayName = 'EdgeNode'

"use client"

import * as React from "react"
import { memo } from "react"
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import { Layers, ChevronDown, ChevronRight, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export type NodeGroupNodeStatus = 'healthy' | 'warning' | 'error'

export interface NodeGroupNodeData extends Record<string, unknown> {
  label: string
  nodeCount?: number
  status?: NodeGroupNodeStatus
  collapsed?: boolean
  onToggle?: () => void
  domain?: 'cloud' | 'edge'
  level?: number
}

type NodeGroupNodeType = Node<NodeGroupNodeData, 'nodeGroupNode'>

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * NodeGroupNode - Node group component for topology visualization
 *
 * Displays edge node groups with:
 * - Transparent background + green dashed border
 * - Layers icon
 * - Status indicator with node count
 * - Expand/collapse toggle
 */
export const NodeGroupNode = memo(({ data }: NodeProps<NodeGroupNodeType>) => {
  const status = data.status || 'healthy'
  const collapsed = data.collapsed
  const hasChildren = data.nodeCount && data.nodeCount > 0

  const statusConfig = {
    healthy: { icon: CheckCircle2, color: 'text-green-600', label: '正常' },
    warning: { icon: AlertTriangle, color: 'text-amber-600', label: '警告' },
    error: { icon: AlertCircle, color: 'text-red-600', label: '异常' },
  }

  const StatusIcon = statusConfig[status].icon

  return (
    <div
      className={`
        px-4 py-2.5 w-[200px] rounded-lg cursor-pointer
        bg-transparent
        border-2 border-dashed
        transition-all duration-200 hover:bg-emerald-50 hover:scale-[1.02]
      `}
      style={{
        borderColor: 'var(--node-group)',
      }}
      onClick={data.onToggle}
    >
      {/* Top handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!w-3 !h-3 !border-2"
        style={{
          backgroundColor: 'var(--node-group)',
          borderColor: 'var(--topology-bg)',
        }}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
          >
            <Layers className="w-4 h-4" style={{ color: 'var(--node-group)' }} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{data.label}</span>
            <span className="text-xs text-gray-500">节点组</span>
          </div>
        </div>

        {hasChildren && (
          <div className="text-gray-400">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        )}
      </div>

      {/* Status info */}
      <div
        className="mt-2 pt-2 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(16, 185, 129, 0.3)' }}
      >
        <div className="flex items-center gap-1.5">
          <StatusIcon className={`w-3.5 h-3.5 ${statusConfig[status].color}`} />
          <span className={`text-xs ${statusConfig[status].color}`}>{statusConfig[status].label}</span>
        </div>
        {hasChildren && (
          <span className="text-xs text-gray-500">{data.nodeCount} 个节点</span>
        )}
      </div>

      {/* Bottom handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!w-3 !h-3 !border-2"
        style={{
          backgroundColor: 'var(--node-group)',
          borderColor: 'var(--topology-bg)',
        }}
      />
    </div>
  )
})

NodeGroupNode.displayName = 'NodeGroupNode'

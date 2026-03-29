"use client"

import * as React from "react"
import { memo } from "react"
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react"
import { Server, ChevronDown, ChevronRight, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react"

// ─── Types ──────────────────────────────────────────────────────���────────────

export type ClusterNodeStatus = 'healthy' | 'warning' | 'error'

export interface ClusterNodeData extends Record<string, unknown> {
  label: string
  isVirtual?: boolean
  childCount?: number
  status?: ClusterNodeStatus
  collapsed?: boolean
  onToggle?: () => void
  domain?: 'cloud' | 'edge'
  level?: number
  nodeType?: string
  cpuPercent?: number
  memPercent?: number
  nodeCount?: number
  podCount?: number
  edgeRuntime?: string
}

type ClusterNodeType = Node<ClusterNodeData, 'clusterNode'>

// ─── Constants ───────────────────────────────────────────────────────────────

const EDGE_RUNTIME_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
  openyurt: { label: 'OpenYurt', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  kubeedge: { label: 'KubeEdge', color: 'text-orange-600', bgColor: 'bg-orange-100' },
}

const TYPE_LABELS: Record<string, string> = {
  hostCluster: 'Host 集群',
  memberCluster: 'Member 集群',
  virtualCluster: '虚拟集群',
  memberVirtualCluster: '虚拟集群',
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * ClusterNode - Cluster node component for topology visualization
 *
 * Displays Host/Member/Virtual clusters with:
 * - Type labels and runtime badges
 * - Status icons with colors
 * - Expand/collapse toggle
 * - Optional monitoring metrics
 */
export const ClusterNode = memo(({ data }: NodeProps<ClusterNodeType>) => {
  const isVirtual = data.isVirtual
  const status = data.status || 'healthy'
  const collapsed = data.collapsed
  const hasChildren = data.childCount && data.childCount > 0
  const nodeType = data.nodeType || 'hostCluster'
  const level = data.level ?? 0
  const edgeRuntime = data.edgeRuntime

  const runtimeConfig = edgeRuntime ? EDGE_RUNTIME_CONFIG[edgeRuntime.toLowerCase()] : null

  const statusConfig = {
    healthy: { icon: CheckCircle2, color: 'text-green-600', bgColor: 'bg-green-100', label: '正常' },
    warning: { icon: AlertTriangle, color: 'text-amber-600', bgColor: 'bg-amber-100', label: '警告' },
    error: { icon: AlertCircle, color: 'text-red-600', bgColor: 'bg-red-100', label: '异常' },
  }

  const StatusIcon = statusConfig[status].icon

  return (
    <div
      className={`
        px-4 py-3 w-[220px] rounded-lg cursor-pointer
        bg-white shadow-md
        ${isVirtual ? 'border-2 border-dashed' : 'border-2 border-solid'}
        transition-all duration-200 hover:shadow-lg hover:scale-[1.02]
      `}
      style={{
        borderColor: 'var(--cluster)',
      }}
      onClick={data.onToggle}
    >
      {/* Top handle (L0 has no top handle) */}
      {level > 0 && (
        <Handle
          type="target"
          position={Position.Top}
          id="top"
          className="!w-3 !h-3 !border-2 !border-white"
          style={{ backgroundColor: 'var(--cluster)' }}
        />
      )}

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg ${isVirtual ? 'bg-gray-100' : 'bg-slate-100'}`}
          >
            <Server
              className="w-5 h-5"
              style={{ color: 'var(--cluster)' }}
              strokeWidth={isVirtual ? 1.5 : 2}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{data.label}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500">
                {TYPE_LABELS[nodeType] || '集群'}
              </span>
              {runtimeConfig && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${runtimeConfig.bgColor} ${runtimeConfig.color}`}>
                  {runtimeConfig.label}
                </span>
              )}
            </div>
          </div>
        </div>

        {hasChildren && (
          <div className="text-gray-400">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        )}
      </div>

      {/* Status info */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex items-center gap-1.5">
          <StatusIcon className={`w-3.5 h-3.5 ${statusConfig[status].color}`} />
          <span className={`text-xs ${statusConfig[status].color}`}>{statusConfig[status].label}</span>
        </div>
      </div>

      {/* Monitoring metrics */}
      {(data.cpuPercent !== undefined || data.nodeCount !== undefined) && (
        <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
          {data.cpuPercent !== undefined && (
            <div className="flex justify-between">
              <span className="text-gray-500">CPU</span>
              <span className="text-blue-600 font-medium">{data.cpuPercent}%</span>
            </div>
          )}
          {data.memPercent !== undefined && (
            <div className="flex justify-between">
              <span className="text-gray-500">内存</span>
              <span className="text-green-600 font-medium">{data.memPercent}%</span>
            </div>
          )}
          {data.nodeCount !== undefined && (
            <div className="flex justify-between">
              <span className="text-gray-500">节点</span>
              <span className="text-gray-700 font-medium">{data.nodeCount}</span>
            </div>
          )}
          {data.podCount !== undefined && (
            <div className="flex justify-between">
              <span className="text-gray-500">Pod</span>
              <span className="text-purple-600 font-medium">{data.podCount}</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!w-3 !h-3 !border-2 !border-white"
        style={{ backgroundColor: 'var(--cluster)' }}
      />

      {/* Right handle (L0 for L1, L1 for L2) */}
      {(level === 0 || level === 1) && (
        <Handle
          type="source"
          position={Position.Right}
          id="right"
          className="!w-3 !h-3 !border-2 !border-white"
          style={{ backgroundColor: 'var(--cluster)' }}
        />
      )}
    </div>
  )
})

ClusterNode.displayName = 'ClusterNode'

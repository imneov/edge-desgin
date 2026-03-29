"use client"

import * as React from "react"
import {
  Server,
  Cpu,
  HardDrive,
  Activity,
  ArrowUpDown,
  ChevronRight,
  type LucideIcon
} from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export type NodeCardStatus = 'normal' | 'warning' | 'offline'

export interface NodeCardProps {
  /** Node name */
  name: string
  /** Node alias name */
  aliasName?: string
  /** Tenant information */
  tenant?: string
  /** Node IP address */
  ip: string
  /** Whether the node is ready */
  isReady: boolean
  /** CPU usage percentage (0-100) */
  cpuPercent: number
  /** Memory usage percentage (0-100) */
  memPercent: number
  /** Disk usage percentage (0-100) */
  diskPercent: number
  /** GPU usage percentage (0-100) */
  gpuPercent?: number
  /** GPU memory usage percentage */
  gpuMemPercent?: number
  /** GPU memory usage string */
  gpuMemUsage?: string
  /** GPU memory total string */
  gpuMemTotal?: string
  /** CPU usage string */
  cpuUsage?: string
  /** CPU total string */
  cpuTotal?: string
  /** Memory usage string */
  memUsage?: string
  /** Memory total string */
  memTotal?: string
  /** Disk usage string */
  diskUsage?: string
  /** Disk total string */
  diskTotal?: string
  /** Current pod count */
  podCount?: number
  /** Pod capacity */
  podCapacity?: number
  /** Load average (1 min) */
  load1?: number
  /** Click callback */
  onClick?: () => void
  /** Additional CSS classes */
  className?: string
}

// ─── Helper Components ───────────────────────────────────────────────────────

/**
 * MemoryIcon - Custom memory stick icon
 */
function MemoryIcon({ size = 13, strokeWidth = 1.5, className = '' }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="8" width="16" height="8" rx="1" />
      <line x1="7" y1="8" x2="7" y2="5" />
      <line x1="11" y1="8" x2="11" y2="5" />
      <line x1="15" y1="8" x2="15" y2="5" />
      <line x1="7" y1="16" x2="7" y2="19" />
      <line x1="11" y1="16" x2="11" y2="19" />
      <line x1="15" y1="16" x2="15" y2="19" />
    </svg>
  )
}

/**
 * GpuIcon - Custom GPU icon
 */
function GpuIcon({ size = 13, strokeWidth = 1.5, className = '' }: { size?: number; strokeWidth?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
      <line x1="5" y1="18" x2="5" y2="20" />
      <line x1="9" y1="18" x2="9" y2="20" />
      <line x1="15" y1="18" x2="15" y2="20" />
      <line x1="19" y1="18" x2="19" y2="20" />
    </svg>
  )
}

interface StatusConfig {
  label: string
  dotColor: string
  textColor: string
  bgColor: string
  hex: string
}

const statusConfigs: Record<NodeCardStatus, StatusConfig> = {
  normal: {
    label: '正常',
    dotColor: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    hex: '#10B981'
  },
  warning: {
    label: '警告',
    dotColor: 'bg-amber-500',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
    hex: '#F59E0B'
  },
  offline: {
    label: '离线',
    dotColor: 'bg-slate-400',
    textColor: 'text-slate-500',
    bgColor: 'bg-slate-100',
    hex: '#94A3B8'
  }
}

function getNodeStatus(cpuPercent: number, memPercent: number, diskPercent: number, gpuPercent: number, isReady: boolean): NodeCardStatus {
  if (!isReady) return 'offline'
  const allPercents = [cpuPercent, memPercent, diskPercent, gpuPercent]
  const maxPercent = Math.max(...allPercents)
  if (maxPercent >= 70) return 'warning'
  return 'normal'
}

/**
 * RadialChart - Radial progress chart component
 */
function RadialChart({
  value,
  label,
  icon: Icon,
  status
}: {
  value: number
  label: string
  icon: LucideIcon | React.ElementType
  status: NodeCardStatus
}) {
  const size = 80
  const strokeWidth = 7
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(100, Math.max(0, value))
  const offset = circumference - (progress / 100) * circumference

  const isOffline = status === 'offline'

  // Get color configuration
  const getColor = () => {
    if (isOffline) {
      return { ring: 'var(--cockpit-text-muted, #cbd5e1)', text: 'text-slate-400', track: 'var(--cockpit-bg, #f1f5f9)' }
    }
    if (value >= 70) {
      return { ring: 'var(--cockpit-warning, #f59e0b)', text: 'text-amber-500', track: 'var(--cockpit-warning-muted, rgba(245, 158, 11, 0.1))' }
    }
    return { ring: 'var(--cockpit-accent, #3b82f6)', text: 'text-blue-600', track: 'var(--cockpit-accent-muted, rgba(59, 130, 246, 0.1))' }
  }

  const colors = getColor()
  const center = size / 2

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colors.track}
            strokeWidth={strokeWidth}
          />
          {/* Progress ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colors.ring}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        {/* Center value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-xl font-bold tabular-nums ${colors.text}`}>
            {value}
            <span className="text-sm font-medium">%</span>
          </span>
        </div>
      </div>
      {/* Label with icon */}
      <div className={`flex items-center gap-1.5 mt-3 ${isOffline ? 'text-slate-400' : 'text-slate-500'}`}>
        <Icon size={13} strokeWidth={1.5} />
        <span className="text-xs font-medium">{label}</span>
      </div>
    </div>
  )
}

/**
 * StatusBadge - Status badge component
 */
function StatusBadge({ status }: { status: NodeCardStatus }) {
  const config = statusConfigs[status]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${config.textColor} ${config.bgColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * NodeCard - Edge node status card with radial progress charts
 *
 * Features:
 * - Large radial progress charts for CPU, Memory, Disk, GPU
 * - Status badge (normal=green, warning=orange, offline=gray)
 * - Pod count and load display at bottom
 * - Offline state with reduced opacity
 * - Hover effects with scale and shadow
 *
 * @example
 * ```tsx
 * <NodeCard
 *   name="edge-node-01"
 *   ip="192.168.1.100"
 *   isReady={true}
 *   cpuPercent={45}
 *   memPercent={60}
 *   diskPercent={75}
 *   gpuPercent={0}
 *   podCount={12}
 *   podCapacity={110}
 *   load1={1.5}
 *   onClick={() => console.log('Node clicked')}
 * />
 * ```
 */
export function NodeCard({
  name,
  aliasName,
  tenant,
  ip,
  isReady,
  cpuPercent,
  memPercent,
  diskPercent,
  gpuPercent = 0,
  podCount = 0,
  podCapacity = 0,
  load1 = 0,
  onClick,
  className = ''
}: NodeCardProps) {
  const nodeStatus = getNodeStatus(cpuPercent, memPercent, diskPercent, gpuPercent, isReady)
  const isOffline = nodeStatus === 'offline'

  return (
    <div
      className={`bg-white rounded-xl border border-slate-200/80 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300 cursor-pointer ${isOffline ? 'opacity-70' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="p-5">
        {/* Header: Node info + status */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isOffline ? 'bg-slate-100' : 'bg-blue-50'}`}>
              <Server size={20} className={isOffline ? 'text-slate-300' : 'text-blue-600'} />
            </div>
            <div>
              <h3 className={`text-sm font-semibold ${isOffline ? 'text-slate-400' : 'text-slate-800'}`}>
                {aliasName && aliasName !== name ? aliasName : name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <p className={`text-xs font-mono ${isOffline ? 'text-slate-400' : 'text-slate-400'}`}>
                  {ip}
                </p>
                {tenant && tenant !== '-' && (
                  <>
                    <span className="text-slate-300">|</span>
                    <span className={`text-xs ${isOffline ? 'text-slate-400' : 'text-blue-600'}`}>
                      {tenant}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <StatusBadge status={nodeStatus} />
        </div>

        {/* Resource metrics - Large radial charts */}
        <div className="flex items-center justify-between py-5 px-2">
          <RadialChart value={cpuPercent} label="CPU" icon={Cpu} status={nodeStatus} />
          <RadialChart value={memPercent} label="内存" icon={MemoryIcon} status={nodeStatus} />
          <RadialChart value={diskPercent} label="磁盘" icon={HardDrive} status={nodeStatus} />
          <RadialChart value={gpuPercent} label="GPU" icon={GpuIcon} status={nodeStatus} />
        </div>

        {/* Bottom stats */}
        <div className={`flex items-center gap-3 pt-4 border-t border-slate-100 text-xs ${isOffline ? 'text-slate-400' : 'text-slate-500'}`}>
          <div className="flex items-center gap-1.5">
            <Activity size={13} strokeWidth={1.5} />
            <span>Pods</span>
            <span className={`font-semibold tabular-nums ${isOffline ? 'text-slate-400' : 'text-slate-700'}`}>
              {podCount}/{podCapacity}
            </span>
          </div>
          <div className="w-px h-3.5 bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <ArrowUpDown size={13} strokeWidth={1.5} />
            <span>负载</span>
            <span className={`font-semibold tabular-nums ${isOffline ? 'text-slate-400' : 'text-slate-700'}`}>
              {load1?.toFixed(2)}
            </span>
          </div>
          <div className="flex-1" />
          <ChevronRight size={16} className="text-slate-300" />
        </div>
      </div>
    </div>
  )
}

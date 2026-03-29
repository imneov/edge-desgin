"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export type ColorMode = 'cyan' | 'success' | 'warning' | 'danger' | 'purple' | 'default'
export type TrendDirection = 'up' | 'down' | 'neutral'

export interface StatCardProps {
  /** Icon component from lucide-react */
  icon: LucideIcon
  /** Main metric value */
  value: string | number
  /** Label for the metric */
  label: string
  /** Unit to display after value */
  unit?: string
  /** Color mode for the card */
  colorMode?: ColorMode
  /** Optional sub-information to display */
  subInfo?: React.ReactNode
  /** Trend direction indicator */
  trend?: TrendDirection
  /** Trend value to display */
  trendValue?: string
  /** Additional CSS classes */
  className?: string
}

export interface MiniStatProps {
  /** Label for the stat */
  label: string
  /** Value to display */
  value: string | number
  /** Color mode */
  color?: ColorMode
  /** Additional CSS classes */
  className?: string
}

export interface NetworkStatProps {
  /** Inbound traffic value */
  inbound: string
  /** Outbound traffic value */
  outbound: string
  /** Additional CSS classes */
  className?: string
}

export interface PodStatProps {
  /** Total pod count */
  total: number
  /** Running pod count */
  running: number
  /** Abnormal pod count */
  abnormal: number
  /** Failed pod count */
  failed: number
  /** Additional CSS classes */
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

interface ColorConfig {
  iconBg: string
  iconColor: string
  valueColor: string
}

const colorConfigs: Record<ColorMode, ColorConfig> = {
  cyan: {
    iconBg: 'bg-cyan-500/20',
    iconColor: 'text-cyan-400',
    valueColor: 'text-cyan-400'
  },
  success: {
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    valueColor: 'text-emerald-400'
  },
  warning: {
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
    valueColor: 'text-amber-400'
  },
  danger: {
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
    valueColor: 'text-red-400'
  },
  purple: {
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
    valueColor: 'text-purple-400'
  },
  default: {
    iconBg: 'bg-slate-600/50',
    iconColor: 'text-slate-300',
    valueColor: 'text-slate-100'
  }
}

function getColorConfig(mode: ColorMode = 'default'): ColorConfig {
  return colorConfigs[mode] || colorConfigs.default
}

// ─── Components ───────────────────────────────────────────────────────────────

/**
 * StatCard - Dark theme statistics card for displaying key metrics
 *
 * Features:
 * - Icon with colored background
 * - Large value display with unit
 * - Label text
 * - Optional trend indicator
 * - Optional sub-information section
 *
 * @example
 * ```tsx
 * <StatCard
 *   icon={Cpu}
 *   value={42}
 *   unit="%"
 *   label="CPU Usage"
 *   colorMode="cyan"
 *   trend="up"
 *   trendValue="+5%"
 * />
 * ```
 */
export function StatCard({
  icon: Icon,
  value,
  label,
  unit,
  colorMode = 'default',
  subInfo,
  trend,
  trendValue,
  className = '',
}: StatCardProps) {
  const colors = getColorConfig(colorMode)

  return (
    <div className={`cockpit-card p-4 flex flex-col h-full ${className}`}>
      {/* Icon */}
      <div className={`w-10 h-10 rounded-lg ${colors.iconBg} flex items-center justify-center mb-3`}>
        <Icon className={`h-5 w-5 ${colors.iconColor}`} />
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className={`text-2xl font-bold ${colors.valueColor} count-animate`}>
          {value}
        </span>
        {unit && (
          <span className="text-sm text-slate-400">{unit}</span>
        )}
      </div>

      {/* Label */}
      <span className="text-xs text-slate-400 mb-2">{label}</span>

      {/* Trend Indicator */}
      {trend && trendValue && (
        <div className="flex items-center gap-1 mt-auto">
          <span className={`text-xs ${
            trend === 'up' ? 'text-emerald-400' :
            trend === 'down' ? 'text-red-400' :
            'text-slate-400'
          }`}>
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trendValue}
          </span>
        </div>
      )}

      {/* Sub Info */}
      {subInfo && (
        <div className="mt-auto pt-2 border-t border-slate-700/50 text-xs text-slate-400">
          {subInfo}
        </div>
      )}
    </div>
  )
}

/**
 * MiniStat - Compact stat display for limited space
 *
 * @example
 * ```tsx
 * <MiniStat label="Pods" value="42" color="success" />
 * ```
 */
export function MiniStat({ label, value, color = 'default', className = '' }: MiniStatProps) {
  const colorClasses: Record<ColorMode, string> = {
    cyan: 'text-cyan-400',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    danger: 'text-red-400',
    purple: 'text-purple-400',
    default: 'text-slate-100'
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</span>
      <span className={`text-lg font-semibold ${colorClasses[color]}`}>{value}</span>
    </div>
  )
}

/**
 * NetworkStat - Network traffic display with inbound/outbound
 *
 * @example
 * ```tsx
 * <NetworkStat inbound="1.2 GB/s" outbound="856 MB/s" />
 * ```
 */
export function NetworkStat({ inbound, outbound, className = '' }: NetworkStatProps) {
  return (
    <div className={`cockpit-card p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </div>
        <span className="text-sm text-slate-300">网络流量</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400">入站</span>
          </div>
          <span className="text-sm font-medium text-emerald-400">{inbound}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs text-slate-400">出站</span>
          </div>
          <span className="text-sm font-medium text-cyan-400">{outbound}</span>
        </div>
      </div>
    </div>
  )
}

/**
 * PodStat - Pod status statistics with progress bar
 *
 * @example
 * ```tsx
 * <PodStat total={42} running={38} abnormal={3} failed={1} />
 * ```
 */
export function PodStat({ total, running, abnormal, failed, className = '' }: PodStatProps) {
  const runningPercent = total > 0 ? (running / total) * 100 : 0

  return (
    <div className={`cockpit-card p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <span className="text-sm text-slate-300">Pod</span>
        </div>
        <span className="text-2xl font-bold text-slate-100">{total}</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-emerald-400"
          style={{ width: `${runningPercent}%` }}
        />
      </div>

      {/* Status Details */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-emerald-400">运行: {running}</span>
        <span className="text-amber-400">异常: {abnormal}</span>
        <span className="text-red-400">失败: {failed}</span>
      </div>
    </div>
  )
}

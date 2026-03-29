"use client"

import * as React from "react"
import { Cpu, MemoryStick, HardDrive, LucideIcon } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export type ResourceMetricType = 'cpu' | 'memory' | 'disk'

export interface ResourceMetricCardProps {
  /** Resource type */
  type: ResourceMetricType
  /** Current usage value */
  currentValue: number
  /** Total value */
  totalValue: number
  /** Unit for the values */
  unit: string
  /** Whether the card is selected */
  selected: boolean
  /** Click callback */
  onClick: () => void
  /** Additional CSS classes */
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

interface ResourceConfig {
  icon: LucideIcon
  label: string
  color: string
  bgColor: string
}

const resourceConfigs: Record<ResourceMetricType, ResourceConfig> = {
  cpu: {
    icon: Cpu,
    label: 'CPU 用量',
    color: '#3B82F6',
    bgColor: 'bg-blue-50'
  },
  memory: {
    icon: MemoryStick,
    label: '内存用量',
    color: '#10B981',
    bgColor: 'bg-green-50'
  },
  disk: {
    icon: HardDrive,
    label: '磁盘用量',
    color: '#F59E0B',
    bgColor: 'bg-orange-50'
  }
}

function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * ResourceMetricCard - Resource usage card with progress bar
 *
 * Features:
 * - Icon and label for resource type
 * - Current/total value display
 * - Progress bar showing percentage
 * - Color-coded: CPU=blue, Memory=green, Disk=orange
 * - Selection highlight with blue border
 *
 * @example
 * ```tsx
 * <ResourceMetricCard
 *   type="cpu"
 *   currentValue={4.2}
 *   totalValue={8.0}
 *   unit=" cores"
 *   selected={false}
 *   onClick={() => console.log('CPU clicked')}
 * />
 * ```
 */
export function ResourceMetricCard({
  type,
  currentValue,
  totalValue,
  unit,
  selected,
  onClick,
  className = ''
}: ResourceMetricCardProps) {
  const config = resourceConfigs[type]
  const Icon = config.icon
  const percentage = totalValue > 0 ? (currentValue / totalValue) * 100 : 0

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left rounded p-4 transition-all duration-200',
        'hover:shadow-sm cursor-pointer',
        selected
          ? 'border-2 border-blue-500 bg-blue-50 shadow-md'
          : 'border border-gray-200 bg-white hover:border-gray-300',
        className
      )}
    >
      {/* Icon and title */}
      <div className="flex items-center gap-2 mb-3">
        <Icon
          className="h-5 w-5"
          style={{ color: selected ? '#3B82F6' : config.color }}
        />
        <span className={cn(
          'text-sm font-medium',
          selected ? 'text-blue-700' : 'text-gray-700'
        )}>
          {config.label}
        </span>
      </div>

      {/* Current / Total */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-gray-900">
            {currentValue.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            / {totalValue.toFixed(2)} {unit}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: config.color
            }}
          />
        </div>

        {/* Percentage */}
        <div className="text-xs text-gray-600">
          {percentage.toFixed(1)}% 已使用
        </div>
      </div>
    </button>
  )
}

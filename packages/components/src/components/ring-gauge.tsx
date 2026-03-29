"use client"

import * as React from "react"

// ─── Types ───────────────────────────────────────────────────────────────────

export type RingGaugeColorMode = 'auto' | 'cyan' | 'success' | 'warning' | 'danger' | 'purple'
export type RingGaugeSize = 'sm' | 'md' | 'lg'

export interface RingGaugeProps {
  /** Current value (0-100 percentage) */
  value: number
  /** Label to display */
  label: string
  /** Unit to display (default '%') */
  unit?: string
  /** Size variant */
  size?: RingGaugeSize
  /** Color mode for the gauge */
  colorMode?: RingGaugeColorMode
  /** Whether to animate the value change */
  animated?: boolean
  /** Custom display value (overrides percentage) */
  displayValue?: string
  /** Stroke width of the ring */
  strokeWidth?: number
  /** Additional CSS classes */
  className?: string
}

export interface RingGaugeGroupProps {
  /** Child elements */
  children: React.ReactNode
  /** Additional CSS classes */
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

type SizeConfig = {
  width: number
  radius: number
  fontSize: string
  labelSize: string
}

const sizeConfigs: Record<RingGaugeSize, SizeConfig> = {
  sm: { width: 64, radius: 26, fontSize: 'text-lg', labelSize: 'text-[10px]' },
  md: { width: 80, radius: 34, fontSize: 'text-xl', labelSize: 'text-xs' },
  lg: { width: 96, radius: 40, fontSize: 'text-2xl', labelSize: 'text-xs' }
}

function getColor(value: number, mode: RingGaugeColorMode): string {
  if (mode !== 'auto') {
    const colorMap: Record<string, string> = {
      cyan: '#14B8A6',
      success: '#14B8A6',
      warning: '#F59E0B',
      danger: '#EF4444',
      purple: '#8B5CF6'
    }
    return colorMap[mode] || '#14B8A6'
  }

  // Auto mode: monitoring standard colors
  if (value >= 90) return '#EF4444'  // red-500 danger
  if (value >= 70) return '#F59E0B'  // amber-500 warning
  return '#14B8A6'  // teal-500 normal
}

function getGradientId(mode: RingGaugeColorMode, value: number): string {
  if (mode === 'auto') {
    if (value >= 90) return 'ring-gradient-danger'
    if (value >= 70) return 'ring-gradient-warning'
    return 'ring-gradient-success'
  }
  return `ring-gradient-${mode}`
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * RingGauge - Circular gauge for resource usage visualization
 *
 * Features:
 * - SVG-based radial gauge with gradient fills
 * - Auto color mode: Teal (normal) → Amber (70%+) → Red (90%+)
 * - Smooth easeOutExpo animation (800ms)
 * - Monospace font for values
 * - CSS variable support for theming
 *
 * @example
 * ```tsx
 * <RingGauge
 *   value={75}
 *   label="CPU"
 *   size="md"
 *   colorMode="auto"
 * />
 * ```
 */
export function RingGauge({
  value,
  label,
  unit = '%',
  size = 'md',
  colorMode = 'auto',
  animated = true,
  displayValue,
  strokeWidth = 6,
  className = '',
}: RingGaugeProps) {
  const [animatedValue, setAnimatedValue] = React.useState(0)
  const prevValueRef = React.useRef(0)

  const config = sizeConfigs[size]
  const center = config.width / 2
  const circumference = 2 * Math.PI * config.radius

  // Animation
  React.useEffect(() => {
    if (!animated) {
      setAnimatedValue(value)
      return
    }

    const startValue = prevValueRef.current
    const endValue = Math.min(100, Math.max(0, value))
    const duration = 800
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // easeOutExpo easing function
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      const currentValue = startValue + (endValue - startValue) * easeProgress
      setAnimatedValue(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
    prevValueRef.current = endValue
  }, [value, animated])

  const color = getColor(value, colorMode)
  const gradientId = getGradientId(colorMode, value)
  const strokeDashoffset = circumference - (animatedValue / 100) * circumference
  const shownValue = displayValue || `${Math.round(animatedValue)}`

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <svg
        width={config.width}
        height={config.width}
        className="transform -rotate-90"
      >
        {/* Gradients */}
        <defs>
          {/* Normal state - Teal */}
          <linearGradient id="ring-gradient-success" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          {/* Cyan (for compatibility) */}
          <linearGradient id="ring-gradient-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          {/* Warning state - Orange */}
          <linearGradient id="ring-gradient-warning" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          {/* Danger state - Red */}
          <linearGradient id="ring-gradient-danger" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
          {/* Purple */}
          <linearGradient id="ring-gradient-purple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={config.radius}
          fill="none"
          stroke="var(--cockpit-border, #E2E8F0)"
          strokeWidth={strokeWidth}
        />

        {/* Progress ring */}
        <circle
          cx={center}
          cy={center}
          r={config.radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: animated ? 'stroke-dashoffset 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        />
      </svg>

      {/* Center content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ color }}
      >
        <span
          className={`${config.fontSize} font-semibold count-animate`}
          style={{ fontFamily: "'JetBrains Mono', 'SF Mono', monospace", fontVariantNumeric: 'tabular-nums' }}
        >
          {shownValue}
        </span>
        {unit && (
          <span className={`${config.labelSize} text-slate-500 -mt-0.5`}>
            {unit}
          </span>
        )}
      </div>

      {/* Label */}
      <span
        className="mt-2"
        style={{
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          color: 'var(--cockpit-text-muted)'
        }}
      >
        {label}
      </span>
    </div>
  )
}

/**
 * RingGaugeGroup - Container for horizontal layout of multiple gauges
 *
 * @example
 * ```tsx
 * <RingGaugeGroup>
 *   <RingGauge value={75} label="CPU" />
 *   <RingGauge value={60} label="Memory" />
 *   <RingGauge value={85} label="Disk" />
 * </RingGaugeGroup>
 * ```
 */
export function RingGaugeGroup({ children, className = '' }: RingGaugeGroupProps) {
  return (
    <div className={`flex items-center justify-around gap-6 ${className}`}>
      {children}
    </div>
  )
}

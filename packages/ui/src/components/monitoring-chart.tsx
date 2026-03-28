"use client"

import React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, type ChartConfig } from "./chart"
import { cn } from "../utils"

// ==================== 类型定义 ====================

/**
 * 通用数据点接口
 */
export interface DataPoint {
  /** 时间戳（秒或毫秒） */
  time: number
  /** 数值 */
  value: number
}

/**
 * 图表配置接口
 */
export interface MonitoringChartConfig {
  /** 数据标签 */
  label: string
  /** 可选，默认使用统一颜色 */
  color?: string
  /** 数值单位 */
  unit?: string
  /** 自定义 Tooltip 格式化 */
  formatTooltip?: (value: number, timestamp: number) => React.ReactNode
}

/**
 * 监控图表组件属性接口
 */
export interface MonitoringChartProps {
  /** 图表标题 */
  title: string
  /** 图表图标 */
  icon: React.ReactNode
  /** 当前值（带单位） */
  currentValue: string
  /** 时间序列数据 */
  data: DataPoint[]
  /** 图表配置 */
  config: MonitoringChartConfig
  /** 是否展开 */
  expanded: boolean
  /** 展开/收起回调 */
  onToggle: () => void
  /** 时间范围（影响时间显示格式） */
  timeRange?: string
  /** 图表高度（默认 200） */
  height?: number
  /** 是否加载中 */
  loading?: boolean
  /** 额外类名 */
  className?: string
}

// ==================== 常量 ====================

/** 默认监控颜色 */
export const DEFAULT_MONITORING_COLOR = '#059669'

// ==================== 工具函数 ====================

/**
 * 时间格式化函数
 * @param timestamp - 时间戳（秒或毫秒）
 * @param timeRange - 时间范围（影响格式）
 */
export const formatTime = (timestamp: number, timeRange: string = '24h'): string => {
  const realTimestamp = timestamp < 10000000000 ? timestamp * 1000 : timestamp
  const date = new Date(realTimestamp)

  // 如果时间范围大于24小时，显示日期+时间
  if (timeRange === '7d') {
    return date.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 否则只显示时间
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

/** 默认时间轴格式化 */
const defaultTickFormatter = (value: any): string => {
  let timestamp = value
  if (typeof value === 'string') {
    timestamp = parseInt(value)
  }

  // 如果是秒级时间戳，转换为毫秒
  if (timestamp < 10000000000) {
    timestamp = timestamp * 1000
  }

  const date = new Date(timestamp)
  if (isNaN(date.getTime())) {
    return value.toString()
  }

  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

/** 默认Y轴格式化 */
const defaultYTickFormatter = (value: number): string => {
  return Number(value).toFixed(2)
}

/**
 * 默认Tooltip内容
 */
const defaultTooltipContent = (
  config: MonitoringChartConfig,
  timeRange: string
) => {
  const TooltipComponent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value as number
      const timestamp = typeof label === 'string' ? parseInt(label) : label
      const timeStr = formatTime(timestamp, timeRange)

      return (
        <div style={{
          backgroundColor: '#374151',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          color: 'white'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{timeStr}</div>
          {config.formatTooltip ? (
            config.formatTooltip(value, timestamp)
          ) : (
            <div>{config.label}: {value.toFixed(2)}{config.unit || ''}</div>
          )}
        </div>
      )
    }
    return null
  }

  TooltipComponent.displayName = 'TooltipComponent'
  return TooltipComponent
}

// ==================== 组件 ====================

/**
 * 监控图表组件
 * 用于展示边缘平台资源的时间序列监控数据
 */
export function MonitoringChart({
  title,
  icon,
  currentValue,
  data,
  config,
  expanded,
  onToggle,
  timeRange = '24h',
  height = 200,
  loading = false,
  className
}: MonitoringChartProps) {
  // 使用默认颜色或配置的颜色
  const chartColor = config.color || DEFAULT_MONITORING_COLOR

  // 创建图表配置
  const chartConfig: ChartConfig = {
    value: {
      label: config.label,
      color: chartColor,
    },
  }

  return (
    <div className={cn("bg-white rounded border border-gray-200", className)}>
      {/* 标题栏 */}
      <div
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
        style={{backgroundColor: expanded ? '#F9FBFD' : 'white'}}
        onClick={onToggle}
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span className="text-sm font-medium text-gray-700">{title}</span>
          <span className="text-xs text-gray-500">当前: {currentValue}</span>
          {loading && (
            <div className="animate-spin rounded-full h-3 w-3 border-2 border-gray-300 border-t-gray-600"></div>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </div>

      {/* 图表内容 */}
      {expanded && (
        <div className="px-4 pb-4" style={{backgroundColor: 'white'}}>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={height}>
              <AreaChart
                accessibilityLayer
                data={data}
                margin={{
                  left: 12,
                  right: 12,
                  top: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval="preserveStartEnd"
                  tickFormatter={defaultTickFormatter}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  domain={[0, 'dataMax']}
                  type="number"
                  tickCount={6}
                  tickFormatter={defaultYTickFormatter}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={defaultTooltipContent(config, timeRange)}
                />
                <Area
                  dataKey="value"
                  type="monotone"
                  fill={chartColor}
                  fillOpacity={0.1}
                  stroke={chartColor}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      )}
    </div>
  )
}

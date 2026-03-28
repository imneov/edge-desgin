// ==================== 边缘平台监控类型定义 ====================

/**
 * 时间序列数据点
 */
export interface TimeSeriesDataPoint {
  /** 时间戳或时间标签 */
  time: string | number
  /** 数值 */
  value: number
}

/**
 * 容器组状态统计
 */
export interface PodStatusBreakdown {
  /** 运行中 */
  running: number
  /** 等待中 */
  pending: number
  /** 成功完成 */
  succeeded: number
  /** 失败 */
  failed: number
  /** 未知 */
  unknown: number
  /** 总数 */
  total: number
}

/**
 * QoS分类统计
 */
export interface QoSBreakdown {
  /** Guaranteed类型容器组数量 */
  guaranteed: number
  /** Burstable类型容器组数量 */
  burstable: number
  /** BestEffort类型容器组数量 */
  bestEffort: number
  /** 总数 */
  total: number
}

/**
 * 资源使用情况
 */
export interface ResourceUsage {
  /** 当前使用量 */
  current: number
  /** 当前使用量（带单位字符串） */
  currentFormatted: string
  /** 使用百分比 */
  percentage: number
  /** 已分配资源 */
  allocated: number
  /** 已分配资源（带单位字符串） */
  allocatedFormatted: string
  /** 总资源量 */
  total: number
  /** 总资源量（带单位字符串） */
  totalFormatted: string
  /** 分配百分比 */
  allocationPercentage: number
  /** 时间序列数据 */
  timeSeries: TimeSeriesDataPoint[]
}

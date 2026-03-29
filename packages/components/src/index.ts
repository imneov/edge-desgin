// ─── Domain Components (Layer 3) ─────────────────────────────────────────────
// These components know about Edge Platform concepts (K8s, clusters, pods, etc.)
// but do NOT directly call APIs. Data comes through props.

// Resource Display
export { ContainerStatus } from './components/container-status'
export type { ContainerStatusInfo, PodStatusInfo, ContainerStatusProps } from './components/container-status'

export { ResourceNameDescription, extractResourceDisplayData } from './components/resource-name-description'
export type { ResourceNameDescriptionProps } from './components/resource-name-description'

// Replica Management
export { ReplicaAdjustmentCard } from './components/replica-adjustment-card'
export type { ReplicaAdjustmentCardProps } from './components/replica-adjustment-card'

export { ReplicaConfirmationDialog } from './components/replica-confirmation-dialog'
export type { ReplicaConfirmationDialogProps } from './components/replica-confirmation-dialog'

// Monitoring
export { MonitoringChart, formatTime, DEFAULT_MONITORING_COLOR } from './components/monitoring-chart'
export type { MonitoringChartProps, MonitoringChartConfig, DataPoint } from './components/monitoring-chart'

// Selectors
export { ClusterSelector } from './components/cluster-selector'
export type { ClusterSelectorProps, ClusterData } from './components/cluster-selector'

export { WorkspaceSelector } from './components/workspace-selector'
export type { WorkspaceSelectorProps, WorkspaceData } from './components/workspace-selector'

export { NamespaceSelector } from './components/namespace-selector'
export type { NamespaceSelectorProps, NamespaceData } from './components/namespace-selector'

export { NodeGroupSelector } from './components/nodegroup-selector'
export type { NodeGroupSelectorProps, NodeGroupData } from './components/nodegroup-selector'

// Types
export type {
  TimeSeriesDataPoint,
  PodStatusBreakdown,
  QoSBreakdown,
  ResourceUsage,
} from './types/telemetry'

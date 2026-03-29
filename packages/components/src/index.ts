// ─── Domain Components (Layer 3) ─────────────────────────────────────────────
// These components know about Edge Platform concepts (K8s, clusters, pods, etc.)
// but do NOT directly call APIs. Data comes through props.

// Metadata Display
export { LabelsDisplay } from './components/labels-display'
export type { LabelsDisplayProps } from './components/labels-display'

export { AnnotationsDisplay } from './components/annotations-display'
export type { AnnotationsDisplayProps } from './components/annotations-display'

// Status Display
export { ClusterInfoCard } from './components/cluster-info-card'
export type { ClusterInfoCardProps, ClusterInfoCardType } from './components/cluster-info-card'

export { NodeCard } from './components/node-card'
export type { NodeCardProps, NodeCardStatus } from './components/node-card'

export { StatCard, MiniStat, NetworkStat, PodStat } from './components/stat-card'
export type { StatCardProps, MiniStatProps, NetworkStatProps, PodStatProps, ColorMode as StatCardColorMode, TrendDirection } from './components/stat-card'

export { RingGauge, RingGaugeGroup } from './components/ring-gauge'
export type { RingGaugeProps, RingGaugeGroupProps, RingGaugeColorMode, RingGaugeSize } from './components/ring-gauge'

export { ResourceMetricCard } from './components/resource-metric-card'
export type { ResourceMetricCardProps, ResourceMetricType } from './components/resource-metric-card'

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

export { MetricCard } from './components/metric-card'
export type { MetricCardProps, MetricFormat } from './components/metric-card'

export { NamespaceStatsCards, NamespaceStatsCardsError } from './components/namespace-stats-cards'
export type { NamespaceStatsCardsProps, NamespaceItem } from './components/namespace-stats-cards'

export { NodeStatsCards } from './components/node-stats-cards'
export type { NodeStatsCardsProps, NodeStats } from './components/node-stats-cards'

export { EventsViewer } from './components/events-viewer'
export type { EventsViewerProps } from './components/events-viewer'

export { AlertList, AlertListContainer } from './components/alert-list'
export type {
  AlertListProps,
  AlertListContainerProps,
  AlertItem,
  AlertSeverity,
  AlertStatus,
  AlertLabels,
} from './components/alert-list'

// Selectors
export { ClusterSelector } from './components/cluster-selector'
export type { ClusterSelectorProps, ClusterData } from './components/cluster-selector'

export { WorkspaceSelector } from './components/workspace-selector'
export type { WorkspaceSelectorProps, WorkspaceData } from './components/workspace-selector'

export { NamespaceSelector } from './components/namespace-selector'
export type { NamespaceSelectorProps, NamespaceData } from './components/namespace-selector'

export { NodeGroupSelector } from './components/nodegroup-selector'
export type { NodeGroupSelectorProps, NodeGroupData } from './components/nodegroup-selector'

// Topology - Cloud-Edge Collaboration Visualization
export {
  ClusterTopology,
  ClusterNode,
  NodeGroupNode,
  EdgeNode,
  useLayoutedElements,
} from './components/topology'
export type {
  ClusterTopologyProps,
  TopologyNode,
  ClusterNodeData,
  NodeGroupNodeData,
  EdgeNodeData,
  DomainType,
  NodeType,
  EdgeType,
} from './components/topology'

// Types
export type {
  TimeSeriesDataPoint,
  PodStatusBreakdown,
  QoSBreakdown,
  ResourceUsage,
} from './types/telemetry'

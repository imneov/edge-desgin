/**
 * Topology data types for Edge Platform cloud-edge collaboration visualization
 *
 * Layer hierarchy:
 * | Layer | Name | Domain | Parent |
 * |-------|------|--------|--------|
 * | L0 | Host Cluster | Cloud | None (root) |
 * | L1 | Host Virtual Cluster, Member Cluster | Cloud | L0 |
 * | L2 | Member Virtual Cluster | Cloud | L1 (Member only) |
 * | L3 | NodeGroup | Edge | L0 or L1 or L2 |
 * | L4 | Node | Edge | L3 |
 */

/**
 * Domain type
 * - cloud: Cloud governance layer (L0-L2)
 * - edge: Edge execution layer (L3-L4)
 */
export type DomainType = 'cloud' | 'edge'

/**
 * Node types by layer
 *
 * Cloud (L0-L2):
 * - hostCluster: Host cluster (L0) - Unique root node
 * - virtualCluster: Host-hosted virtual cluster (L1)
 * - memberCluster: Member cluster (L1)
 * - memberVirtualCluster: Member-hosted virtual cluster (L2)
 *
 * Edge (L3-L4):
 * - nodeGroup: Node group (L3)
 * - node: Node (L4)
 */
export type NodeType =
  | 'hostCluster'           // L0 - Host cluster (root)
  | 'virtualCluster'        // L1 - Host-hosted virtual cluster
  | 'memberCluster'         // L1 - Member cluster
  | 'memberVirtualCluster'  // L2 - Member-hosted virtual cluster
  | 'nodeGroup'             // L3 - Node group
  | 'node'                  // L4 - Node

/**
 * Edge type semantics
 *
 * | Edge | From | To | Style |
 * |------|------|-----|-------|
 * | Control | Host (L0) | Member (L1) | Solid |
 * | Virtual | Cluster (L0/L1) | Virtual (L1/L2) | Dashed |
 * | Edge | Cluster (L1/L2) | NodeGroup (L3) | Green solid |
 * | NodeGroup | NodeGroup (L3) | Node (L4) | Green solid |
 */
export type EdgeType = 'control' | 'virtual' | 'edge'

/**
 * Get node level (L0-L4)
 */
export const getNodeLevel = (type: NodeType): number => {
  switch (type) {
    case 'hostCluster':
      return 0
    case 'virtualCluster':
    case 'memberCluster':
      return 1
    case 'memberVirtualCluster':
      return 2
    case 'nodeGroup':
      return 3
    case 'node':
      return 4
    default:
      return 0
  }
}

/**
 * Get node domain
 */
export const getNodeDomain = (type: NodeType): DomainType => {
  const level = getNodeLevel(type)
  return level <= 2 ? 'cloud' : 'edge'
}

/**
 * Check if type is a cluster (cloud node)
 */
export const isClusterType = (type: NodeType): boolean => {
  return ['hostCluster', 'virtualCluster', 'memberCluster', 'memberVirtualCluster'].includes(type)
}

/**
 * Check if type is a virtual cluster
 */
export const isVirtualClusterType = (type: NodeType): boolean => {
  return ['virtualCluster', 'memberVirtualCluster'].includes(type)
}

/**
 * Infer edge type from parent and child node types
 */
export const inferEdgeType = (parentType: NodeType, childType: NodeType): EdgeType => {
  const parentDomain = getNodeDomain(parentType)
  const childDomain = getNodeDomain(childType)

  // Cross-domain (cloud → edge) = green line
  if (parentDomain === 'cloud' && childDomain === 'edge') {
    return 'edge'
  }

  // Within edge (L3 → L4) = green line
  if (parentDomain === 'edge' && childDomain === 'edge') {
    return 'edge'
  }

  // Within cloud: virtual clusters = dashed line
  if (isVirtualClusterType(parentType) || isVirtualClusterType(childType)) {
    return 'virtual'
  }

  // Within cloud: Host → Member = solid line
  return 'control'
}

/**
 * Topology node interface
 */
export interface TopologyNode {
  id: string
  name: string
  type: NodeType
  children?: TopologyNode[]
  status?: 'healthy' | 'warning' | 'error'
  /** Node metadata, supports undefined values */
  metadata?: Record<string, string | number | undefined>
}

/**
 * Topology data interface
 */
export interface TopologyData {
  root: TopologyNode
}

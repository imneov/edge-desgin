"use client"

import * as React from "react"
import { Node, Edge, Position } from "@xyflow/react"
import {
  TopologyNode,
  NodeType,
  EdgeType,
  inferEdgeType,
  isClusterType,
  isVirtualClusterType,
  getNodeDomain,
  getNodeLevel,
} from "./types"

// ─── Constants ───────────────────────────────────────────────────────────────

const LAYOUT_CONFIG = {
  HORIZONTAL_GAP: 40,
  HOST_MARGIN_LEFT: 50,
  LEVEL_Y: {
    L0: 50,
    L1: 220,
    L2: 390,
    L3: 620,
    L4: 780,
  },
}

const NODE_DIMENSIONS: Record<string, { width: number; height: number }> = {
  hostCluster: { width: 240, height: 120 },
  memberCluster: { width: 240, height: 120 },
  virtualCluster: { width: 240, height: 120 },
  memberVirtualCluster: { width: 240, height: 120 },
  nodeGroup: { width: 200, height: 88 },
  node: { width: 180, height: 100 },
}

const DEFAULT_DIMENSIONS = { width: 160, height: 80 }

const EDGE_STYLES: Record<EdgeType, { stroke: string; strokeDasharray?: string }> = {
  control: { stroke: '#64748B' },
  virtual: { stroke: '#64748B', strokeDasharray: '5,5' },
  edge: { stroke: '#10B981' },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getNodeDimensions = (type: string): { width: number; height: number } => {
  return NODE_DIMENSIONS[type] || DEFAULT_DIMENSIONS
}

const mapToFlowNodeType = (type: NodeType): string => {
  if (isClusterType(type)) {
    return 'clusterNode'
  }
  if (type === 'nodeGroup') {
    return 'nodeGroupNode'
  }
  return 'edgeNode'
}

const getDescendantIds = (node: TopologyNode): string[] => {
  const ids: string[] = []
  if (node.children) {
    node.children.forEach((child) => {
      ids.push(child.id)
      ids.push(...getDescendantIds(child))
    })
  }
  return ids
}

interface NodeLayoutInfo {
  node: TopologyNode
  x: number
  y: number
  columnWidth: number
  selfWidth: number
  selfHeight: number
  level: number
  isCollapsed: boolean
}

const calculateColumnWidth = (
  node: TopologyNode,
  collapsedNodes: Set<string>
): number => {
  const dimensions = getNodeDimensions(node.type)
  const level = getNodeLevel(node.type)

  if (level === 0) {
    return dimensions.width
  }

  if (collapsedNodes.has(node.id) || !node.children || node.children.length === 0) {
    return dimensions.width
  }

  const columnChildren = node.children.filter((child) => {
    const childLevel = getNodeLevel(child.type)
    if (level === 1) {
      return childLevel === 3
    }
    return childLevel >= 1 && childLevel <= 3
  })

  if (columnChildren.length === 0) {
    const l4Children = node.children.filter((child) => getNodeLevel(child.type) === 4)
    if (l4Children.length > 0) {
      const l4TotalWidth = l4Children.reduce((total, child, index) => {
        const childDim = getNodeDimensions(child.type)
        return total + childDim.width + (index > 0 ? LAYOUT_CONFIG.HORIZONTAL_GAP : 0)
      }, 0)
      return Math.max(dimensions.width, l4TotalWidth)
    }
    return dimensions.width
  }

  const childrenColumnWidth = columnChildren.reduce((total, child, index) => {
    const childColumnWidth = calculateColumnWidth(child, collapsedNodes)
    return total + childColumnWidth + (index > 0 ? LAYOUT_CONFIG.HORIZONTAL_GAP : 0)
  }, 0)

  return Math.max(dimensions.width, childrenColumnWidth)
}

const sortL1Children = (children: TopologyNode[]): TopologyNode[] => {
  return [...children].sort((a, b) => {
    const aIsVirtual = a.type === 'virtualCluster'
    const bIsVirtual = b.type === 'virtualCluster'
    if (aIsVirtual && !bIsVirtual) return -1
    if (!aIsVirtual && bIsVirtual) return 1
    return 0
  })
}

const getLevelY = (level: number): number => {
  const levelKey = `L${level}` as keyof typeof LAYOUT_CONFIG.LEVEL_Y
  return LAYOUT_CONFIG.LEVEL_Y[levelKey] ?? 0
}

// ─── Layout Algorithm ───────────────────────────────────────────────────────

const calculateLayout = (
  root: TopologyNode,
  collapsedNodes: Set<string>
): { layoutInfos: Map<string, NodeLayoutInfo>; hiddenNodeIds: Set<string> } => {
  const layoutInfos = new Map<string, NodeLayoutInfo>()
  const hiddenNodeIds = new Set<string>()

  const layoutNode = (
    node: TopologyNode,
    startX: number
  ): number => {
    if (hiddenNodeIds.has(node.id)) {
      return startX
    }

    const dimensions = getNodeDimensions(node.type)
    const level = getNodeLevel(node.type)
    const isCollapsed = collapsedNodes.has(node.id)
    const columnWidth = calculateColumnWidth(node, collapsedNodes)

    const y = getLevelY(level)

    let x: number

    if (level === 0) {
      x = LAYOUT_CONFIG.HOST_MARGIN_LEFT
    } else {
      x = startX + (columnWidth - dimensions.width) / 2
    }

    layoutInfos.set(node.id, {
      node,
      x,
      y,
      columnWidth,
      selfWidth: dimensions.width,
      selfHeight: dimensions.height,
      level,
      isCollapsed,
    })

    let subtreeRightEdge = startX + columnWidth

    if (isCollapsed && node.children) {
      const descendantIds = getDescendantIds(node)
      descendantIds.forEach((id) => hiddenNodeIds.add(id))
      return subtreeRightEdge
    }

    if (node.children && node.children.length > 0) {
      if (level === 0) {
        const l1Children = sortL1Children(
          node.children.filter((child) => getNodeLevel(child.type) === 1)
        )
        const l3Children = node.children.filter((child) => getNodeLevel(child.type) === 3)

        let l3SubtreeRightEdge = x + dimensions.width
        if (l3Children.length > 0) {
          const totalL3Width = l3Children.reduce((total, child, idx) => {
            const childColWidth = calculateColumnWidth(child, collapsedNodes)
            return total + childColWidth + (idx > 0 ? LAYOUT_CONFIG.HORIZONTAL_GAP : 0)
          }, 0)

          const parentCenterX = x + dimensions.width / 2
          const l3StartX = parentCenterX - totalL3Width / 2
          l3SubtreeRightEdge = Math.max(l3SubtreeRightEdge, l3StartX + totalL3Width)

          let currentL3X = l3StartX
          l3Children.forEach((child) => {
            const childRightEdge = layoutNode(child, currentL3X)
            currentL3X = childRightEdge + LAYOUT_CONFIG.HORIZONTAL_GAP
          })
        }

        if (l1Children.length > 0) {
          let childStartX = l3SubtreeRightEdge + LAYOUT_CONFIG.HORIZONTAL_GAP
          l1Children.forEach((child) => {
            const childRightEdge = layoutNode(child, childStartX)
            subtreeRightEdge = Math.max(subtreeRightEdge, childRightEdge)
            childStartX = childRightEdge + LAYOUT_CONFIG.HORIZONTAL_GAP
          })
        }
      } else if (level === 1) {
        const l2Children = node.children.filter((child) => getNodeLevel(child.type) === 2)
        const l3Children = node.children.filter((child) => getNodeLevel(child.type) === 3)

        let l3SubtreeRightEdge = x + dimensions.width

        if (l3Children.length > 0) {
          const totalL3Width = l3Children.reduce((total, child, idx) => {
            const childColWidth = calculateColumnWidth(child, collapsedNodes)
            return total + childColWidth + (idx > 0 ? LAYOUT_CONFIG.HORIZONTAL_GAP : 0)
          }, 0)

          const parentCenterX = x + dimensions.width / 2
          const l3StartX = parentCenterX - totalL3Width / 2

          let currentL3X = l3StartX
          l3Children.forEach((child) => {
            const childRightEdge = layoutNode(child, currentL3X)
            subtreeRightEdge = Math.max(subtreeRightEdge, childRightEdge)
            l3SubtreeRightEdge = Math.max(l3SubtreeRightEdge, childRightEdge)
            currentL3X = childRightEdge + LAYOUT_CONFIG.HORIZONTAL_GAP
          })
        }

        if (l2Children.length > 0) {
          let childStartX = l3SubtreeRightEdge + LAYOUT_CONFIG.HORIZONTAL_GAP
          l2Children.forEach((child) => {
            const childRightEdge = layoutNode(child, childStartX)
            subtreeRightEdge = Math.max(subtreeRightEdge, childRightEdge)
            childStartX = childRightEdge + LAYOUT_CONFIG.HORIZONTAL_GAP
          })
        }
      } else if (level === 2) {
        const l3Children = node.children.filter((child) => getNodeLevel(child.type) === 3)

        if (l3Children.length > 0) {
          const totalL3Width = l3Children.reduce((total, child, idx) => {
            const childColWidth = calculateColumnWidth(child, collapsedNodes)
            return total + childColWidth + (idx > 0 ? LAYOUT_CONFIG.HORIZONTAL_GAP : 0)
          }, 0)

          const parentCenterX = x + dimensions.width / 2
          const l3StartX = parentCenterX - totalL3Width / 2

          let currentL3X = l3StartX
          l3Children.forEach((child) => {
            const childRightEdge = layoutNode(child, currentL3X)
            subtreeRightEdge = Math.max(subtreeRightEdge, childRightEdge)
            currentL3X = childRightEdge + LAYOUT_CONFIG.HORIZONTAL_GAP
          })
        }
      } else {
        const sortedChildren = node.children

        const columnChildren = sortedChildren.filter((child) => {
          const childLevel = getNodeLevel(child.type)
          return childLevel >= 1 && childLevel <= 3
        })
        const l4Children = sortedChildren.filter((child) => getNodeLevel(child.type) === 4)

        if (columnChildren.length > 0) {
          const totalChildrenWidth = columnChildren.reduce((total, child, index) => {
            const childColWidth = calculateColumnWidth(child, collapsedNodes)
            return total + childColWidth + (index > 0 ? LAYOUT_CONFIG.HORIZONTAL_GAP : 0)
          }, 0)

          let childStartX = startX + (columnWidth - totalChildrenWidth) / 2

          columnChildren.forEach((child) => {
            const childRightEdge = layoutNode(child, childStartX)
            subtreeRightEdge = Math.max(subtreeRightEdge, childRightEdge)
            childStartX = childRightEdge + LAYOUT_CONFIG.HORIZONTAL_GAP
          })
        }

        if (l4Children.length > 0 && level === 3) {
          const totalL4Width = l4Children.reduce((total, child, index) => {
            const childDim = getNodeDimensions(child.type)
            return total + childDim.width + (index > 0 ? LAYOUT_CONFIG.HORIZONTAL_GAP : 0)
          }, 0)

          const parentCenterX = x + dimensions.width / 2
          let l4StartX = parentCenterX - totalL4Width / 2

          l4Children.forEach((child) => {
            const childRightEdge = layoutNode(child, l4StartX)
            subtreeRightEdge = Math.max(subtreeRightEdge, childRightEdge)
            const childDim = getNodeDimensions(child.type)
            l4StartX += childDim.width + LAYOUT_CONFIG.HORIZONTAL_GAP
          })
        }
      }
    }

    return subtreeRightEdge
  }

  layoutNode(root, LAYOUT_CONFIG.HOST_MARGIN_LEFT)

  return { layoutInfos, hiddenNodeIds }
}

const generateNodes = (
  layoutInfos: Map<string, NodeLayoutInfo>,
  hiddenNodeIds: Set<string>
): Node[] => {
  const nodes: Node[] = []

  layoutInfos.forEach((info, id) => {
    if (hiddenNodeIds.has(id)) return

    const domain = getNodeDomain(info.node.type)
    const flowNodeType = mapToFlowNodeType(info.node.type)
    const childCount = info.node.children?.length || 0
    const nodeCount =
      info.node.type === 'nodeGroup'
        ? info.node.children?.filter((c) => c.type === 'node').length || 0
        : 0

    nodes.push({
      id,
      type: flowNodeType,
      position: { x: info.x, y: info.y },
      data: {
        label: info.node.name,
        isVirtual: isVirtualClusterType(info.node.type),
        childCount: info.node.type !== 'node' ? childCount : undefined,
        nodeCount,
        status: info.node.status,
        nodeType: info.node.type,
        collapsed: info.isCollapsed,
        domain,
        level: info.level,
        ...info.node.metadata,
      },
    })
  })

  return nodes
}

const generateEdges = (
  node: TopologyNode,
  collapsedNodes: Set<string>,
  parentType: NodeType | null,
  parentId: string | null,
  edges: Edge[],
  hiddenNodeIds: Set<string>
): void => {
  if (hiddenNodeIds.has(node.id)) {
    return
  }

  if (parentId && parentType && !hiddenNodeIds.has(parentId)) {
    const edgeType = inferEdgeType(parentType, node.type)
    const style = EDGE_STYLES[edgeType]
    const parentLevel = getNodeLevel(parentType)
    const childLevel = getNodeLevel(node.type)

    const isHostToL1 = parentLevel === 0 && childLevel === 1
    const isL1ToL2 = parentLevel === 1 && childLevel === 2
    const sourceHandle = (isHostToL1 || isL1ToL2) ? 'right' : 'bottom'

    edges.push({
      id: `${parentId}-${node.id}`,
      source: parentId,
      target: node.id,
      sourceHandle,
      targetHandle: 'top',
      type: 'smoothstep',
      animated: edgeType === 'edge' && node.type === 'node',
      style: {
        stroke: style.stroke,
        strokeWidth: 2,
        strokeDasharray: style.strokeDasharray,
      },
    })
  }

  const isCollapsed = collapsedNodes.has(node.id)
  if (node.children && !isCollapsed) {
    node.children.forEach((child) => {
      generateEdges(child, collapsedNodes, node.type, node.id, edges, hiddenNodeIds)
    })
  }
}

// ─── Hook ───────────────────────────────────────────────────────────────────

/**
 * useLayoutedElements - Layout calculation hook for topology visualization
 *
 * Converts hierarchical topology data into ReactFlow nodes and edges
 * with automatic layout calculation.
 *
 * @example
 * ```tsx
 * const { nodes, edges } = useLayoutedElements(topologyData, collapsedNodes)
 * ```
 */
export function useLayoutedElements(
  topologyData: TopologyNode | null,
  collapsedNodes: Set<string> = new Set()
): { nodes: Node[]; edges: Edge[] } {
  return React.useMemo(() => {
    if (!topologyData) {
      return { nodes: [], edges: [] }
    }

    const { layoutInfos, hiddenNodeIds } = calculateLayout(topologyData, collapsedNodes)

    const nodes = generateNodes(layoutInfos, hiddenNodeIds)

    const edges: Edge[] = []
    generateEdges(topologyData, collapsedNodes, null, null, edges, hiddenNodeIds)

    const layoutedNodes = nodes.map((node) => ({
      ...node,
      sourcePosition: Position.Bottom,
      targetPosition: Position.Top,
    }))

    return { nodes: layoutedNodes, edges }
  }, [topologyData, collapsedNodes])
}

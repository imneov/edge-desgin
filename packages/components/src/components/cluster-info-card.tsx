"use client"

import * as React from "react"
import { Ship } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export type ClusterInfoCardType = 'cluster' | 'workspace'

export interface ClusterInfoCardProps {
  /** Resource name (name field) */
  name: string
  /** Display name for the resource */
  displayName?: string
  /** Cluster ID */
  clusterId: string
  /** Cluster display name (workspace mode only) */
  clusterName?: string
  /** Card type: cluster or workspace */
  type?: ClusterInfoCardType
  /** Whether this is the host cluster */
  isHost?: boolean
  /** Description text */
  description?: string
  /** Provider name */
  provider?: string
  /** Status text */
  status?: string
  /** Kubernetes version */
  kubernetesVersion?: string
  /** Platform version */
  platformVersion?: string
  /** Namespace count (workspace only) */
  namespaceCount?: number
  /** Edge Runtime type */
  edgeRuntime?: string
  /** Workspace ID (for EdgeX enablement) */
  workspaceId?: string
  /** Whether EdgeX is enabled */
  isEdgeXEnabled?: boolean
  /** Enable EdgeX callback */
  onEnableEdgeX?: () => Promise<void>
  /** Show EdgeX button only (don't handle callback internally) */
  showEdgeXButton?: boolean
  /** EdgeX button disabled state */
  isEdgeXButtonDisabled?: boolean
  /** EdgeX button loading state */
  isEdgeXButtonLoading?: boolean
  /** EdgeX button label override */
  edgeXButtonLabel?: string
  /** Additional CSS classes */
  className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Check if Edge Runtime supports EdgeX
 */
function supportsEdgeX(edgeRuntime?: string): boolean {
  if (!edgeRuntime || edgeRuntime === '无') return false
  return edgeRuntime.toLowerCase() === 'openyurt' || edgeRuntime.toLowerCase() === 'kubeedge'
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * ClusterInfoCard - Cluster/Workspace information card
 *
 * Features:
 * - Dark header with icon, name, optional host badge
 * - 2x2 grid layout for basic info
 * - Shows EdgeX enablement button for workspace with edge runtime
 * - Supports both cluster and workspace display modes
 *
 * @example
 * ```tsx
 * <ClusterInfoCard
 *   name="my-cluster"
 *   displayName="Production Cluster"
 *   clusterId="cluster-123"
 *   type="cluster"
 *   isHost={true}
 *   description="Main production cluster"
 *   status="正常"
 *   kubernetesVersion="v1.28.0"
 *   platformVersion="v2.4.0"
 * />
 * ```
 */
export function ClusterInfoCard({
  name,
  displayName,
  clusterId,
  clusterName,
  type = 'cluster',
  isHost = false,
  description,
  provider = 'edge-platform',
  status = '正常',
  kubernetesVersion,
  platformVersion,
  namespaceCount,
  edgeRuntime,
  workspaceId,
  isEdgeXEnabled = false,
  onEnableEdgeX,
  showEdgeXButton,
  isEdgeXButtonDisabled = false,
  isEdgeXButtonLoading = false,
  edgeXButtonLabel,
  className = ''
}: ClusterInfoCardProps) {
  const isWorkspace = type === 'workspace'
  const resourceLabel = isWorkspace ? '工作空间' : '集群'
  const statusLabel = isWorkspace ? '工作空间状态' : '集群状态'
  const [isEnablingEdgeX, setIsEnablingEdgeX] = React.useState(false)

  // Check if EdgeX is supported
  const supportsEdgeXFlag = supportsEdgeX(edgeRuntime) && isWorkspace && onEnableEdgeX

  const handleEnableEdgeX = async () => {
    if (!onEnableEdgeX) return
    setIsEnablingEdgeX(true)
    try {
      await onEnableEdgeX()
    } finally {
      setIsEnablingEdgeX(false)
    }
  }

  // Determine EdgeX button state
  const showEdgeX = showEdgeXButton || supportsEdgeXFlag
  const edgeXDisabled = isEdgeXButtonDisabled || isEdgeXEnabled
  const edgeXLoading = isEdgeXButtonLoading || isEnablingEdgeX
  const edgeXLabel = edgeXButtonLabel || (edgeXLoading ? '启用中...' : (isEdgeXEnabled ? 'EdgeX 已启用' : '启用 EdgeX'))

  return (
    <div className={`bg-white border border-gray-200 rounded overflow-hidden ${className}`}>
      {/* Dark header */}
      <div className="bg-gray-800 text-white px-4 h-[70px] flex items-center">
        <div className="flex items-center gap-3 w-full">
          {/* Kubernetes icon */}
          <div className="flex-shrink-0 bg-white rounded-full p-1.5">
            <Ship className="h-6 w-6 text-gray-800" />
          </div>

          {/* Name and description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium truncate">
                {displayName || name}
              </span>
              {isHost && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-700 text-white">
                  主集群
                </span>
              )}
            </div>
            {description && (
              <div className="text-xs text-gray-300 line-clamp-1 mt-0.5">
                {description}
              </div>
            )}
          </div>

          {/* EdgeX button (workspace only) */}
          {showEdgeX && (
            <button
              disabled={edgeXDisabled || edgeXLoading}
              onClick={handleEnableEdgeX}
              className={`h-8 px-3 text-white text-sm font-medium rounded transition-colors ${
                edgeXDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {edgeXLabel}
            </button>
          )}
        </div>
      </div>

      {/* Basic info area */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">基本信息</h3>

        {/* 2x2 grid layout */}
        <div className="grid grid-cols-2 gap-4">
          {/* Provider */}
          <div>
            <div className="text-sm font-medium text-gray-900 mb-1">
              {provider}
            </div>
            <div className="text-xs text-gray-500">提供商</div>
          </div>

          {/* Status */}
          <div>
            <div className="text-sm font-medium text-gray-900 mb-1">
              {status}
            </div>
            <div className="text-xs text-gray-500">{statusLabel}</div>
          </div>

          {/* Kubernetes version */}
          {kubernetesVersion && (
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {kubernetesVersion}
              </div>
              <div className="text-xs text-gray-500">Kubernetes 版本</div>
            </div>
          )}

          {/* Platform version */}
          {platformVersion && (
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {platformVersion}
              </div>
              <div className="text-xs text-gray-500">EdgePlatform 版本</div>
            </div>
          )}

          {/* Cluster name (workspace only) */}
          {isWorkspace && clusterName && (
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {clusterName}
              </div>
              <div className="text-xs text-gray-500">所在集群</div>
            </div>
          )}

          {/* Namespace count (workspace only) */}
          {isWorkspace && namespaceCount !== undefined && (
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {namespaceCount}
              </div>
              <div className="text-xs text-gray-500">项目数量</div>
            </div>
          )}

          {/* Edge Runtime (workspace only) */}
          {isWorkspace && edgeRuntime && (
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {edgeRuntime}
              </div>
              <div className="text-xs text-gray-500">Edge Runtime</div>
            </div>
          )}

          {/* EdgeX status (workspace only, when EdgeX supported) */}
          {isWorkspace && supportsEdgeX(edgeRuntime) && (
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">
                {isEdgeXEnabled ? (
                  <span>EdgeX 已启用</span>
                ) : (
                  <span className="text-gray-500">EdgeX 未启用</span>
                )}
              </div>
              <div className="text-xs text-gray-500">IoT 平台服务</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

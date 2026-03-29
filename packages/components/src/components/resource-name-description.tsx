import * as React from "react"

export interface ResourceNameDescriptionProps {
  /** Original resource name */
  name: string
  /** Alias from theriseunion.io/alias-name annotation */
  alias?: string
  /** Description from theriseunion.io/description annotation */
  description?: string
  /** Optional click handler */
  onClick?: () => void
  /** Optional icon component */
  icon?: React.ComponentType<{ className?: string }>
  /** Additional CSS classes */
  className?: string
  /** Href for link rendering (requires Link component from your router) */
  href?: string
  /** Link component (pass Next.js Link or similar) */
  linkComponent?: React.ComponentType<{
    href: string
    className?: string
    children: React.ReactNode
  }>
}

/**
 * Standardized component for displaying resource names and descriptions
 * following the alias(name) format with consistent styling.
 *
 * Display rules:
 * - With alias: "别名(原始名称)" format
 * - Without alias: Display original name only
 * - Description: Second line below name with proper spacing
 */
export function ResourceNameDescription({
  name,
  alias,
  description,
  href,
  icon: Icon,
  onClick,
  linkComponent: LinkComponent,
  className = "",
}: ResourceNameDescriptionProps) {
  const displayName = alias ? `${alias}(${name})` : name

  const content = (
    <div className={`flex items-center space-x-3 ${className}`}>
      {Icon && (
        <div className="flex-shrink-0">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="font-medium text-primary hover:text-primary/80 cursor-pointer truncate">
          {displayName}
        </div>
        <div className="text-xs text-muted-foreground mt-1 max-w-md break-words line-clamp-2">
          {description || "-"}
        </div>
      </div>
    </div>
  )

  if (href && LinkComponent) {
    return (
      <LinkComponent href={href} className="block">
        {content}
      </LinkComponent>
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="block text-left w-full">
        {content}
      </button>
    )
  }

  return content
}

/**
 * Helper function to extract resource display data from backend annotations
 */
export function extractResourceDisplayData(resource: any) {
  const annotations = resource?.metadata?.annotations || {}

  return {
    name: resource?.metadata?.name || "",
    alias: annotations["theriseunion.io/alias-name"] || "",
    description: annotations["theriseunion.io/description"] || "",
  }
}

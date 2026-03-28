"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "../utils"

// ==================== 类型定义 ====================

type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  )
>

interface ChartContainerProps
  extends React.ComponentProps<"div"> {
  config: ChartConfig
  children: React.ComponentProps<typeof Slot>["children"]
}

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
  indicator?: "line" | "dot" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  labelFormatter?: (value: any, payload: any[]) => React.ReactNode
  labelClassName?: string
  formatter?: (value: any, name: any, props: any) => React.ReactNode
  color?: string
  nameKey?: string
  labelKey?: string
}

// ==================== ChartContainer ====================

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ config, children, className, ...props }, ref) => {
  const id = React.useId()

  return (
    <div
      data-chart={id}
      ref={ref}
      className={cn(
        "w-full h-[200px] [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className
      )}
      {...props}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: Object.entries(config)
            .filter(([_, config]) => config.theme || config.color)
            .map(([key, itemConfig]) => {
              const color = itemConfig.theme?.light ?? itemConfig.color
              return color ? `[data-chart=${id}] .color-${key} { color: ${color}; }` : null
            })
            .join(""),
        }}
      />
      {children}
    </div>
  )
})
ChartContainer.displayName = "ChartContainer"

// ==================== ChartTooltip ====================

const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ChartTooltipProps
>(
  (
    {
      active,
      payload,
      label,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
      className,
      ...props
    },
    ref
  ) => {
    if (!active || !payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
        {...props}
      >
        {!hideLabel && (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter ? labelFormatter(label, payload) : label}
          </div>
        )}
        <div className="grid gap-1.5">
          {payload.map((item, index) => (
            <div
              key={index}
              className="flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground"
            >
              {!hideIndicator && (
                <div
                  className="shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]"
                  style={{
                    "--color-bg": item.color,
                    "--color-border": item.color,
                    width: indicator === "dot" ? "0.5rem" : "0.75rem",
                    height: indicator === "dot" ? "0.5rem" : "0.25rem",
                  } as React.CSSProperties}
                />
              )}
              <div className="flex flex-1 justify-between leading-none">
                <div className="grid gap-1.5">
                  <span className="text-muted-foreground">
                    {nameKey ? item.payload[nameKey] : item.name}
                  </span>
                </div>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {formatter ? formatter(item.value, item.name, item) : item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
}

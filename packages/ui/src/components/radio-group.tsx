"use client"

import * as React from "react"
import { Circle } from "lucide-react"
import { cn } from "../utils"

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onValueChange'> {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
}

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

const RadioGroupContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
}>({})

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, defaultValue, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const controlledValue = value !== undefined ? value : internalValue

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <RadioGroupContext.Provider value={{ value: controlledValue, onValueChange: handleValueChange }}>
        <div
          ref={ref}
          className={cn("space-y-2", className)}
          {...props}
        />
      </RadioGroupContext.Provider>
    )
  }
)

RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext)
    const isChecked = context.value === value

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      context.onValueChange?.(value)
      props.onChange?.(e)
    }

    return (
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          ref={ref}
          value={value}
          checked={isChecked}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 shrink-0 rounded-full border border-primary ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "cursor-pointer transition-colors",
            isChecked
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background hover:bg-muted",
            className
          )}
          onClick={() => {
            const input = ref as React.RefObject<HTMLInputElement>
            input.current?.click()
          }}
        >
          {isChecked && (
            <div className="flex items-center justify-center text-current">
              <Circle className="h-2 w-2 fill-current" />
            </div>
          )}
        </div>
      </div>
    )
  }
)

RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }

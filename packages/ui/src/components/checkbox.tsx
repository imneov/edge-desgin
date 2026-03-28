"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../utils"

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onCheckedChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, checked, ...props }, ref) => {
    const internalRef = React.useRef<HTMLInputElement>(null)
    const inputRef = (ref || internalRef) as React.RefObject<HTMLInputElement>

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked)
      props.onChange?.(e)
    }

    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.click()
      }
    }

    return (
      <div className="relative">
        <input
          type="checkbox"
          ref={inputRef}
          className="sr-only"
          onChange={handleChange}
          checked={checked}
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "cursor-pointer transition-colors",
            checked
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background hover:bg-muted",
            className
          )}
          onClick={handleClick}
        >
          {checked && (
            <div className="flex items-center justify-center text-current">
              <Check className="h-3 w-3" />
            </div>
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox }

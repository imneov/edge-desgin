"use client"

import * as React from "react"
import { cn } from "../utils"
import { Label } from "./label"

// ─── Context ─────────────────────────────────────────────────────────────────

interface FormFieldContextValue {
  id: string
  error?: string
}

const FormFieldContext = React.createContext<FormFieldContextValue>({
  id: "",
})

function useFormField() {
  return React.useContext(FormFieldContext)
}

// ─── Components ──────────────────────────────────────────────────────────────

const Form = React.forwardRef<
  HTMLFormElement,
  React.FormHTMLAttributes<HTMLFormElement>
>(({ className, ...props }, ref) => (
  <form ref={ref} className={cn("space-y-4", className)} {...props} />
))
Form.displayName = "Form"

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string
  error?: string
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ id, error, className, children, ...props }, ref) => {
    const generatedId = React.useId()
    const fieldId = id ?? generatedId
    return (
      <FormFieldContext.Provider value={{ id: fieldId, error }}>
        <div ref={ref} className={cn("space-y-1", className)} {...props}>
          {children}
        </div>
      </FormFieldContext.Provider>
    )
  }
)
FormField.displayName = "FormField"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { id, error } = useFormField()
  return (
    <Label
      ref={ref}
      htmlFor={id}
      className={cn(error && "text-destructive", className)}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const { id, error } = useFormField()
  return (
    <div
      ref={ref}
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-message` : undefined}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-[0.8rem] text-muted-foreground", className)}
    {...props}
  />
))
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { id, error } = useFormField()
  const body = error ?? children
  if (!body) return null
  return (
    <p
      ref={ref}
      id={`${id}-message`}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export { Form, FormField, FormLabel, FormControl, FormDescription, FormMessage }

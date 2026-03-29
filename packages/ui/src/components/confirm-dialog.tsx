"use client"

import * as React from "react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog"
import { Input } from "./input"

export interface ConfirmDialogProps {
  /** Whether the dialog is open */
  open: boolean
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void
  /** Dialog title */
  title: string
  /** Dialog description */
  description?: string
  /** Text the user must type to confirm (for destructive actions) */
  confirmText?: string
  /** Placeholder for the confirmation input */
  confirmPlaceholder?: string
  /** Label for the confirm button */
  confirmLabel?: string
  /** Label for the cancel button */
  cancelLabel?: string
  /** Whether the action is destructive (changes confirm button style) */
  destructive?: boolean
  /** Whether a confirmation is in progress */
  loading?: boolean
  /** Callback when user confirms */
  onConfirm: () => void
  /** Callback when user cancels */
  onCancel?: () => void
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  confirmPlaceholder,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [inputValue, setInputValue] = useState("")

  const needsTextConfirmation = !!confirmText
  const isConfirmEnabled = needsTextConfirmation
    ? inputValue === confirmText
    : true

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setInputValue("")
    }
    onOpenChange(nextOpen)
  }

  const handleConfirm = () => {
    if (!isConfirmEnabled || loading) return
    onConfirm()
  }

  const handleCancel = () => {
    setInputValue("")
    onCancel?.()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        {needsTextConfirmation && (
          <div className="py-2">
            <p className="text-sm text-muted-foreground mb-2">
              Type <span className="font-mono font-semibold">{confirmText}</span> to confirm:
            </p>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={confirmPlaceholder || confirmText}
              autoFocus
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={loading}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={!isConfirmEnabled || loading}
            className={destructive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : undefined}
          >
            {loading ? "..." : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

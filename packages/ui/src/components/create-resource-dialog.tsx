"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { Button } from "./button"
import { Textarea } from "./textarea"

export interface CreateResourceDialogProps {
  /** Whether the dialog is open */
  open: boolean
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void
  /** Dialog title */
  title: string
  /** Dialog description */
  description: string
  /** Called with the current YAML content on submit */
  onConfirm: (yaml: string) => void
  /** Disables inputs and shows "创建中..." while true */
  isCreating?: boolean
  /** Initial YAML content pre-filled in the textarea */
  defaultYaml?: string
}

/**
 * CreateResourceDialog — Generic YAML-based resource creation dialog.
 *
 * Provides a full-width monospace textarea for entering YAML configuration.
 * The confirm button is disabled when the textarea is empty or `isCreating` is true.
 * The dialog resets to `defaultYaml` each time it opens.
 *
 * For Monaco Editor with YAML validation, use `YamlEditDialog` instead.
 */
export function CreateResourceDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  isCreating = false,
  defaultYaml = "",
}: CreateResourceDialogProps) {
  const [yaml, setYaml] = useState(defaultYaml)

  useEffect(() => {
    if (open) {
      setYaml(defaultYaml)
    }
  }, [open, defaultYaml])

  const handleSubmit = () => {
    if (yaml.trim()) {
      onConfirm(yaml)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <Textarea
            value={yaml}
            onChange={(e) => setYaml(e.target.value)}
            placeholder="请输入 YAML 配置..."
            className="min-h-[400px] font-mono text-sm"
            disabled={isCreating}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isCreating}
          >
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={isCreating || !yaml.trim()}>
            {isCreating ? "创建中..." : "创建"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

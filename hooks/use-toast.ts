"use client"

import * as React from "react"
import { toast as sonnerToast } from "sonner"

// const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 5000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

type ToastOptions = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  duration?: number
  type?: "success" | "error" | "info" | "warning"
}

const toasts = new Map<string, ReturnType<typeof setTimeout>>()

export function toast({ title, description, action, duration = TOAST_REMOVE_DELAY, type }: ToastOptions) {
  const id = genId()

  sonnerToast[type ?? "info"](title, {
    description,
    action,
    duration,
    id,
  })

  const dismiss = () => sonnerToast.dismiss(id)

  const timeout = setTimeout(() => {
    dismiss()
    toasts.delete(id)
  }, duration)

  toasts.set(id, timeout)

  return { id, dismiss }
}

export function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId)
      } else {
        sonnerToast.dismiss()
      }
    },
  }
}
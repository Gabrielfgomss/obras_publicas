import { cn } from "@/lib/utils"
import { type ProjectStatus, statusLabels, statusColors, statusDotColors } from "@/lib/mock-data"

interface StatusBadgeProps {
  status: ProjectStatus
  variant?: "filled" | "dot"
  className?: string
}

export function StatusBadge({ status, variant = "filled", className }: StatusBadgeProps) {
  if (variant === "dot") {
    return (
      <span className={cn("inline-flex items-center gap-1.5 text-xs text-foreground", className)}>
        <span className={cn("h-2 w-2 rounded-full shrink-0", statusDotColors[status])} aria-hidden="true" />
        {statusLabels[status]}
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
        statusColors[status],
        className
      )}
    >
      {statusLabels[status]}
    </span>
  )
}

import { cn } from "@/lib/utils";
import {
  type ProjectStatus,
  statusLabels,
  statusColors,
  statusDotColors,
} from "@/lib/mock-data";

interface StatusBadgeProps {
  status: ProjectStatus;
  variant?: "filled" | "dot";
  className?: string;
}

export function StatusBadge({
  status,
  variant = "filled",
  className,
}: StatusBadgeProps) {
  if (variant === "dot") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-medium text-foreground",
          className,
        )}
      >
        <span
          className={cn(
            "h-2 w-2 rounded-full shrink-0",
            statusDotColors[status],
          )}
          aria-hidden="true"
        />
        {statusLabels[status]}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide",
        statusColors[status],
        className,
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-current opacity-80"
        aria-hidden="true"
      />
      {statusLabels[status]}
    </span>
  );
}

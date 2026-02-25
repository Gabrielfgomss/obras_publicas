import { cn } from "@/lib/utils"
import type { ProjectStatus } from "@/lib/mock-data"
import { statusLabels, statusDotColors } from "@/lib/mock-data"
import { Skeleton } from "@/components/ui/skeleton"

interface KpiCardProps {
  label: string
  value: number
  status?: ProjectStatus
  isLoading?: boolean
}

function KpiCard({ label, value, status, isLoading }: KpiCardProps) {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-md p-4">
        <Skeleton className="h-3 w-20 mb-2" />
        <Skeleton className="h-7 w-12" />
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-md p-4">
      <div className="flex items-center gap-1.5 mb-1">
        {status && (
          <span
            className={cn("h-2 w-2 rounded-full shrink-0", statusDotColors[status])}
            aria-hidden="true"
          />
        )}
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <span className="text-2xl font-semibold text-foreground tabular-nums">{value}</span>
    </div>
  )
}

interface KpiCardsProps {
  total: number
  counts: Record<ProjectStatus, number>
  isLoading?: boolean
}

export function KpiCards({ total, counts, isLoading }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      <KpiCard label="Total de obras" value={total} isLoading={isLoading} />
      <KpiCard label={statusLabels["in-progress"]} value={counts["in-progress"]} status="in-progress" isLoading={isLoading} />
      <KpiCard label={statusLabels.completed} value={counts.completed} status="completed" isLoading={isLoading} />
      <KpiCard label={statusLabels.planned} value={counts.planned} status="planned" isLoading={isLoading} />
      <KpiCard
        label={`${statusLabels.delayed} / ${statusLabels["on-hold"]}`}
        value={counts.delayed + counts["on-hold"]}
        status="delayed"
        isLoading={isLoading}
      />
    </div>
  )
}

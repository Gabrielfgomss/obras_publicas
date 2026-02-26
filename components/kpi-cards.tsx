import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/mock-data";
import { statusLabels, statusDotColors } from "@/lib/mock-data";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PauseCircle,
} from "lucide-react";
import type { ComponentType } from "react";

const statusIcons: Record<string, ComponentType<{ className?: string }>> = {
  "in-progress": TrendingUp,
  completed: CheckCircle2,
  planned: Clock,
  delayed: AlertTriangle,
  "on-hold": PauseCircle,
};

interface KpiCardProps {
  label: string;
  value: number;
  status?: ProjectStatus;
  isLoading?: boolean;
}

function KpiCard({ label, value, status, isLoading }: KpiCardProps) {
  if (isLoading) {
    return (
      <div className="kpi-card">
        <Skeleton className="h-3 w-20 mb-3" />
        <Skeleton className="h-8 w-14" />
      </div>
    );
  }

  const Icon = status ? statusIcons[status] : null;

  return (
    <div className="kpi-card">
      <div className="flex items-center gap-2 mb-2">
        {status && (
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full shrink-0",
              statusDotColors[status],
            )}
            aria-hidden="true"
          />
        )}
        <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-foreground tabular-nums">
          {value}
        </span>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground/30" />}
      </div>
    </div>
  );
}

interface KpiCardsProps {
  total: number;
  counts: Record<ProjectStatus, number>;
  isLoading?: boolean;
}

export function KpiCards({ total, counts, isLoading }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      <KpiCard label="Total de obras" value={total} isLoading={isLoading} />
      <KpiCard
        label={statusLabels["in-progress"]}
        value={counts["in-progress"]}
        status="in-progress"
        isLoading={isLoading}
      />
      <KpiCard
        label={statusLabels.completed}
        value={counts.completed}
        status="completed"
        isLoading={isLoading}
      />
      <KpiCard
        label={statusLabels.planned}
        value={counts.planned}
        status="planned"
        isLoading={isLoading}
      />
      <KpiCard
        label={`${statusLabels.delayed} / ${statusLabels["on-hold"]}`}
        value={counts.delayed + counts["on-hold"]}
        status="delayed"
        isLoading={isLoading}
      />
    </div>
  );
}

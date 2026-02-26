import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/mock-data";
import { statusDotColors } from "@/lib/mock-data";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight } from "lucide-react";

interface Update {
  id: string;
  date: string;
  title: string;
  projectId: string;
  projectName: string;
  projectStatus: ProjectStatus;
}

interface RecentUpdatesProps {
  updates: Update[];
  isLoading?: boolean;
}

export function RecentUpdates({ updates, isLoading }: RecentUpdatesProps) {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg">
        <div className="px-4 py-3.5 border-b border-border">
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="px-4 py-3.5">
              <Skeleton className="h-3 w-20 mb-2" />
              <Skeleton className="h-3.5 w-48 mb-1.5" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (updates.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg">
        <div className="px-4 py-3.5 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">
            Atualizacoes recentes
          </h2>
        </div>
        <div className="px-4 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhuma atualizacao recente para esta selecao.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="px-4 py-3.5 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">
          Atualizacoes recentes
        </h2>
      </div>
      <div className="divide-y divide-border">
        {updates.map((update) => (
          <Link
            key={update.id}
            href={`/project/${update.projectId}`}
            className="block px-4 py-3.5 hover:bg-accent/[0.03] transition-colors group"
          >
            <div className="flex items-center justify-between mb-1">
              <time className="text-[11px] text-muted-foreground tabular-nums font-medium">
                {update.date}
              </time>
              <ArrowUpRight className="h-3 w-3 text-muted-foreground/30 group-hover:text-accent transition-colors" />
            </div>
            <div className="text-sm text-foreground font-medium leading-snug mb-1.5 group-hover:text-accent transition-colors">
              {update.title}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className={cn(
                  "h-2 w-2 rounded-full shrink-0",
                  statusDotColors[update.projectStatus],
                )}
                aria-hidden="true"
              />
              <span className="truncate">{update.projectName}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

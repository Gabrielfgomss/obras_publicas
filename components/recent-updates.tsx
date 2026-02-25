import Link from "next/link"
import { cn } from "@/lib/utils"
import type { ProjectStatus } from "@/lib/mock-data"
import { statusDotColors } from "@/lib/mock-data"
import { Skeleton } from "@/components/ui/skeleton"

interface Update {
  id: string
  date: string
  title: string
  projectId: string
  projectName: string
  projectStatus: ProjectStatus
}

interface RecentUpdatesProps {
  updates: Update[]
  isLoading?: boolean
}

export function RecentUpdates({ updates, isLoading }: RecentUpdatesProps) {
  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-md">
        <div className="px-4 py-3 border-b border-border">
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="px-4 py-3">
              <Skeleton className="h-3 w-20 mb-2" />
              <Skeleton className="h-3.5 w-48 mb-1.5" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (updates.length === 0) {
    return (
      <div className="bg-card border border-border rounded-md">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-medium text-foreground">Atualizacoes recentes</h2>
        </div>
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">Nenhuma atualizacao recente para esta selecao.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-md">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-medium text-foreground">Atualizacoes recentes</h2>
      </div>
      <div className="divide-y divide-border">
        {updates.map((update) => (
          <Link
            key={update.id}
            href={`/project/${update.projectId}`}
            className="block px-4 py-3 hover:bg-muted/50 transition-colors"
          >
            <div className="text-xs text-muted-foreground mb-1 tabular-nums">
              {update.date}
            </div>
            <div className="text-sm text-foreground font-medium leading-snug mb-1">
              {update.title}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className={cn("h-1.5 w-1.5 rounded-full shrink-0", statusDotColors[update.projectStatus])}
                aria-hidden="true"
              />
              <span className="truncate">{update.projectName}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

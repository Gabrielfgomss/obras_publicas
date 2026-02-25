"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/mock-data"
import { StatusBadge } from "@/components/status-badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar } from "lucide-react"

interface ProjectCardProps {
  project: Project
  isHighlighted?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function ProjectCard({
  project,
  isHighlighted,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) {
  return (
    <Link
      href={`/project/${project.id}`}
      className={cn(
        "block border border-border rounded-md p-3.5 transition-colors bg-card",
        isHighlighted
          ? "border-primary ring-1 ring-primary/20 bg-primary/[0.02]"
          : "hover:border-muted-foreground/30"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-sm font-medium text-foreground leading-snug line-clamp-2">
          {project.name}
        </h3>
        <StatusBadge status={project.status} className="shrink-0" />
      </div>

      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
        <MapPin className="h-3 w-3 shrink-0" />
        <span className="truncate">{project.location}</span>
      </div>

      <div className="flex items-center gap-3 mb-2.5">
        <Progress
          value={project.progress}
          className="h-1.5 flex-1"
        />
        <span className="text-xs font-medium text-foreground tabular-nums w-9 text-right">
          {project.progress}%
        </span>
      </div>

      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3 shrink-0" />
        <span>Atualizado em {project.lastUpdate}</span>
      </div>
    </Link>
  )
}

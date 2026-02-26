"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";

const statusAccentMap: Record<string, string> = {
  "in-progress": "card-accent-in-progress",
  completed: "card-accent-completed",
  planned: "card-accent-planned",
  delayed: "card-accent-delayed",
  "on-hold": "card-accent-on-hold",
};

interface ProjectCardProps {
  project: Project;
  isHighlighted?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
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
        "card-accent block p-4 group",
        statusAccentMap[project.status],
        isHighlighted && "ring-1 ring-accent/30 shadow-md bg-accent/[0.02]",
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors">
          {project.name}
        </h3>
        <StatusBadge status={project.status} className="shrink-0" />
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
        <MapPin className="h-3.5 w-3.5 shrink-0 text-accent/60" />
        <span className="truncate">{project.location}</span>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <Progress value={project.progress} className="h-2 flex-1" />
        <span className="text-xs font-semibold text-foreground tabular-nums w-10 text-right">
          {project.progress}%
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3 shrink-0" />
          <span>Atualizado em {project.lastUpdate}</span>
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-accent transition-colors" />
      </div>
    </Link>
  );
}

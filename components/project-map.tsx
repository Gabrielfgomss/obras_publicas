"use client";

import React from "react";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/lib/mock-data";
import { statusLabels } from "@/lib/mock-data";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, MapPin } from "lucide-react";

const STATUS_MARKER_COLORS: Record<ProjectStatus, string> = {
  "in-progress": "#0891B2",
  completed: "#059669",
  planned: "#D97706",
  delayed: "#DC2626",
  "on-hold": "#6B7280",
};

interface ProjectMapProps {
  projects: Project[];
  center: { lat: number; lng: number };
  zoom?: number;
  highlightedId?: string | null;
  onProjectHover?: (id: string | null) => void;
  onProjectSelect?: (id: string) => void;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export function ProjectMap({
  projects,
  center,
  zoom = 13,
  highlightedId,
  onProjectHover,
  onProjectSelect,
  isLoading,
  error,
  className,
}: ProjectMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    project: Project;
  } | null>(null);

  const getProjectPositions = useCallback(
    (w: number, h: number) => {
      const scale = Math.pow(2, zoom) * 100;
      return projects.map((p) => ({
        project: p,
        x: w / 2 + (p.lng - center.lng) * scale,
        y: h / 2 - (p.lat - center.lat) * scale,
      }));
    },
    [projects, center, zoom],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: Math.floor(width), height: Math.floor(height) });
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    const w = dimensions.width;
    const h = dimensions.height;

    // Background - institutional blue-gray
    ctx.fillStyle = "#E2E8F0";
    ctx.fillRect(0, 0, w, h);

    // Subtle grid
    ctx.strokeStyle = "#CBD5E1";
    ctx.lineWidth = 0.3;
    const gridSize = 36;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Road-like lines
    ctx.strokeStyle = "#B0BEC5";
    ctx.lineWidth = 2.5;
    const roads = [
      { x1: 0, y1: h * 0.3, x2: w, y2: h * 0.35 },
      { x1: 0, y1: h * 0.6, x2: w, y2: h * 0.58 },
      { x1: w * 0.25, y1: 0, x2: w * 0.28, y2: h },
      { x1: w * 0.65, y1: 0, x2: w * 0.62, y2: h },
      { x1: w * 0.45, y1: 0, x2: w * 0.48, y2: h },
    ];
    for (const road of roads) {
      ctx.beginPath();
      ctx.moveTo(road.x1, road.y1);
      ctx.lineTo(road.x2, road.y2);
      ctx.stroke();
    }

    // Building blocks
    ctx.fillStyle = "#D5DDE6";
    const blocks = [
      [50, 50, 120, 80],
      [w - 200, 100, 140, 100],
      [100, h - 180, 160, 100],
      [w * 0.4, h * 0.15, 100, 70],
      [w * 0.7, h * 0.7, 130, 90],
    ];
    for (const [bx, by, bw, bh] of blocks) {
      ctx.beginPath();
      ctx.roundRect(bx, by, bw, bh, 3);
      ctx.fill();
    }

    // Draw markers
    const positions = getProjectPositions(w, h);
    for (const pos of positions) {
      const isHighlighted =
        pos.project.id === highlightedId || pos.project.id === hoveredMarker;
      const color = STATUS_MARKER_COLORS[pos.project.status];
      const radius = isHighlighted ? 11 : 8;

      // Shadow
      ctx.beginPath();
      ctx.arc(pos.x, pos.y + 2, radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fill();

      // Marker circle
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      if (isHighlighted) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.stroke();
        // Outer glow
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, radius + 4, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.4;
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Inner dot
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Attribution text
    ctx.fillStyle = "#94A3B8";
    ctx.font = "10px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("Mapa simulado -- Dados de exemplo", w - 12, h - 10);
  }, [
    dimensions,
    projects,
    center,
    zoom,
    highlightedId,
    hoveredMarker,
    getProjectPositions,
  ]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const positions = getProjectPositions(
        dimensions.width,
        dimensions.height,
      );

      let found: string | null = null;
      let foundTooltip: typeof tooltip = null;

      for (const pos of positions) {
        const dx = pos.x - x;
        const dy = pos.y - y;
        if (dx * dx + dy * dy < 200) {
          found = pos.project.id;
          foundTooltip = { x: pos.x, y: pos.y, project: pos.project };
          break;
        }
      }

      setHoveredMarker(found);
      setTooltip(foundTooltip);
      onProjectHover?.(found);
      canvas.style.cursor = found ? "pointer" : "default";
    },
    [dimensions, getProjectPositions, onProjectHover],
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const positions = getProjectPositions(
        dimensions.width,
        dimensions.height,
      );

      for (const pos of positions) {
        const dx = pos.x - x;
        const dy = pos.y - y;
        if (dx * dx + dy * dy < 200) {
          onProjectSelect?.(pos.project.id);
          break;
        }
      }
    },
    [dimensions, getProjectPositions, onProjectSelect],
  );

  if (isLoading) {
    return (
      <div
        className={cn(
          "relative bg-muted rounded-lg overflow-hidden",
          className,
        )}
      >
        <Skeleton className="absolute inset-0 rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground text-sm bg-card/80 px-4 py-2.5 rounded-lg shadow-sm">
            <MapPin className="h-4 w-4 animate-pulse" />
            Carregando mapa...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "relative bg-muted rounded-lg overflow-hidden flex items-center justify-center",
          className,
        )}
      >
        <div className="text-center p-8">
          <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-3" />
          <p className="text-sm font-semibold text-foreground mb-1">
            Nao foi possivel carregar o mapa
          </p>
          <p className="text-xs text-muted-foreground">{error}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Verifique sua conexao e tente novamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative map-container bg-muted", className)}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setHoveredMarker(null);
          setTooltip(null);
          onProjectHover?.(null);
        }}
        onClick={handleClick}
        role="img"
        aria-label={`Mapa mostrando ${projects.length} obras publicas`}
      />

      {/* Map legend */}
      <div className="absolute bottom-3 left-3 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3.5 py-2.5 text-xs shadow-sm">
        <div className="font-semibold text-foreground mb-2 text-[11px] uppercase tracking-wider">
          Status
        </div>
        <div className="flex flex-col gap-1.5">
          {(
            Object.entries(STATUS_MARKER_COLORS) as [ProjectStatus, string][]
          ).map(([status, color]) => (
            <div key={status} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full shrink-0 border border-white/80"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              <span className="text-muted-foreground">
                {statusLabels[status]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-10 bg-card border border-border rounded-lg shadow-lg px-3.5 py-2.5 text-xs max-w-60"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y - 10,
            transform:
              tooltip.x > dimensions.width * 0.7 ? "translateX(-110%)" : "none",
          }}
        >
          <div className="font-semibold text-foreground mb-1 leading-snug">
            {tooltip.project.name}
          </div>
          <div className="text-muted-foreground mb-1.5">
            {tooltip.project.location}
          </div>
          <div className="flex items-center justify-between gap-4">
            <span
              className="inline-flex items-center gap-1.5 font-medium"
              style={{ color: STATUS_MARKER_COLORS[tooltip.project.status] }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor: STATUS_MARKER_COLORS[tooltip.project.status],
                }}
              />
              {statusLabels[tooltip.project.status]}
            </span>
            <span className="text-muted-foreground tabular-nums font-semibold">
              {tooltip.project.progress}%
            </span>
          </div>
        </div>
      )}

      {/* Project count overlay */}
      <div className="absolute top-3 right-3 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs text-foreground font-semibold shadow-sm">
        {projects.length} {projects.length === 1 ? "obra" : "obras"} no mapa
      </div>
    </div>
  );
}

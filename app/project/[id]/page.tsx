"use client"

import React from "react"
import { use, useMemo, useCallback, useRef, useEffect, useState } from "react"
import Link from "next/link"
import { PortalHeader } from "@/components/portal-header"
import { PortalFooter } from "@/components/portal-footer"
import { StatusBadge } from "@/components/status-badge"
import { Progress } from "@/components/ui/progress"
import { ErrorState } from "@/components/ui-states"
import { projects } from "@/lib/mock-data"
import type { Project } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Building2,
  FileText,
  User,
  ImageOff,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const project = useMemo(() => projects.find((p) => p.id === id), [id])

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen">
        <PortalHeader />
        <main className="flex-1 flex items-center justify-center">
          <ErrorState
            title="Obra nao encontrada"
            description={`Nao existe uma obra com a referencia "${id}". A obra pode ter sido removida ou o link pode estar incorreto.`}
          />
        </main>
        <PortalFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PortalHeader />
      <main className="flex-1">
        <div className="max-w-[1280px] mx-auto px-6 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-5" aria-label="Navegacao de retorno">
            <Link
              href="/explore"
              className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
            >
              <ArrowLeft className="h-3 w-3" />
              Voltar para explorar
            </Link>
          </nav>

          {/* Project header card */}
          <div className="bg-card border border-border rounded-md p-5 mb-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-semibold text-foreground leading-snug mb-1 text-balance">
                  {project.name}
                </h1>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>{project.location} -- {project.city}, {project.district}</span>
                </div>
              </div>
              <StatusBadge status={project.status} className="text-sm px-3 py-1" />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground font-medium">Progresso</span>
              <Progress value={project.progress} className="flex-1 h-2" />
              <span className="text-sm font-semibold text-foreground tabular-nums w-12 text-right">
                {project.progress}%
              </span>
            </div>
          </div>

          {/* Hero image */}
          <HeroImage project={project} />

          {/* Gallery */}
          <GallerySection project={project} />

          {/* Location map */}
          <LocationMap project={project} />

          {/* Two-column: Timeline + Sidebar (official data + milestones) */}
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Timeline */}
            <div className="flex-1 min-w-0">
              <div className="bg-card border border-border rounded-md">
                <div className="px-5 py-3.5 border-b border-border">
                  <h2 className="text-sm font-medium text-foreground">
                    Ultimas atualizacoes
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Registro cronologico das atualizacoes, da mais recente para a mais antiga.
                  </p>
                </div>

                <div className="divide-y divide-border">
                  {project.updates.length === 0 ? (
                    <div className="px-5 py-12 text-center">
                      <p className="text-sm text-muted-foreground">
                        Nenhuma atualizacao registrada para esta obra.
                      </p>
                    </div>
                  ) : (
                    project.updates.map((update, index) => (
                      <div key={update.id} className="px-5 py-4">
                        <div className="flex items-start gap-4">
                          {/* Timeline dot */}
                          <div className="flex flex-col items-center pt-1 shrink-0">
                            <div className="h-2.5 w-2.5 rounded-full bg-primary border-2 border-primary/30" />
                            {index < project.updates.length - 1 && (
                              <div className="w-px flex-1 bg-border mt-1 min-h-8" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1.5">
                              <time className="text-xs text-muted-foreground tabular-nums font-medium">
                                {update.date}
                              </time>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <User className="h-3 w-3" />
                                {update.author}
                              </div>
                            </div>

                            <h3 className="text-sm font-medium text-foreground mb-1.5 leading-snug">
                              {update.title}
                            </h3>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                              {update.description}
                            </p>

                            {/* Image evidence */}
                            {update.imageUrl ? (
                              <div className="rounded-md border border-border bg-muted overflow-hidden max-w-md">
                                <div className="aspect-video flex items-center justify-center bg-secondary">
                                  <div className="flex flex-col items-center gap-1.5 text-muted-foreground">
                                    <ImageOff className="h-6 w-6" />
                                    <span className="text-xs">
                                      Evidencia fotografica -- {update.imageUrl}
                                    </span>
                                    <span className="text-xs text-muted-foreground/60">
                                      (Placeholder de exemplo)
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <p className="text-xs text-muted-foreground/60 italic">
                                Nenhuma evidencia fotografica anexada a esta atualizacao.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar: official info + milestones */}
            <div className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
              {/* Official information */}
              <div className="bg-card border border-border rounded-md">
                <div className="px-4 py-3 border-b border-border">
                  <h2 className="text-sm font-medium text-foreground">
                    Dados oficiais
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  <InfoRow
                    icon={Building2}
                    label="Empresa executora"
                    value={project.contractor}
                  />
                  <InfoRow
                    icon={Calendar}
                    label="Data de inicio"
                    value={project.startDate}
                  />
                  <InfoRow
                    icon={Calendar}
                    label="Previsao de termino"
                    value={project.expectedEndDate}
                  />
                  <InfoRow
                    icon={FileText}
                    label="Referencia do contrato"
                    value={project.contractId}
                  />
                  <InfoRow
                    icon={FileText}
                    label="Orcamento aprovado"
                    value={project.budget}
                  />
                  <InfoRow
                    icon={FileText}
                    label="Categoria"
                    value={project.category}
                  />
                  <InfoRow
                    icon={Calendar}
                    label="Ultima atualizacao"
                    value={project.lastUpdate}
                  />
                </div>
                <div className="px-4 py-3 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Os dados exibidos sao de responsabilidade do orgao cadastrante.
                  </p>
                </div>
              </div>

              {/* Milestone calendar */}
              <MilestoneCalendar project={project} />
            </div>
          </div>
        </div>
      </main>
      <PortalFooter />
    </div>
  )
}

/* ---- Sub-components ---- */

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
        <Icon className="h-3 w-3 shrink-0" />
        <span className="font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-sm text-foreground">{value}</div>
    </div>
  )
}

function HeroImage({ project }: { project: Project }) {
  return (
    <div className="bg-card border border-border rounded-md overflow-hidden">
      <div className="aspect-[21/9] flex items-center justify-center bg-secondary">
        {project.heroImage ? (
          <img
            src={project.heroImage || "/placeholder.svg"}
            alt={`Imagem conceitual da obra: ${project.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ImageOff className="h-10 w-10" />
            <span className="text-sm font-medium">Imagem conceitual da obra</span>
            <span className="text-xs text-muted-foreground/60">
              Nenhuma imagem disponivel no momento
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function GallerySection({ project }: { project: Project }) {
  if (project.galleryImages.length === 0) {
    return (
      <div className="mt-6">
        <h2 className="text-sm font-medium text-foreground mb-3">Galeria da construcao</h2>
        <div className="bg-card border border-border rounded-md p-6 text-center">
          <ImageOff className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Nenhuma imagem da construcao disponivel.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Imagens serao exibidas aqui conforme forem publicadas pelo responsavel da obra.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6">
      <h2 className="text-sm font-medium text-foreground mb-3">Galeria da construcao</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {project.galleryImages.map((img, i) => (
          <div
            key={`gallery-${i}`}
            className="aspect-square bg-secondary border border-border rounded-md overflow-hidden"
          >
            <img
              src={img || "/placeholder.svg"}
              alt={`Foto ${i + 1} da construcao: ${project.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function LocationMap({ project }: { project: Project }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setDimensions({ width: Math.floor(width), height: Math.floor(height) })
      }
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const drawMap = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    ctx.scale(dpr, dpr)
    const w = dimensions.width
    const h = dimensions.height

    // Background
    ctx.fillStyle = "#e8edf2"
    ctx.fillRect(0, 0, w, h)

    // Grid
    ctx.strokeStyle = "#d5dce5"
    ctx.lineWidth = 0.5
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
    }
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }

    // Roads
    ctx.strokeStyle = "#cdd5de"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, h * 0.4)
    ctx.lineTo(w, h * 0.42)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(w * 0.5, 0)
    ctx.lineTo(w * 0.48, h)
    ctx.stroke()

    // Marker in center
    const cx = w / 2
    const cy = h / 2

    // Pulse ring
    ctx.beginPath()
    ctx.arc(cx, cy, 18, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(26, 82, 118, 0.1)"
    ctx.fill()

    // Shadow
    ctx.beginPath()
    ctx.arc(cx, cy + 2, 10, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(0,0,0,0.15)"
    ctx.fill()

    // Main marker
    ctx.beginPath()
    ctx.arc(cx, cy, 10, 0, Math.PI * 2)
    ctx.fillStyle = "#1a5276"
    ctx.fill()
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 3
    ctx.stroke()

    // Inner dot
    ctx.beginPath()
    ctx.arc(cx, cy, 3, 0, Math.PI * 2)
    ctx.fillStyle = "#ffffff"
    ctx.fill()

    // Attribution
    ctx.fillStyle = "#94a3b8"
    ctx.font = "10px system-ui, sans-serif"
    ctx.textAlign = "right"
    ctx.fillText("Mapa simulado -- Dados de exemplo", w - 12, h - 10)
  }, [dimensions])

  useEffect(() => {
    drawMap()
  }, [drawMap])

  return (
    <section className="mt-6">
      <h2 className="text-sm font-medium text-foreground mb-3">Localizacao</h2>
      <div
        ref={containerRef}
        className="bg-muted border border-border rounded-md overflow-hidden relative"
        style={{ height: "240px" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label={`Mapa da localizacao da obra: ${project.location}, ${project.city}`}
        />
        {/* Info overlay */}
        <div className="absolute bottom-3 left-3 bg-card/95 border border-border rounded-md px-3 py-2 text-xs">
          <div className="flex items-center gap-1.5 text-foreground font-medium">
            <MapPin className="h-3 w-3 text-primary" />
            {project.location}
          </div>
          <div className="text-muted-foreground mt-0.5">
            {project.city}, {project.district}
          </div>
        </div>
      </div>
    </section>
  )
}

function MilestoneCalendar({ project }: { project: Project }) {
  const MONTH_NAMES = [
    "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ]
  const DAY_HEADERS = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sab."]

  // Collect all notable dates: milestones + updates
  const notableDates = useMemo(() => {
    const map = new Map<string, { type: "milestone" | "update"; label: string; completed: boolean; imageUrl?: string }[]>()
    for (const ms of project.milestones) {
      const key = ms.date
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push({ type: "milestone", label: ms.label, completed: ms.completed })
    }
    for (const upd of project.updates) {
      const key = upd.date
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push({ type: "update", label: upd.title, completed: false, imageUrl: upd.imageUrl })
    }
    return map
  }, [project.milestones, project.updates])

  // Find the earliest milestone month to start from
  const initialDate = useMemo(() => {
    const allDates = [
      ...project.milestones.map((m) => new Date(m.date)),
      ...project.updates.map((u) => new Date(u.date)),
    ].filter((d) => !Number.isNaN(d.getTime()))
    if (allDates.length === 0) return new Date()
    // Start from the latest date so user sees most recent activity
    allDates.sort((a, b) => b.getTime() - a.getTime())
    return allDates[0]
  }, [project.milestones, project.updates])

  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth())
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const prevMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1)
        return 11
      }
      return m - 1
    })
    setSelectedDate(null)
  }, [])

  const nextMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1)
        return 0
      }
      return m + 1
    })
    setSelectedDate(null)
  }, [])

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const startDow = firstDay.getDay() // 0=Sun
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

    const cells: (number | null)[] = []
    for (let i = 0; i < startDow; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)
    // Pad to complete last row
    while (cells.length % 7 !== 0) cells.push(null)
    return cells
  }, [currentMonth, currentYear])

  const formatDateKey = (day: number) => {
    const m = String(currentMonth + 1).padStart(2, "0")
    const d = String(day).padStart(2, "0")
    return `${currentYear}-${m}-${d}`
  }

  // Color for milestone dot
  const getDotColor = (entries: { type: "milestone" | "update"; completed: boolean }[]) => {
    const hasMilestone = entries.some((e) => e.type === "milestone")
    const completed = entries.some((e) => e.type === "milestone" && e.completed)
    if (hasMilestone && completed) return "bg-status-completed"
    if (hasMilestone) return "bg-primary"
    return "bg-status-planned"
  }

  const selectedEntries = selectedDate ? notableDates.get(selectedDate) : null

  if (project.milestones.length === 0) {
    return (
      <div className="bg-card border border-border rounded-md">
        <div className="px-4 py-3 border-b border-border">
          <h2 className="text-sm font-medium text-foreground">Calendario de marcos</h2>
        </div>
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum marco definido para esta obra.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-md overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-medium text-foreground">Calendario de marcos</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Selecione uma data para ver os detalhes.
        </p>
      </div>

      {/* Calendar body - dark themed like the reference */}
      <div className="bg-[#1e2530] text-[#e2e8f0]">
        {/* Month navigation */}
        <div className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Proximo mes"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0 px-2">
          {DAY_HEADERS.map((d) => (
            <div key={d} className="text-center text-[10px] text-[#94a3b8] font-medium pb-2">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-0 px-2 pb-3">
          {calendarDays.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} className="aspect-square" />
            }
            const dateKey = formatDateKey(day)
            const entries = notableDates.get(dateKey)
            const hasEvents = !!entries
            const isSelected = selectedDate === dateKey
            const today = new Date()
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear()

            return (
              <button
                key={dateKey}
                type="button"
                onClick={() => hasEvents ? setSelectedDate(isSelected ? null : dateKey) : undefined}
                className={cn(
                  "aspect-square flex flex-col items-center justify-center rounded-md text-xs relative transition-colors",
                  hasEvents
                    ? "cursor-pointer hover:bg-white/10"
                    : "cursor-default",
                  isSelected && "bg-white/15 ring-1 ring-white/30",
                  isToday && !isSelected && "ring-1 ring-[#94a3b8]/40"
                )}
                aria-label={
                  hasEvents
                    ? `${day} de ${MONTH_NAMES[currentMonth]} - ${entries.length} evento(s)`
                    : `${day} de ${MONTH_NAMES[currentMonth]}`
                }
              >
                {/* Circular image indicator for event dates */}
                {hasEvents ? (
                  <div className="relative">
                    <div
                      className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-semibold border-2",
                        entries.some((e) => e.type === "milestone" && e.completed)
                          ? "border-status-completed bg-status-completed/20 text-[#e2e8f0]"
                          : entries.some((e) => e.type === "milestone")
                            ? "border-primary bg-primary/20 text-[#e2e8f0]"
                            : "border-status-planned bg-status-planned/20 text-[#e2e8f0]"
                      )}
                    >
                      {day}
                    </div>
                    {/* Small dot indicator at bottom-right */}
                    <div
                      className={cn(
                        "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-[#1e2530]",
                        getDotColor(entries)
                      )}
                    />
                  </div>
                ) : (
                  <span className={cn(
                    "tabular-nums",
                    isToday ? "text-[#e2e8f0] font-semibold" : "text-[#94a3b8]"
                  )}>
                    {day}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected date details panel */}
      {selectedEntries && selectedDate && (
        <div className="border-t border-border bg-card">
          <div className="px-4 py-2.5 border-b border-border">
            <span className="text-xs font-medium text-muted-foreground tabular-nums">
              {selectedDate}
            </span>
          </div>
          <div className="divide-y divide-border">
            {selectedEntries.map((entry, i) => (
              <div key={`detail-${i}`} className="px-4 py-2.5 flex items-start gap-2.5">
                {entry.type === "milestone" ? (
                  entry.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-status-completed shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  )
                ) : (
                  <Calendar className="h-4 w-4 text-status-planned shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-foreground leading-snug">
                    {entry.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {entry.type === "milestone"
                      ? entry.completed ? "Marco concluido" : "Marco previsto"
                      : "Atualizacao de campo"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="px-4 py-2.5 border-t border-border bg-card">
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-status-completed" />
            Concluido
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Previsto
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-status-planned" />
            Atualizacao
          </span>
        </div>
      </div>
    </div>
  )
}

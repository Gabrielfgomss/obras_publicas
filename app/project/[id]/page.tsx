"use client";

import React from "react";
import { use, useMemo, useCallback, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { PortalHeader } from "@/components/portal-header";
import { PortalFooter } from "@/components/portal-footer";
import { StatusBadge } from "@/components/status-badge";
import { Progress } from "@/components/ui/progress";
import { ErrorState } from "@/components/ui-states";
import { projects } from "@/lib/mock-data";
import type { Project } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Landmark,
  FileText,
  User,
  ImageOff,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Shield,
  Tag,
  DollarSign,
  Clock,
  Wallet,
  Banknote,
} from "lucide-react";

function formatDateBR(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

// TODO: conectar ao campo real quando dispon\u00edvel na API/store
function getMockFinancials(project: Project) {
  const seed = project.id
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const totalValue = 1_800_000 + (seed % 15) * 650_000;
  const executedValue = Math.round((totalValue * project.progress) / 100);
  return { totalValue, executedValue };
}

const brl = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(n);

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = useMemo(() => projects.find((p) => p.id === id), [id]);

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
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PortalHeader />
      <main className="flex-1 bg-background">
        <div className="max-w-[1280px] mx-auto px-6 py-6">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 mb-5"
            aria-label="Navegacao de retorno"
          >
            <Link
              href="/explore"
              className="flex items-center gap-1.5 text-xs text-accent hover:text-accent/80 font-semibold transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar para explorar
            </Link>
          </nav>

          {/* Project header card */}
          <div className="bg-card border border-border rounded-lg mb-6 shadow-sm overflow-hidden flex">
            {/* Left: all content */}
            <div className="flex-1 min-w-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-institutional">
                  <Shield className="h-3 w-3" />
                  Obra Publica
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {project.contractId}
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-2 text-balance">
                {project.name}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 shrink-0 text-accent/60" />
                <span>
                  {project.location} -- {project.city}, {project.district}
                </span>
              </div>
              <StatusBadge
                status={project.status}
                className="text-sm px-3.5 py-1.5"
              />

              <div className="flex items-center gap-4 px-4 py-3 bg-muted/50 rounded-lg mt-4">
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                  Progresso
                </span>
                <div className="progress-institutional flex-1">
                  <div style={{ width: `${project.progress}%` }} />
                </div>
                <span className="text-base font-bold text-foreground tabular-nums w-14 text-right">
                  {project.progress}%
                </span>
              </div>

              <HeaderStatsGrid project={project} />
            </div>

            {/* Right: cover photo inset with card margin */}
            {project.heroImage && (
              <div className="hidden md:block w-[28rem] shrink-0 relative">
                <div className="absolute inset-3 rounded-xl overflow-hidden">
                  <img
                    src={project.heroImage}
                    alt={`Foto da obra: ${project.name}`}
                    className="w-full h-full object-fill"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Milestone calendar - highlighted below header */}
          <MilestoneCalendar project={project} />

          {/* Location map */}
          <LocationMap project={project} />

          {/* Two-column: Timeline + Sidebar (official data + milestones) */}
          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Timeline */}
            <div className="flex-1 min-w-0">
              <div className="bg-card border border-border rounded-lg">
                <div className="px-5 py-4 border-b border-border">
                  <h2 className="text-sm font-bold text-foreground">
                    Historico de atualizacoes
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Registro cronologico das atualizacoes, da mais recente para
                    a mais antiga.
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
                      <div key={update.id} className="px-5 py-5">
                        <div className="flex items-start gap-4">
                          {/* Timeline dot */}
                          <div className="flex flex-col items-center pt-1 shrink-0">
                            <div className="timeline-dot" />
                            {index < project.updates.length - 1 && (
                              <div className="w-px flex-1 bg-border mt-1 min-h-8" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1.5">
                              <time className="text-xs text-muted-foreground tabular-nums font-semibold">
                                {update.date}
                              </time>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <User className="h-3 w-3 text-accent/50" />
                                {update.author}
                              </div>
                            </div>

                            <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">
                              {update.title}
                            </h3>

                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                              {update.description}
                            </p>

                            {/* Image evidence */}
                            {update.imageUrl ? (
                              <div className="rounded-lg border border-border bg-muted overflow-hidden max-w-md">
                                <div className="aspect-video flex items-center justify-center bg-secondary">
                                  <div className="flex flex-col items-center gap-1.5 text-muted-foreground">
                                    <ImageOff className="h-6 w-6" />
                                    <span className="text-xs font-medium">
                                      Evidencia fotografica
                                    </span>
                                    <span className="text-[10px] text-muted-foreground/60">
                                      (Placeholder de exemplo)
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <p className="text-[11px] text-muted-foreground/50 italic">
                                Sem evidencia fotografica nesta atualizacao.
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
              <div className="bg-card border border-border rounded-lg">
                <div className="px-4 py-3.5 border-b border-border">
                  <h2 className="text-sm font-bold text-foreground">
                    Dados oficiais
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  <InfoRow
                    icon={Landmark}
                    label="Empresa executora"
                    value={project.contractor}
                  />
                  <InfoRow
                    icon={Calendar}
                    label="Data de inicio"
                    value={project.startDate}
                  />
                  <InfoRow
                    icon={Clock}
                    label="Previsao de termino"
                    value={project.expectedEndDate}
                  />
                  <InfoRow
                    icon={FileText}
                    label="Referencia do contrato"
                    value={project.contractId}
                  />
                  <InfoRow
                    icon={DollarSign}
                    label="Orcamento aprovado"
                    value={project.budget}
                  />
                  <InfoRow
                    icon={Tag}
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
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Os dados exibidos sao de responsabilidade do orgao
                    cadastrante e podem sofrer atualizacoes.
                  </p>
                </div>
              </div>

              {/* Gallery section */}
              <GallerySection project={project} />
            </div>
          </div>
        </div>
      </main>
      <PortalFooter />
    </div>
  );
}

/* ---- Sub-components ---- */

function HeaderStatsGrid({ project }: { project: Project }) {
  const { totalValue, executedValue } = getMockFinancials(project);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
      <HeaderStat
        icon={Clock}
        label="Previsao de conclusao"
        value={
          <span className="text-base font-bold text-foreground tabular-nums">
            {formatDateBR(project.expectedEndDate)}
          </span>
        }
      />
      <HeaderStat
        icon={Wallet}
        label="Valor executado"
        value={
          <span className="text-base font-bold text-foreground tabular-nums">
            {brl(executedValue)}
          </span>
        }
      />
      <HeaderStat
        icon={Banknote}
        label="Valor total da obra"
        value={
          <span className="text-base font-bold text-foreground tabular-nums">
            {brl(totalValue)}
          </span>
        }
      />
    </div>
  );
}

function HeaderStat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="px-4 py-3 bg-muted/40 rounded-lg border border-border/60 flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <Icon className="h-3 w-3 shrink-0 text-accent/60" />
        <span className="font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="leading-tight">{value}</div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-1">
        <Icon className="h-3 w-3 shrink-0 text-accent/50" />
        <span className="font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-sm text-foreground font-medium">{value}</div>
    </div>
  );
}

function GallerySection({ project }: { project: Project }) {
  const allImages = [
    ...(project.heroImage ? [project.heroImage] : []),
    ...project.galleryImages,
  ];

  if (allImages.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg">
        <div className="px-4 py-3.5 border-b border-border">
          <h2 className="text-sm font-bold text-foreground">
            Galeria da construcao
          </h2>
        </div>
        <div className="p-6 text-center">
          <ImageOff className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground font-medium">
            Nenhuma imagem disponivel.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Imagens serao publicadas pelo responsavel da obra.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-3.5 border-b border-border">
        <h2 className="text-sm font-bold text-foreground">
          Galeria da construcao
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {allImages.length} foto{allImages.length !== 1 ? "s" : ""}
        </p>
      </div>
      {/* Hero image (first) in full width */}
      {project.heroImage && (
        <div className="aspect-video bg-secondary border-b border-border overflow-hidden">
          <img
            src={project.heroImage}
            alt={`Imagem conceitual da obra: ${project.name}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {/* Remaining gallery images */}
      {project.galleryImages.length > 0 && (
        <div className="p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
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
      )}
    </div>
  );
}

function LocationMap({ project }: { project: Project }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

  const drawMap = useCallback(() => {
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

    // Background - institutional
    ctx.fillStyle = "#E2E8F0";
    ctx.fillRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = "#CBD5E1";
    ctx.lineWidth = 0.3;
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Roads
    ctx.strokeStyle = "#B0BEC5";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.4);
    ctx.lineTo(w, h * 0.42);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w * 0.5, 0);
    ctx.lineTo(w * 0.48, h);
    ctx.stroke();

    // Marker in center
    const cx = w / 2;
    const cy = h / 2;

    // Pulse ring
    ctx.beginPath();
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(8, 145, 178, 0.12)";
    ctx.fill();

    // Shadow
    ctx.beginPath();
    ctx.arc(cx, cy + 2, 11, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fill();

    // Main marker
    ctx.beginPath();
    ctx.arc(cx, cy, 11, 0, Math.PI * 2);
    ctx.fillStyle = "#0891B2";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Inner dot
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Attribution
    ctx.fillStyle = "#94A3B8";
    ctx.font = "10px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("Mapa simulado -- Dados de exemplo", w - 12, h - 10);
  }, [dimensions]);

  useEffect(() => {
    drawMap();
  }, [drawMap]);

  return (
    <section className="mt-6">
      <h2 className="text-sm font-bold text-foreground mb-3">Localizacao</h2>
      <div
        ref={containerRef}
        className="map-container bg-muted relative"
        style={{ height: "240px" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          role="img"
          aria-label={`Mapa da localizacao da obra: ${project.location}, ${project.city}`}
        />
        {/* Info overlay */}
        <div className="absolute bottom-3 left-3 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3.5 py-2.5 text-xs shadow-sm">
          <div className="flex items-center gap-1.5 text-foreground font-semibold">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {project.location}
          </div>
          <div className="text-muted-foreground mt-0.5">
            {project.city}, {project.district}
          </div>
        </div>
      </div>
    </section>
  );
}

function MilestoneCalendar({ project }: { project: Project }) {
  const MONTH_NAMES = [
    "janeiro",
    "fevereiro",
    "marco",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const DAY_HEADERS = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sab."];

  const notableDates = useMemo(() => {
    const map = new Map<
      string,
      {
        type: "milestone" | "update";
        label: string;
        completed: boolean;
        imageUrl?: string;
      }[]
    >();
    for (const ms of project.milestones) {
      const key = ms.date;
      if (!map.has(key)) map.set(key, []);
      map
        .get(key)!
        .push({ type: "milestone", label: ms.label, completed: ms.completed });
    }
    for (const upd of project.updates) {
      const key = upd.date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({
        type: "update",
        label: upd.title,
        completed: false,
        imageUrl: upd.imageUrl,
      });
    }
    return map;
  }, [project.milestones, project.updates]);

  // Map date -> first imageUrl from updates on that date
  const imagesByDate = useMemo(() => {
    const map = new Map<string, string>();
    for (const upd of project.updates) {
      if (upd.imageUrl && !map.has(upd.date)) {
        map.set(upd.date, upd.imageUrl);
      }
    }
    return map;
  }, [project.updates]);

  // Assign galleryImages to milestones that have no update image
  const milestoneImages = useMemo(() => {
    const result = new Map<string, string>();
    let galleryIdx = 0;
    for (const ms of project.milestones) {
      const img = imagesByDate.get(ms.date);
      if (img) {
        result.set(ms.id, img);
      } else if (project.galleryImages[galleryIdx]) {
        result.set(ms.id, project.galleryImages[galleryIdx++]);
      }
    }
    return result;
  }, [project.milestones, imagesByDate, project.galleryImages]);

  const initialDate = useMemo(() => {
    const allDates = [
      ...project.milestones.map((m) => new Date(m.date)),
      ...project.updates.map((u) => new Date(u.date)),
    ].filter((d) => !Number.isNaN(d.getTime()));
    if (allDates.length === 0) return new Date();
    allDates.sort((a, b) => b.getTime() - a.getTime());
    return allDates[0];
  }, [project.milestones, project.updates]);

  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const prevMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
    setSelectedDate(null);
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
    setSelectedDate(null);
  }, []);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDow = firstDay.getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const cells: (number | null)[] = [];
    for (let i = 0; i < startDow; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [currentMonth, currentYear]);

  const formatDateKey = (day: number) => {
    const m = String(currentMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${currentYear}-${m}-${d}`;
  };

  const getDotColor = (
    entries: { type: "milestone" | "update"; completed: boolean }[],
  ) => {
    const hasMilestone = entries.some((e) => e.type === "milestone");
    const completed = entries.some(
      (e) => e.type === "milestone" && e.completed,
    );
    if (hasMilestone && completed) return "bg-status-completed";
    if (hasMilestone) return "bg-accent";
    return "bg-status-planned";
  };

  const selectedEntries = selectedDate ? notableDates.get(selectedDate) : null;

  if (project.milestones.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg mt-6">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-bold text-foreground">
            Calendario de marcos
          </h2>
        </div>
        <div className="px-4 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum marco definido para esta obra.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden mt-6">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-bold text-foreground">
          Calendario de marcos
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Selecione uma data para ver os detalhes.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left: Calendar - institutional dark theme */}
        <div className="bg-primary text-primary-foreground lg:w-80 shrink-0">
          {/* Month navigation */}
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Mes anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-semibold">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 rounded-md hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label="Proximo mes"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-0 px-2">
            {DAY_HEADERS.map((d) => (
              <div
                key={d}
                className="text-center text-[10px] text-white/40 font-semibold pb-2"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-0 px-2 pb-3">
            {calendarDays.map((day, i) => {
              if (day === null) {
                return <div key={`empty-${i}`} className="aspect-square" />;
              }
              const dateKey = formatDateKey(day);
              const entries = notableDates.get(dateKey);
              const hasEvents = !!entries;
              const isSelected = selectedDate === dateKey;
              const today = new Date();
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              return (
                <button
                  key={dateKey}
                  type="button"
                  onClick={() =>
                    hasEvents
                      ? setSelectedDate(isSelected ? null : dateKey)
                      : undefined
                  }
                  className={cn(
                    "aspect-square flex flex-col items-center justify-center rounded-md text-xs relative transition-colors",
                    hasEvents
                      ? "cursor-pointer hover:bg-white/10"
                      : "cursor-default",
                    isSelected && "bg-white/15 ring-1 ring-white/30",
                    isToday && !isSelected && "ring-1 ring-white/20",
                  )}
                  aria-label={
                    hasEvents
                      ? `${day} de ${MONTH_NAMES[currentMonth]} - ${entries.length} evento(s)`
                      : `${day} de ${MONTH_NAMES[currentMonth]}`
                  }
                >
                  {hasEvents ? (
                    <div className="relative">
                      <div
                        className={cn(
                          "h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-semibold border-2",
                          entries.some(
                            (e) => e.type === "milestone" && e.completed,
                          )
                            ? "border-status-completed bg-status-completed/20 text-white"
                            : entries.some((e) => e.type === "milestone")
                              ? "border-accent bg-accent/20 text-white"
                              : "border-status-planned bg-status-planned/20 text-white",
                        )}
                      >
                        {day}
                      </div>
                      <div
                        className={cn(
                          "absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-primary",
                          getDotColor(entries),
                        )}
                      />
                    </div>
                  ) : (
                    <span
                      className={cn(
                        "tabular-nums",
                        isToday ? "text-white font-semibold" : "text-white/40",
                      )}
                    >
                      {day}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="px-4 py-2.5 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-white/50 font-medium">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-status-completed" />
                Concluido
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-accent" />
                Previsto
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-status-planned" />
                Atualizacao
              </span>
            </div>
          </div>
        </div>

        {/* Right: Milestones list or selected date details */}
        <div className="flex-1 min-w-0 border-t border-border lg:border-t-0 lg:border-l lg:border-border">
          {selectedEntries && selectedDate ? (
            /* Selected date details with thumbnails */
            <div>
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                  {selectedDate}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedDate(null)}
                  className="text-[10px] text-accent hover:text-accent/80 font-semibold transition-colors"
                >
                  Ver todos
                </button>
              </div>
              <div className="divide-y divide-border">
                {selectedEntries.map((entry, i) => (
                  <div
                    key={`detail-${i}`}
                    className="px-4 py-3 flex items-start gap-3"
                  >
                    <div className="shrink-0 mt-0.5">
                      {entry.type === "milestone" ? (
                        entry.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-status-completed" />
                        ) : (
                          <Circle className="h-4 w-4 text-accent" />
                        )
                      ) : (
                        <Calendar className="h-4 w-4 text-status-planned" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-foreground leading-snug">
                        {entry.label}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {entry.type === "milestone"
                          ? entry.completed
                            ? "Marco concluido"
                            : "Marco previsto"
                          : "Atualizacao de campo"}
                      </div>
                    </div>
                    {entry.imageUrl && (
                      <div className="h-16 w-16 rounded-md overflow-hidden bg-muted shrink-0 border border-border">
                        <img
                          src={entry.imageUrl}
                          alt={entry.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* All milestones list with thumbnails */
            <div>
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Todos os marcos ({project.milestones.length})
                </h3>
              </div>
              <div className="divide-y divide-border overflow-y-auto max-h-72 lg:max-h-none">
                {project.milestones.map((ms) => {
                  const imgUrl = milestoneImages.get(ms.id);
                  return (
                    <button
                      key={ms.id}
                      type="button"
                      onClick={() => setSelectedDate(ms.date)}
                      className="w-full px-4 py-3 flex items-start gap-3 hover:bg-muted/40 transition-colors text-left"
                    >
                      <div className="shrink-0 mt-0.5">
                        {ms.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-status-completed" />
                        ) : (
                          <Circle className="h-4 w-4 text-accent" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-foreground leading-snug">
                          {ms.label}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5 tabular-nums">
                          {ms.date}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          {ms.completed ? "Concluido" : "Previsto"}
                        </div>
                      </div>
                      {imgUrl && (
                        <div className="h-14 w-14 rounded-md overflow-hidden bg-muted shrink-0 border border-border">
                          <img
                            src={imgUrl}
                            alt={ms.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

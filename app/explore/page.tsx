"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PortalHeader } from "@/components/portal-header";
import { PortalFooter } from "@/components/portal-footer";
import { LocationSelector } from "@/components/location-selector";
import { ProjectMap } from "@/components/project-map";
import { ProjectCard } from "@/components/project-card";
import { StatusBadge } from "@/components/status-badge";
import { RecentUpdates } from "@/components/recent-updates";
import { EmptyState } from "@/components/ui-states";
import {
  projects,
  regions,
  type ProjectStatus,
  statusLabels,
  getRecentUpdates,
} from "@/lib/mock-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const statusOptions: ProjectStatus[] = [
  "in-progress",
  "completed",
  "planned",
  "delayed",
  "on-hold",
];

export default function ExplorePage() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedProject, setHighlightedProject] = useState<string | null>(
    null,
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const selectedCity = useMemo(() => {
    for (const region of regions) {
      const city = region.cities.find((c) => c.id === selectedLocation);
      if (city) return city;
    }
    return null;
  }, [selectedLocation]);

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (selectedLocation !== "all" && selectedCity) {
      result = result.filter((p) => p.city === selectedCity.name);
    }

    if (statusFilter !== "all") {
      result = result.filter((p) => p.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.city.toLowerCase().includes(query) ||
          p.contractId.toLowerCase().includes(query),
      );
    }

    return result;
  }, [selectedLocation, selectedCity, statusFilter, searchQuery]);

  const recentUpdates = useMemo(
    () => getRecentUpdates(filteredProjects, 4),
    [filteredProjects],
  );

  const mapCenter = useMemo(() => {
    if (selectedCity) return { lat: selectedCity.lat, lng: selectedCity.lng };
    return { lat: -12.06, lng: -77.04 };
  }, [selectedCity]);

  const mapZoom = useMemo(() => {
    if (selectedCity) return selectedCity.zoom;
    return 12;
  }, [selectedCity]);

  const handleProjectSelect = useCallback(
    (id: string) => {
      router.push(`/project/${id}`);
    },
    [router],
  );

  const hasActiveFilters =
    selectedLocation !== "all" ||
    statusFilter !== "all" ||
    searchQuery.trim() !== "";

  const clearFilters = () => {
    setSelectedLocation("all");
    setStatusFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PortalHeader />

      <main className="flex-1 flex flex-col">
        {/* Page header + filters */}
        <div
          className="bg-card px-6 py-5"
          style={{ borderBottom: "1px solid hsl(214, 20%, 88%)" }}
        >
          <div className="max-w-[1320px] mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-accent" />
                  <h1 className="text-lg font-bold text-foreground">
                    Explorar obras
                  </h1>
                </div>
                <p className="text-xs text-muted-foreground">
                  Busque e filtre obras por nome, localizacao ou status.
                </p>
              </div>
              <div className="text-xs text-muted-foreground tabular-nums font-semibold bg-muted px-3 py-1.5 rounded-lg">
                {filteredProjects.length}{" "}
                {filteredProjects.length === 1 ? "resultado" : "resultados"}
              </div>
            </div>

            {/* Desktop filters */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por nome, local ou contrato..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 text-sm pl-9"
                  aria-label="Buscar obras por nome, localizacao ou contrato"
                />
              </div>

              <LocationSelector
                value={selectedLocation}
                onChange={setSelectedLocation}
              />

              <div className="flex items-center gap-2">
                <label
                  htmlFor="status-filter"
                  className="text-xs text-muted-foreground font-semibold whitespace-nowrap"
                >
                  Status
                </label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger
                    id="status-filter"
                    className="w-44 h-9 text-xs"
                  >
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    {statusOptions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {statusLabels[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs gap-1.5 h-9 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                  Limpar filtros
                </Button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="text-xs gap-1.5 w-full"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {showMobileFilters ? "Ocultar filtros" : "Filtros"}
                {hasActiveFilters && (
                  <span className="ml-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">
                    !
                  </span>
                )}
              </Button>

              {showMobileFilters && (
                <div className="flex flex-col gap-3 mt-3 pt-3 border-t border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar por nome, local ou contrato..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="h-10 text-sm pl-9"
                      aria-label="Buscar obras"
                    />
                  </div>
                  <LocationSelector
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-10 text-xs">
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      {statusOptions.map((s) => (
                        <SelectItem key={s} value={s}>
                          {statusLabels[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs gap-1 text-muted-foreground"
                    >
                      <X className="h-3 w-3" />
                      Limpar filtros
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content: Map + Sidebar */}
        <div
          className="flex-1 flex overflow-hidden"
          style={{ minHeight: "560px" }}
        >
          {/* Map */}
          <div className="flex-1 min-w-0 relative">
            <ProjectMap
              projects={filteredProjects}
              center={mapCenter}
              zoom={mapZoom}
              highlightedId={highlightedProject}
              onProjectHover={setHighlightedProject}
              onProjectSelect={handleProjectSelect}
              className="absolute inset-0"
            />
          </div>

          {/* Sidebar: project list + recent updates */}
          <div className="w-[400px] shrink-0 border-l border-border bg-card flex-col hidden md:flex">
            <div className="px-4 py-3.5 border-b border-border flex items-center justify-between shrink-0">
              <h2 className="text-sm font-bold text-foreground">
                Lista de obras
              </h2>
              {statusFilter !== "all" && (
                <StatusBadge status={statusFilter as ProjectStatus} />
              )}
            </div>

            {filteredProjects.length === 0 ? (
              <EmptyState
                title="Nenhuma obra encontrada"
                description="Nao ha obras que correspondam aos filtros selecionados. Tente ajustar a localizacao, o status ou o termo de busca."
              />
            ) : (
              <ScrollArea className="flex-1">
                <div className="p-3 flex flex-col gap-2.5">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isHighlighted={highlightedProject === project.id}
                      onMouseEnter={() => setHighlightedProject(project.id)}
                      onMouseLeave={() => setHighlightedProject(null)}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}

            {/* Recent updates at bottom */}
            {filteredProjects.length > 0 && (
              <div className="border-t border-border shrink-0">
                <RecentUpdates updates={recentUpdates} />
              </div>
            )}
          </div>
        </div>
      </main>

      <PortalFooter />
    </div>
  );
}

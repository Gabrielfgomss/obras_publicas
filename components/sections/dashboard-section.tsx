"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LocationSelector } from "@/components/location-selector";
import { KpiCards } from "@/components/kpi-cards";
import { ProjectMap } from "@/components/project-map";
import { RecentUpdates } from "@/components/recent-updates";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import {
  projects,
  regions,
  getStatusCounts,
  getRecentUpdates,
} from "@/lib/mock-data";

export function DashboardSection() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [highlightedProject, setHighlightedProject] = useState<string | null>(
    null,
  );

  const selectedCity = useMemo(() => {
    for (const region of regions) {
      const city = region.cities.find((c) => c.id === selectedLocation);
      if (city) return city;
    }
    return null;
  }, [selectedLocation]);

  const filteredProjects = useMemo(() => {
    if (selectedLocation === "all") return projects;
    if (!selectedCity) return projects;
    return projects.filter((p) => p.city === selectedCity.name);
  }, [selectedLocation, selectedCity]);

  const statusCounts = useMemo(
    () => getStatusCounts(filteredProjects),
    [filteredProjects],
  );
  const recentUpdates = useMemo(
    () => getRecentUpdates(filteredProjects, 5),
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

  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="max-w-[1320px] mx-auto px-6 flex flex-col gap-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
              Resumo das obras
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Visao geral dos projetos cadastrados. Use os filtros para refinar
              a busca.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <LocationSelector
              value={selectedLocation}
              onChange={setSelectedLocation}
            />
            <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap font-medium">
              {filteredProjects.length} de {projects.length} obras
            </span>
          </div>
        </div>

        <KpiCards total={filteredProjects.length} counts={statusCounts} />

        {/* Map + Sidebar */}
        <div className="flex gap-5" style={{ minHeight: "500px" }}>
          <div className="flex-1 min-w-0">
            <ProjectMap
              projects={filteredProjects}
              center={mapCenter}
              zoom={mapZoom}
              highlightedId={highlightedProject}
              onProjectHover={setHighlightedProject}
              onProjectSelect={handleProjectSelect}
              className="h-full w-full"
            />
          </div>

          <div className="w-80 shrink-0 flex-col gap-4 overflow-auto hidden lg:flex">
            <RecentUpdates updates={recentUpdates} />

            <div className="bg-card border border-border rounded-lg">
              <div className="px-4 py-3.5 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Obras recentes
                </h3>
                <button
                  type="button"
                  onClick={() => router.push("/explore")}
                  className="text-xs text-accent hover:underline font-semibold"
                >
                  Ver todas
                </button>
              </div>
              <div className="p-2.5 flex flex-col gap-2.5 max-h-72 overflow-auto">
                {filteredProjects.slice(0, 4).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isHighlighted={highlightedProject === project.id}
                    onMouseEnter={() => setHighlightedProject(project.id)}
                    onMouseLeave={() => setHighlightedProject(null)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA to explore */}
        <div className="flex justify-center pt-4">
          <Link href="/explore">
            <Button
              size="lg"
              className="text-sm gap-2 bg-accent hover:bg-accent/90 text-white"
            >
              Explorar todas as obras
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

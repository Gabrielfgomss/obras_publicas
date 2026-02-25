"use client"

import { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LocationSelector } from "@/components/location-selector"
import { KpiCards } from "@/components/kpi-cards"
import { ProjectMap } from "@/components/project-map"
import { RecentUpdates } from "@/components/recent-updates"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import {
  projects,
  regions,
  getStatusCounts,
  getRecentUpdates,
} from "@/lib/mock-data"

export function DashboardSection() {
  const router = useRouter()
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [highlightedProject, setHighlightedProject] = useState<string | null>(null)

  const selectedCity = useMemo(() => {
    for (const region of regions) {
      const city = region.cities.find((c) => c.id === selectedLocation)
      if (city) return city
    }
    return null
  }, [selectedLocation])

  const filteredProjects = useMemo(() => {
    if (selectedLocation === "all") return projects
    if (!selectedCity) return projects
    return projects.filter((p) => p.city === selectedCity.name)
  }, [selectedLocation, selectedCity])

  const statusCounts = useMemo(
    () => getStatusCounts(filteredProjects),
    [filteredProjects]
  )
  const recentUpdates = useMemo(
    () => getRecentUpdates(filteredProjects, 5),
    [filteredProjects]
  )

  const mapCenter = useMemo(() => {
    if (selectedCity) return { lat: selectedCity.lat, lng: selectedCity.lng }
    return { lat: -12.06, lng: -77.04 }
  }, [selectedCity])

  const mapZoom = useMemo(() => {
    if (selectedCity) return selectedCity.zoom
    return 12
  }, [selectedCity])

  const handleProjectSelect = useCallback(
    (id: string) => {
      router.push(`/project/${id}`)
    },
    [router]
  )

  return (
    <section className="py-12 md:py-16 bg-card border-y border-border">
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col gap-5">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-foreground tracking-tight">
              Resumo das obras
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Visao geral dos projetos cadastrados. Use os filtros para refinar a busca.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <LocationSelector
              value={selectedLocation}
              onChange={setSelectedLocation}
            />
            <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
              {filteredProjects.length} de {projects.length} obras
            </span>
          </div>
        </div>

        <KpiCards total={filteredProjects.length} counts={statusCounts} />

        {/* Map + Sidebar */}
        <div className="flex gap-4" style={{ minHeight: "480px" }}>
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

            <div className="bg-background border border-border rounded-md">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">
                  Obras recentes
                </h3>
                <button
                  type="button"
                  onClick={() => router.push("/explore")}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Ver todas
                </button>
              </div>
              <div className="p-2 flex flex-col gap-2 max-h-72 overflow-auto">
                {filteredProjects.slice(0, 4).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    isHighlighted={highlightedProject === project.id}
                    onMouseEnter={() =>
                      setHighlightedProject(project.id)
                    }
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
            <Button variant="outline" size="sm" className="text-xs gap-1.5 bg-transparent">
              Explorar todas as obras
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

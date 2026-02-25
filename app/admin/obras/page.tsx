"use client"

import { useState, useMemo } from "react"
import { Plus, Search, Edit2, Eye, HardHat, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  projects as initialProjects,
  type Project,
  type ProjectStatus,
  statusLabels,
  statusColors,
  regions,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const ITEMS_PER_PAGE = 6

export default function ObrasPage() {
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects)
  const [search, setSearch] = useState("")
  const [filterUF, setFilterUF] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // Form state
  const [formName, setFormName] = useState("")
  const [formLocation, setFormLocation] = useState("")
  const [formCity, setFormCity] = useState("")
  const [formDistrict, setFormDistrict] = useState("")
  const [formStatus, setFormStatus] = useState<ProjectStatus>("planned")
  const [formProgress, setFormProgress] = useState("0")
  const [formContractor, setFormContractor] = useState("")
  const [formBudget, setFormBudget] = useState("")
  const [formStartDate, setFormStartDate] = useState("")
  const [formEndDate, setFormEndDate] = useState("")
  const [formCategory, setFormCategory] = useState("")

  // Update form state
  const [updateTitle, setUpdateTitle] = useState("")
  const [updateDescription, setUpdateDescription] = useState("")

  const filtered = useMemo(() => {
    return projectsList.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase())
      const matchUF = filterUF === "all" || p.district === filterUF
      const matchStatus = filterStatus === "all" || p.status === filterStatus
      return matchSearch && matchUF && matchStatus
    })
  }, [projectsList, search, filterUF, filterStatus])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const uniqueDistricts = [...new Set(projectsList.map((p) => p.district))]

  function openCreateDialog() {
    setEditingProject(null)
    setFormName("")
    setFormLocation("")
    setFormCity("")
    setFormDistrict("")
    setFormStatus("planned")
    setFormProgress("0")
    setFormContractor("")
    setFormBudget("")
    setFormStartDate("")
    setFormEndDate("")
    setFormCategory("")
    setDialogOpen(true)
  }

  function openEditDialog(project: Project) {
    setEditingProject(project)
    setFormName(project.name)
    setFormLocation(project.location)
    setFormCity(project.city)
    setFormDistrict(project.district)
    setFormStatus(project.status)
    setFormProgress(String(project.progress))
    setFormContractor(project.contractor)
    setFormBudget(project.budget)
    setFormStartDate(project.startDate)
    setFormEndDate(project.expectedEndDate)
    setFormCategory(project.category)
    setUpdateTitle("")
    setUpdateDescription("")
    setDialogOpen(true)
  }

  function openDetailDialog(project: Project) {
    setSelectedProject(project)
    setDetailDialogOpen(true)
  }

  function handleSave() {
    if (editingProject) {
      setProjectsList((prev) =>
        prev.map((p) => {
          if (p.id !== editingProject.id) return p
          const updated = {
            ...p,
            name: formName,
            location: formLocation,
            city: formCity,
            district: formDistrict,
            status: formStatus,
            progress: Number(formProgress),
            contractor: formContractor,
            budget: formBudget,
            startDate: formStartDate,
            expectedEndDate: formEndDate,
            category: formCategory,
          }
          if (updateTitle.trim()) {
            updated.updates = [
              {
                id: `upd-${Date.now()}`,
                date: new Date().toISOString().split("T")[0],
                title: updateTitle,
                description: updateDescription,
                author: "Admin",
              },
              ...p.updates,
            ]
            updated.lastUpdate = new Date().toISOString().split("T")[0]
          }
          return updated
        })
      )
    } else {
      const newProject: Project = {
        id: `proj-${Date.now()}`,
        name: formName,
        location: formLocation,
        city: formCity,
        district: formDistrict,
        status: formStatus,
        progress: Number(formProgress),
        lastUpdate: new Date().toISOString().split("T")[0],
        lat: -12.05,
        lng: -77.04,
        contractor: formContractor,
        startDate: formStartDate,
        expectedEndDate: formEndDate,
        contractId: `CP-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
        budget: formBudget,
        category: formCategory,
        updates: [],
        milestones: [],
        galleryImages: [],
        heroImage: null,
      }
      setProjectsList((prev) => [newProject, ...prev])
    }
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Obras</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gerencie todas as obras do sistema
          </p>
        </div>
        <Button onClick={openCreateDialog} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Nova obra
        </Button>
      </div>

      {/* Filters */}
      <Card className="border border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou cidade..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1) }}
                className="pl-9"
              />
            </div>
            <Select value={filterUF} onValueChange={(v) => { setFilterUF(v); setPage(1) }}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Regiao" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as regioes</SelectItem>
                {uniqueDistricts.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setPage(1) }}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                {(Object.keys(statusLabels) as ProjectStatus[]).map((s) => (
                  <SelectItem key={s} value={s}>{statusLabels[s]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border border-border">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Obra</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progresso</TableHead>
                <TableHead>Ultima Atualizacao</TableHead>
                <TableHead className="text-right pr-6">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    Nenhuma obra encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                paginated.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <HardHat className="h-4 w-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate max-w-[240px]">{project.name}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                            <span className="text-xs text-muted-foreground truncate">{project.location}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{project.city}</TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", statusColors[project.status])}>
                        {statusLabels[project.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Progress value={project.progress} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">
                          {project.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground tabular-nums">
                      {new Date(project.lastUpdate).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDetailDialog(project)}
                          aria-label={`Ver detalhes de ${project.name}`}
                        >
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(project)}
                          aria-label={`Editar ${project.name}`}
                        >
                          <Edit2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {(page - 1) * ITEMS_PER_PAGE + 1} a{" "}
            {Math.min(page * ITEMS_PER_PAGE, filtered.length)} de {filtered.length} obras
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              Anterior
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button key={p} variant={p === page ? "default" : "outline"} size="sm" onClick={() => setPage(p)} className="min-w-[36px]">
                {p}
              </Button>
            ))}
            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              Proximo
            </Button>
          </div>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Editar obra" : "Cadastrar nova obra"}
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="info" className="mt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Informacoes</TabsTrigger>
              {editingProject && <TabsTrigger value="update">Nova Atualizacao</TabsTrigger>}
              {!editingProject && <TabsTrigger value="info" disabled>Nova Atualizacao</TabsTrigger>}
            </TabsList>
            <TabsContent value="info" className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="obra-name">Nome da obra</Label>
                  <Input id="obra-name" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Nome da obra" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="obra-location">Localizacao</Label>
                  <Input id="obra-location" value={formLocation} onChange={(e) => setFormLocation(e.target.value)} placeholder="Endereco / referencia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obra-city">Cidade</Label>
                  <Input id="obra-city" value={formCity} onChange={(e) => setFormCity(e.target.value)} placeholder="Cidade" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obra-district">Regiao (UF)</Label>
                  <Select value={formDistrict} onValueChange={setFormDistrict}>
                    <SelectTrigger id="obra-district"><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obra-status">Status</Label>
                  <Select value={formStatus} onValueChange={(v) => setFormStatus(v as ProjectStatus)}>
                    <SelectTrigger id="obra-status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {(Object.keys(statusLabels) as ProjectStatus[]).map((s) => (
                        <SelectItem key={s} value={s}>{statusLabels[s]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obra-progress">Progresso (%)</Label>
                  <Input id="obra-progress" type="number" min="0" max="100" value={formProgress} onChange={(e) => setFormProgress(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obra-contractor">Empreiteira</Label>
                  <Input id="obra-contractor" value={formContractor} onChange={(e) => setFormContractor(e.target.value)} placeholder="Nome da empresa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obra-budget">Orcamento</Label>
                  <Input id="obra-budget" value={formBudget} onChange={(e) => setFormBudget(e.target.value)} placeholder="S/ 0,00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obra-start">Data de inicio</Label>
                  <Input id="obra-start" type="date" value={formStartDate} onChange={(e) => setFormStartDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obra-end">Prazo previsto</Label>
                  <Input id="obra-end" type="date" value={formEndDate} onChange={(e) => setFormEndDate(e.target.value)} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="obra-category">Categoria</Label>
                  <Input id="obra-category" value={formCategory} onChange={(e) => setFormCategory(e.target.value)} placeholder="Infraestrutura, Saude, etc." />
                </div>
              </div>
            </TabsContent>
            {editingProject && (
              <TabsContent value="update" className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="upd-title">Titulo da atualizacao</Label>
                  <Input id="upd-title" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} placeholder="Resumo da atualizacao" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="upd-desc">Descricao</Label>
                  <Textarea id="upd-desc" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} placeholder="Detalhes da atualizacao..." rows={4} />
                </div>
              </TabsContent>
            )}
          </Tabs>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!formName.trim()}>
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Cidade:</span>
                    <p className="font-medium text-foreground">{selectedProject.city}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Regiao:</span>
                    <p className="font-medium text-foreground">{selectedProject.district}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <div className="mt-1">
                      <Badge className={cn("text-xs", statusColors[selectedProject.status])}>
                        {statusLabels[selectedProject.status]}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Progresso:</span>
                    <p className="font-medium text-foreground">{selectedProject.progress}%</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Empreiteira:</span>
                    <p className="font-medium text-foreground">{selectedProject.contractor}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Orcamento:</span>
                    <p className="font-medium text-foreground">{selectedProject.budget}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Inicio:</span>
                    <p className="font-medium text-foreground tabular-nums">{new Date(selectedProject.startDate).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Prazo:</span>
                    <p className="font-medium text-foreground tabular-nums">{new Date(selectedProject.expectedEndDate).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>

                {/* Milestones */}
                {selectedProject.milestones.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Marcos</h4>
                    <div className="space-y-2">
                      {selectedProject.milestones.map((m) => (
                        <div key={m.id} className="flex items-center gap-3 text-sm">
                          <div className={cn("h-2.5 w-2.5 rounded-full shrink-0", m.completed ? "bg-[hsl(150,50%,40%)]" : "bg-border")} />
                          <span className={cn("flex-1", m.completed ? "text-foreground" : "text-muted-foreground")}>{m.label}</span>
                          <span className="text-xs text-muted-foreground tabular-nums">{new Date(m.date).toLocaleDateString("pt-BR")}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent updates */}
                {selectedProject.updates.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Ultimas atualizacoes</h4>
                    <div className="space-y-3">
                      {selectedProject.updates.slice(0, 3).map((u) => (
                        <div key={u.id} className="border-l-2 border-primary/30 pl-3">
                          <p className="text-sm font-medium text-foreground">{u.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{u.author} - {new Date(u.date).toLocaleDateString("pt-BR")}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

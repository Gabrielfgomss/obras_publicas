"use client"

import { useMemo } from "react"
import {
  HardHat,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Users,
  TrendingUp,
  MapPin,
  CalendarClock,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { projects } from "@/lib/mock-data"
import { getDashboardStats } from "@/lib/admin-mock-data"
import { cn } from "@/lib/utils"

const PIE_COLORS = [
  "hsl(211, 60%, 35%)",
  "hsl(150, 50%, 40%)",
  "hsl(35, 85%, 50%)",
  "hsl(0, 65%, 48%)",
  "hsl(215, 10%, 46%)",
]

export default function AdminDashboardPage() {
  const stats = useMemo(() => getDashboardStats(projects), [])

  const updateDelayData = [
    { name: "5 dias", quantidade: stats.noUpdate5, fill: "hsl(35, 85%, 50%)" },
    { name: "10 dias", quantidade: stats.noUpdate10, fill: "hsl(25, 75%, 47%)" },
    { name: "15+ dias", quantidade: stats.noUpdate15, fill: "hsl(0, 65%, 48%)" },
  ]

  const ufData = Object.entries(stats.byUF).map(([uf, count]) => ({
    name: uf.replace("Region ", ""),
    quantidade: count,
  }))

  const progressData = [
    { name: "< 50%", value: stats.lessThan50.length },
    { name: ">= 50%", value: stats.moreThan50.length },
  ]

  const kpis = [
    {
      label: "Obras Ativas",
      value: stats.totalActive,
      icon: HardHat,
      color: "text-[hsl(211,60%,35%)]",
      bgColor: "bg-[hsl(211,60%,35%)]/10",
    },
    {
      label: "Concluidas",
      value: stats.totalCompleted,
      icon: CheckCircle2,
      color: "text-[hsl(150,50%,40%)]",
      bgColor: "bg-[hsl(150,50%,40%)]/10",
    },
    {
      label: "Atrasadas",
      value: stats.totalDelayed,
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      label: "Planejadas",
      value: stats.totalPlanned,
      icon: Clock,
      color: "text-[hsl(35,85%,50%)]",
      bgColor: "bg-[hsl(35,85%,50%)]/10",
    },
    {
      label: "Usuarios Ativos",
      value: stats.activeUsers,
      icon: Users,
      color: "text-[hsl(211,60%,50%)]",
      bgColor: "bg-[hsl(211,60%,50%)]/10",
    },
    {
      label: "Total de Obras",
      value: stats.totalProjects,
      icon: TrendingUp,
      color: "text-foreground",
      bgColor: "bg-muted",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Visao geral do sistema de acompanhamento de obras
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Card key={kpi.label} className="border border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center shrink-0", kpi.bgColor)}>
                    <Icon className={cn("h-5 w-5", kpi.color)} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground truncate">{kpi.label}</p>
                    <p className="text-xl font-semibold text-foreground tabular-nums">{kpi.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Update delay chart */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Obras sem Atualizacao
            </CardTitle>
            <p className="text-xs text-muted-foreground">Agrupadas por dias sem nova atualizacao</p>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={updateDelayData} barSize={48}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215, 10%, 46%)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(215, 10%, 46%)" }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 18%, 88%)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="quantidade" radius={[4, 4, 0, 0]}>
                    {updateDelayData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* By UF chart */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Obras por Regiao (UF)
            </CardTitle>
            <p className="text-xs text-muted-foreground">Distribuicao por regiao</p>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ufData} barSize={48}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215, 10%, 46%)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(215, 10%, 46%)" }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 18%, 88%)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="quantidade" fill="hsl(211, 60%, 35%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second row: progress + deadline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Progress pie */}
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Progresso das Obras Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    paddingAngle={4}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {progressData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Deadline approaching */}
        <Card className="border border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium text-foreground">
                Prazo Proximo do Vencimento
              </CardTitle>
            </div>
            <p className="text-xs text-muted-foreground">Obras com prazo encerrando em ate 60 dias</p>
          </CardHeader>
          <CardContent>
            {stats.deadlineApproaching.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                Nenhuma obra com prazo proximo.
              </p>
            ) : (
              <div className="space-y-3">
                {stats.deadlineApproaching.map((p) => {
                  const daysLeft = Math.floor(
                    (new Date(p.expectedEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  )
                  return (
                    <div
                      key={p.id}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span className="text-xs text-muted-foreground truncate">{p.city}</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "shrink-0 ml-2",
                          daysLeft <= 15
                            ? "border-destructive text-destructive"
                            : daysLeft <= 30
                              ? "border-[hsl(35,85%,50%)] text-[hsl(35,85%,50%)]"
                              : "border-muted-foreground text-muted-foreground"
                        )}
                      >
                        {daysLeft} dias restantes
                      </Badge>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent updates */}
      <Card className="border border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Ultimas Atualizacoes
          </CardTitle>
          <p className="text-xs text-muted-foreground">Atualizacoes mais recentes realizadas no sistema</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.recentUpdates.map((update) => (
              <div
                key={update.id}
                className="flex items-start gap-3 py-2.5 border-b border-border last:border-0"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <HardHat className="h-4 w-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{update.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{update.projectName}</p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                  {new Date(update.date).toLocaleDateString("pt-BR")}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

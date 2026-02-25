import { projects, type Project } from "./mock-data"

// ── User types ──
export type UserRole = "admin" | "gestor" | "fiscal" | "visualizador"
export type UserStatus = "ativo" | "inativo"

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
  lastLogin: string | null
}

export const roleLabels: Record<UserRole, string> = {
  admin: "Administrador",
  gestor: "Gestor",
  fiscal: "Fiscal",
  visualizador: "Visualizador",
}

export const statusUserLabels: Record<UserStatus, string> = {
  ativo: "Ativo",
  inativo: "Inativo",
}

export const mockUsers: AdminUser[] = [
  { id: "usr-001", name: "Maria Torres", email: "maria.torres@portal.gov", role: "admin", status: "ativo", createdAt: "2025-01-15", lastLogin: "2026-02-24" },
  { id: "usr-002", name: "Carlos Mendez", email: "carlos.mendez@portal.gov", role: "gestor", status: "ativo", createdAt: "2025-02-20", lastLogin: "2026-02-23" },
  { id: "usr-003", name: "Ana Gutierrez", email: "ana.gutierrez@portal.gov", role: "fiscal", status: "ativo", createdAt: "2025-03-10", lastLogin: "2026-02-22" },
  { id: "usr-004", name: "Pedro Alvarez", email: "pedro.alvarez@portal.gov", role: "gestor", status: "ativo", createdAt: "2025-04-05", lastLogin: "2026-02-20" },
  { id: "usr-005", name: "Rosa Huaman", email: "rosa.huaman@portal.gov", role: "fiscal", status: "inativo", createdAt: "2025-05-12", lastLogin: "2025-12-15" },
  { id: "usr-006", name: "Luis Vargas", email: "luis.vargas@portal.gov", role: "visualizador", status: "ativo", createdAt: "2025-06-01", lastLogin: "2026-02-18" },
  { id: "usr-007", name: "Jorge Castillo", email: "jorge.castillo@portal.gov", role: "gestor", status: "ativo", createdAt: "2025-07-08", lastLogin: "2026-02-21" },
  { id: "usr-008", name: "Fernando Ramos", email: "fernando.ramos@portal.gov", role: "fiscal", status: "ativo", createdAt: "2025-08-15", lastLogin: "2026-02-19" },
  { id: "usr-009", name: "Roberto Diaz", email: "roberto.diaz@portal.gov", role: "visualizador", status: "inativo", createdAt: "2025-09-20", lastLogin: "2025-11-10" },
  { id: "usr-010", name: "Isabella Costa", email: "isabella.costa@portal.gov", role: "admin", status: "ativo", createdAt: "2025-10-01", lastLogin: "2026-02-24" },
  { id: "usr-011", name: "Gabriel Santos", email: "gabriel.santos@portal.gov", role: "gestor", status: "ativo", createdAt: "2025-11-05", lastLogin: "2026-02-17" },
  { id: "usr-012", name: "Claudia Rivera", email: "claudia.rivera@portal.gov", role: "fiscal", status: "ativo", createdAt: "2025-12-10", lastLogin: "2026-02-16" },
]

// ── Profile / Permission types ──
export interface Permission {
  id: string
  key: string
  label: string
  module: string
}

export interface AdminProfile {
  id: string
  name: string
  description: string
  permissions: string[]
  usersCount: number
}

export const allPermissions: Permission[] = [
  { id: "perm-01", key: "dashboard.view", label: "Visualizar dashboard", module: "Dashboard" },
  { id: "perm-02", key: "obras.view", label: "Visualizar obras", module: "Obras" },
  { id: "perm-03", key: "obras.create", label: "Criar obras", module: "Obras" },
  { id: "perm-04", key: "obras.edit", label: "Editar obras", module: "Obras" },
  { id: "perm-05", key: "obras.delete", label: "Excluir obras", module: "Obras" },
  { id: "perm-06", key: "users.view", label: "Visualizar usuarios", module: "Usuarios" },
  { id: "perm-07", key: "users.create", label: "Criar usuarios", module: "Usuarios" },
  { id: "perm-08", key: "users.edit", label: "Editar usuarios", module: "Usuarios" },
  { id: "perm-09", key: "users.delete", label: "Excluir usuarios", module: "Usuarios" },
  { id: "perm-10", key: "profiles.manage", label: "Gerenciar perfis", module: "Perfis" },
  { id: "perm-11", key: "settings.manage", label: "Gerenciar configuracoes", module: "Configuracoes" },
]

export const mockProfiles: AdminProfile[] = [
  {
    id: "prof-01",
    name: "Administrador",
    description: "Acesso total ao sistema, incluindo gerenciamento de usuarios e configuracoes.",
    permissions: allPermissions.map((p) => p.key),
    usersCount: 2,
  },
  {
    id: "prof-02",
    name: "Gestor",
    description: "Gerenciamento completo de obras e visualizacao de dashboards.",
    permissions: ["dashboard.view", "obras.view", "obras.create", "obras.edit", "users.view"],
    usersCount: 4,
  },
  {
    id: "prof-03",
    name: "Fiscal",
    description: "Acompanhamento e atualizacao de obras em campo.",
    permissions: ["dashboard.view", "obras.view", "obras.edit"],
    usersCount: 4,
  },
  {
    id: "prof-04",
    name: "Visualizador",
    description: "Apenas visualizacao de dados publicos e dashboards.",
    permissions: ["dashboard.view", "obras.view"],
    usersCount: 2,
  },
]

// ── Dashboard computed stats ──
export function getDashboardStats(allProjects: Project[]) {
  const now = new Date()

  const activeProjects = allProjects.filter((p) => p.status === "in-progress")
  const completedProjects = allProjects.filter((p) => p.status === "completed")
  const delayedProjects = allProjects.filter((p) => p.status === "delayed")
  const plannedProjects = allProjects.filter((p) => p.status === "planned")

  const lessThan50 = activeProjects.filter((p) => p.progress < 50)
  const moreThan50 = activeProjects.filter((p) => p.progress >= 50)

  // Group by district (UF equivalent)
  const byUF: Record<string, number> = {}
  for (const p of allProjects) {
    byUF[p.district] = (byUF[p.district] || 0) + 1
  }

  // Days without update
  const daysSinceUpdate = (dateStr: string) => {
    const diff = now.getTime() - new Date(dateStr).getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24))
  }

  const noUpdate5 = allProjects.filter((p) => daysSinceUpdate(p.lastUpdate) >= 5 && daysSinceUpdate(p.lastUpdate) < 10)
  const noUpdate10 = allProjects.filter((p) => daysSinceUpdate(p.lastUpdate) >= 10 && daysSinceUpdate(p.lastUpdate) < 15)
  const noUpdate15 = allProjects.filter((p) => daysSinceUpdate(p.lastUpdate) >= 15)

  // Deadline approaching (within 60 days)
  const deadlineApproaching = allProjects.filter((p) => {
    if (p.status === "completed") return false
    const end = new Date(p.expectedEndDate)
    const daysLeft = Math.floor((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return daysLeft >= 0 && daysLeft <= 60
  })

  // Recent updates
  const recentUpdates = allProjects
    .flatMap((p) =>
      p.updates.map((u) => ({
        ...u,
        projectId: p.id,
        projectName: p.name,
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)

  const activeUsers = mockUsers.filter((u) => u.status === "ativo").length

  return {
    totalActive: activeProjects.length,
    totalCompleted: completedProjects.length,
    totalDelayed: delayedProjects.length,
    totalPlanned: plannedProjects.length,
    totalProjects: allProjects.length,
    lessThan50,
    moreThan50,
    byUF,
    noUpdate5: noUpdate5.length,
    noUpdate10: noUpdate10.length,
    noUpdate15: noUpdate15.length,
    deadlineApproaching,
    recentUpdates,
    activeUsers,
  }
}

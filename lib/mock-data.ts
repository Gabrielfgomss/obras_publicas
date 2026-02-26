export type ProjectStatus = "in-progress" | "completed" | "planned" | "delayed" | "on-hold"

export interface ProjectUpdate {
  id: string
  date: string
  title: string
  description: string
  imageUrl?: string
  author: string
}

export interface ProjectMilestone {
  id: string
  label: string
  date: string
  completed: boolean
}

export interface Project {
  id: string
  name: string
  location: string
  city: string
  district: string
  status: ProjectStatus
  progress: number
  lastUpdate: string
  lat: number
  lng: number
  contractor: string
  startDate: string
  expectedEndDate: string
  contractId: string
  budget: string
  category: string
  updates: ProjectUpdate[]
  milestones: ProjectMilestone[]
  galleryImages: string[]
  heroImage: string | null
}

export interface Region {
  id: string
  name: string
  cities: City[]
}

export interface City {
  id: string
  name: string
  lat: number
  lng: number
  zoom: number
}

export const regions: Region[] = [
  {
    id: "region-norte",
    name: "Region Norte",
    cities: [
      { id: "city-1", name: "San Miguel", lat: -12.077, lng: -77.084, zoom: 14 },
      { id: "city-2", name: "Los Olivos", lat: -11.955, lng: -77.066, zoom: 14 },
      { id: "city-3", name: "Independencia", lat: -11.995, lng: -77.052, zoom: 14 },
    ],
  },
  {
    id: "region-centro",
    name: "Region Centro",
    cities: [
      { id: "city-4", name: "Lima Centro", lat: -12.046, lng: -77.043, zoom: 14 },
      { id: "city-5", name: "La Victoria", lat: -12.068, lng: -77.018, zoom: 14 },
      { id: "city-6", name: "Rimac", lat: -12.025, lng: -77.035, zoom: 14 },
    ],
  },
  {
    id: "region-sur",
    name: "Region Sur",
    cities: [
      { id: "city-7", name: "Miraflores", lat: -12.121, lng: -77.037, zoom: 14 },
      { id: "city-8", name: "Surco", lat: -12.146, lng: -76.993, zoom: 14 },
      { id: "city-9", name: "San Borja", lat: -12.106, lng: -76.998, zoom: 14 },
    ],
  },
]

export const projects: Project[] = [
  {
    id: "proj-001",
    name: "Av. Principal Road Rehabilitation",
    location: "Av. Principal, Block 12-18",
    city: "San Miguel",
    district: "Region Norte",
    status: "in-progress",
    progress: 67,
    lastUpdate: "2026-02-08",
    lat: -12.078,
    lng: -77.086,
    contractor: "Constructora Nacional S.A.",
    startDate: "2025-06-15",
    expectedEndDate: "2026-08-30",
    contractId: "CP-2025-0142",
    budget: "S/ 2,450,000",
    category: "Road Infrastructure",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-001a", label: "Inicio da obra", date: "2025-06-15", completed: true },
      { id: "ms-001b", label: "Escavacao concluida", date: "2025-12-10", completed: true },
      { id: "ms-001c", label: "Drenagem instalada", date: "2026-01-22", completed: true },
      { id: "ms-001d", label: "Pavimentacao asfaltica", date: "2026-04-15", completed: false },
      { id: "ms-001e", label: "Sinalizacao e entrega", date: "2026-08-30", completed: false },
    ],
    updates: [
      {
        id: "upd-001a",
        date: "2026-02-08",
        title: "Asphalt layer completed on blocks 12-15",
        description: "The first layer of asphalt has been applied to blocks 12 through 15. Blocks 16-18 are scheduled for next week. Traffic diversion remains in effect on the south lane.",
        imageUrl: "/placeholder-road-1.jpg",
        author: "Eng. Maria Torres",
      },
      {
        id: "upd-001b",
        date: "2026-01-22",
        title: "Drainage installation completed",
        description: "Underground drainage system fully installed across all blocks. Pressure tests passed with satisfactory results. No water retention detected during recent rainfall.",
        imageUrl: "/placeholder-road-2.jpg",
        author: "Eng. Carlos Mendez",
      },
      {
        id: "upd-001c",
        date: "2025-12-10",
        title: "Excavation phase completed",
        description: "All excavation work completed on schedule. Soil samples met quality standards for road foundation. Temporary barriers installed for pedestrian safety.",
        author: "Eng. Maria Torres",
      },
      {
        id: "upd-001d",
        date: "2025-09-03",
        title: "Project commenced",
        description: "Official start of construction. Equipment mobilized to site. Community notification issued via municipal channels.",
        author: "Project Office",
      },
    ],
  },
  {
    id: "proj-002",
    name: "Municipal Water Treatment Plant Expansion",
    location: "Sector Industrial, Zone B",
    city: "San Miguel",
    district: "Region Norte",
    status: "in-progress",
    progress: 42,
    lastUpdate: "2026-02-05",
    lat: -12.074,
    lng: -77.081,
    contractor: "Hidro Ingenieria S.A.C.",
    startDate: "2025-09-01",
    expectedEndDate: "2027-03-15",
    contractId: "CP-2025-0198",
    budget: "S/ 8,900,000",
    category: "Water & Sanitation",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-002a", label: "Inicio da obra", date: "2025-09-01", completed: true },
      { id: "ms-002b", label: "Fundacao concluida", date: "2026-03-15", completed: false },
      { id: "ms-002c", label: "Instalacao de equipamentos", date: "2026-09-01", completed: false },
      { id: "ms-002d", label: "Testes operacionais", date: "2027-01-15", completed: false },
      { id: "ms-002e", label: "Entrega final", date: "2027-03-15", completed: false },
    ],
    updates: [
      {
        id: "upd-002a",
        date: "2026-02-05",
        title: "Foundation structure 80% complete",
        description: "Reinforced concrete foundation for the new treatment module is 80% complete. Steel reinforcement meets specification standards.",
        imageUrl: "/placeholder-water-1.jpg",
        author: "Eng. Pedro Alvarez",
      },
      {
        id: "upd-002b",
        date: "2026-01-15",
        title: "Environmental compliance review passed",
        description: "Monthly environmental compliance audit completed. All parameters within acceptable limits. Water discharge quality meets regulatory standards.",
        author: "Environmental Office",
      },
    ],
  },
  {
    id: "proj-003",
    name: "Community Health Center Construction",
    location: "Jr. Salud 450, Urbanizacion Los Jardines",
    city: "Los Olivos",
    district: "Region Norte",
    status: "planned",
    progress: 0,
    lastUpdate: "2026-01-28",
    lat: -11.958,
    lng: -77.063,
    contractor: "Edificaciones del Norte E.I.R.L.",
    startDate: "2026-04-01",
    expectedEndDate: "2027-06-30",
    contractId: "CP-2026-0015",
    budget: "S/ 5,200,000",
    category: "Healthcare",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-003a", label: "Aquisicao do terreno", date: "2026-01-28", completed: true },
      { id: "ms-003b", label: "Inicio da construcao", date: "2026-04-01", completed: false },
      { id: "ms-003c", label: "Estrutura concluida", date: "2027-01-15", completed: false },
      { id: "ms-003d", label: "Entrega final", date: "2027-06-30", completed: false },
    ],
    updates: [
      {
        id: "upd-003a",
        date: "2026-01-28",
        title: "Land acquisition finalized",
        description: "Municipal land transfer completed. Property boundaries officially registered. Geotechnical survey scheduled for March 2026.",
        author: "Legal Department",
      },
    ],
  },
  {
    id: "proj-004",
    name: "Public School Seismic Reinforcement",
    location: "I.E. Nacional 2045, Av. Educacion",
    city: "Los Olivos",
    district: "Region Norte",
    status: "completed",
    progress: 100,
    lastUpdate: "2026-01-10",
    lat: -11.952,
    lng: -77.069,
    contractor: "Reforzamiento Estructural Peru S.A.",
    startDate: "2025-03-10",
    expectedEndDate: "2025-12-31",
    contractId: "CP-2025-0078",
    budget: "S/ 1,800,000",
    category: "Education",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-004a", label: "Inicio do reforco", date: "2025-03-10", completed: true },
      { id: "ms-004b", label: "Reforco estrutural concluido", date: "2025-09-15", completed: true },
      { id: "ms-004c", label: "Acabamentos internos", date: "2025-12-15", completed: true },
      { id: "ms-004d", label: "Inspecao final aprovada", date: "2026-01-10", completed: true },
    ],
    updates: [
      {
        id: "upd-004a",
        date: "2026-01-10",
        title: "Final inspection approved",
        description: "Independent structural assessment confirmed compliance with current seismic codes. Building cleared for occupancy. Final documentation submitted to ministry.",
        imageUrl: "/placeholder-school-1.jpg",
        author: "Quality Assurance Office",
      },
      {
        id: "upd-004b",
        date: "2025-12-15",
        title: "Interior finishing completed",
        description: "All classrooms repainted. Electrical system upgraded. New emergency signage installed throughout the building.",
        author: "Eng. Rosa Huaman",
      },
    ],
  },
  {
    id: "proj-005",
    name: "Pedestrian Bridge over Av. Tupac Amaru",
    location: "Km 8.5, Av. Tupac Amaru",
    city: "Independencia",
    district: "Region Norte",
    status: "delayed",
    progress: 31,
    lastUpdate: "2026-02-01",
    lat: -11.998,
    lng: -77.055,
    contractor: "Puentes y Estructuras S.A.C.",
    startDate: "2025-07-01",
    expectedEndDate: "2026-03-31",
    contractId: "CP-2025-0156",
    budget: "S/ 3,100,000",
    category: "Transport Infrastructure",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-005a", label: "Inicio da obra", date: "2025-07-01", completed: true },
      { id: "ms-005b", label: "Colunas de fundacao", date: "2025-11-20", completed: true },
      { id: "ms-005c", label: "Estrutura metalica", date: "2026-02-15", completed: false },
      { id: "ms-005d", label: "Entrega prevista", date: "2026-03-31", completed: false },
    ],
    updates: [
      {
        id: "upd-005a",
        date: "2026-02-01",
        title: "Delay notification issued",
        description: "Construction delayed due to pending utility relocation by electricity provider. New timeline under review. Estimated 60-day delay.",
        author: "Project Management Unit",
      },
      {
        id: "upd-005b",
        date: "2025-11-20",
        title: "Foundation columns installed",
        description: "Two of four foundation columns successfully installed. Load-bearing tests passed inspection.",
        imageUrl: "/placeholder-bridge-1.jpg",
        author: "Eng. Luis Vargas",
      },
    ],
  },
  {
    id: "proj-006",
    name: "Plaza Mayor Renovation",
    location: "Plaza Mayor, Centro Historico",
    city: "Lima Centro",
    district: "Region Centro",
    status: "in-progress",
    progress: 85,
    lastUpdate: "2026-02-09",
    lat: -12.045,
    lng: -77.042,
    contractor: "Restauraciones Urbanas S.A.",
    startDate: "2025-04-15",
    expectedEndDate: "2026-04-15",
    contractId: "CP-2025-0089",
    budget: "S/ 4,600,000",
    category: "Public Spaces",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-006a", label: "Inicio da renovacao", date: "2025-04-15", completed: true },
      { id: "ms-006b", label: "Pavimentacao em pedra", date: "2026-01-25", completed: true },
      { id: "ms-006c", label: "Iluminacao instalada", date: "2026-03-15", completed: false },
      { id: "ms-006d", label: "Entrega final", date: "2026-04-15", completed: false },
    ],
    updates: [
      {
        id: "upd-006a",
        date: "2026-02-09",
        title: "Lighting system installation underway",
        description: "New energy-efficient LED lighting system being installed. 60% of fixtures in place. Heritage-compatible design approved by cultural preservation office.",
        imageUrl: "/placeholder-plaza-1.jpg",
        author: "Eng. Ana Gutierrez",
      },
      {
        id: "upd-006b",
        date: "2026-01-25",
        title: "Stone paving 95% complete",
        description: "Original stone pavers restored and reinstalled in main plaza area. New accessible pathways added connecting all entry points.",
        author: "Eng. Ana Gutierrez",
      },
    ],
  },
  {
    id: "proj-007",
    name: "Storm Drain System Upgrade",
    location: "Multiple streets, La Victoria district",
    city: "La Victoria",
    district: "Region Centro",
    status: "in-progress",
    progress: 55,
    lastUpdate: "2026-02-07",
    lat: -12.070,
    lng: -77.015,
    contractor: "Drenajes Metropolitanos S.A.",
    startDate: "2025-08-20",
    expectedEndDate: "2026-07-31",
    contractId: "CP-2025-0177",
    budget: "S/ 6,300,000",
    category: "Water & Sanitation",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-007a", label: "Inicio da fase 1", date: "2025-08-20", completed: true },
      { id: "ms-007b", label: "Fase 1 operacional", date: "2026-01-30", completed: true },
      { id: "ms-007c", label: "Inicio da fase 2", date: "2026-02-07", completed: true },
      { id: "ms-007d", label: "Entrega final", date: "2026-07-31", completed: false },
    ],
    updates: [
      {
        id: "upd-007a",
        date: "2026-02-07",
        title: "Phase 2 excavation started",
        description: "Excavation for second phase covering streets 8-15 has commenced. Phase 1 drains operational and performing as designed.",
        author: "Eng. Jorge Castillo",
      },
    ],
  },
  {
    id: "proj-008",
    name: "Rimac River Walkway",
    location: "Malecon Rimac, Sections 3-7",
    city: "Rimac",
    district: "Region Centro",
    status: "on-hold",
    progress: 18,
    lastUpdate: "2026-01-15",
    lat: -12.024,
    lng: -77.033,
    contractor: "Paisajismo Urbano S.A.C.",
    startDate: "2025-10-01",
    expectedEndDate: "2026-12-31",
    contractId: "CP-2025-0210",
    budget: "S/ 7,500,000",
    category: "Public Spaces",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-008a", label: "Inicio da obra", date: "2025-10-01", completed: true },
      { id: "ms-008b", label: "Obra suspensa", date: "2026-01-15", completed: false },
      { id: "ms-008c", label: "Retomada prevista", date: "2026-06-01", completed: false },
      { id: "ms-008d", label: "Entrega final", date: "2026-12-31", completed: false },
    ],
    updates: [
      {
        id: "upd-008a",
        date: "2026-01-15",
        title: "Project placed on hold",
        description: "Construction temporarily suspended pending resolution of land rights dispute in section 5. Legal proceedings expected to conclude by Q2 2026.",
        author: "Legal Department",
      },
    ],
  },
  {
    id: "proj-009",
    name: "Miraflores Bike Lane Network",
    location: "Av. Larco to Malecon Cisneros",
    city: "Miraflores",
    district: "Region Sur",
    status: "completed",
    progress: 100,
    lastUpdate: "2025-12-20",
    lat: -12.122,
    lng: -77.035,
    contractor: "Movilidad Verde S.A.",
    startDate: "2025-02-01",
    expectedEndDate: "2025-11-30",
    contractId: "CP-2025-0034",
    budget: "S/ 2,100,000",
    category: "Transport Infrastructure",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-009a", label: "Inicio da obra", date: "2025-02-01", completed: true },
      { id: "ms-009b", label: "Ciclovias concluidas", date: "2025-09-30", completed: true },
      { id: "ms-009c", label: "Sinalizacao instalada", date: "2025-11-15", completed: true },
      { id: "ms-009d", label: "Projeto concluido", date: "2025-12-20", completed: true },
    ],
    updates: [
      {
        id: "upd-009a",
        date: "2025-12-20",
        title: "Project completed and operational",
        description: "All 12km of bike lanes now operational. Signage, traffic calming measures, and bicycle parking stations fully installed. Safety audit completed.",
        imageUrl: "/placeholder-bike-1.jpg",
        author: "Project Completion Office",
      },
    ],
  },
  {
    id: "proj-010",
    name: "Surco Sports Complex",
    location: "Parque Zonal, Av. Los Constructores",
    city: "Surco",
    district: "Region Sur",
    status: "in-progress",
    progress: 38,
    lastUpdate: "2026-02-06",
    lat: -12.148,
    lng: -76.991,
    contractor: "Infraestructura Deportiva S.A.",
    startDate: "2025-11-01",
    expectedEndDate: "2027-02-28",
    contractId: "CP-2025-0245",
    budget: "S/ 12,400,000",
    category: "Sports & Recreation",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-010a", label: "Inicio da obra", date: "2025-11-01", completed: true },
      { id: "ms-010b", label: "Fundacoes concluidas", date: "2026-02-28", completed: false },
      { id: "ms-010c", label: "Estrutura metalica", date: "2026-08-15", completed: false },
      { id: "ms-010d", label: "Entrega final", date: "2027-02-28", completed: false },
    ],
    updates: [
      {
        id: "upd-010a",
        date: "2026-02-06",
        title: "Steel structure for main arena rising",
        description: "Structural steel framework for the main covered arena is 40% erected. Foundation work for the swimming pool complex has begun.",
        imageUrl: "/placeholder-sports-1.jpg",
        author: "Eng. Fernando Ramos",
      },
    ],
  },
  {
    id: "proj-011",
    name: "San Borja Cultural Center Extension",
    location: "Av. San Borja Sur 500",
    city: "San Borja",
    district: "Region Sur",
    status: "planned",
    progress: 0,
    lastUpdate: "2026-02-03",
    lat: -12.108,
    lng: -76.996,
    contractor: "To be assigned",
    startDate: "2026-06-01",
    expectedEndDate: "2027-12-31",
    contractId: "CP-2026-0028",
    budget: "S/ 9,800,000",
    category: "Culture & Education",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-011a", label: "Projeto arquitetonico aprovado", date: "2026-02-03", completed: true },
      { id: "ms-011b", label: "Selecao do empreiteiro", date: "2026-03-15", completed: false },
      { id: "ms-011c", label: "Inicio da construcao", date: "2026-06-01", completed: false },
      { id: "ms-011d", label: "Entrega final", date: "2027-12-31", completed: false },
    ],
    updates: [
      {
        id: "upd-011a",
        date: "2026-02-03",
        title: "Architectural design approved",
        description: "Final architectural plans approved by municipal planning committee. Public comment period concluded with no objections. Contractor selection process begins March 2026.",
        author: "Planning Department",
      },
    ],
  },
  {
    id: "proj-012",
    name: "Emergency Response Station",
    location: "Esquina Av. Colonial y Jr. Union",
    city: "Lima Centro",
    district: "Region Centro",
    status: "in-progress",
    progress: 72,
    lastUpdate: "2026-02-04",
    lat: -12.048,
    lng: -77.046,
    contractor: "Construcciones Institucionales S.A.",
    startDate: "2025-05-20",
    expectedEndDate: "2026-05-20",
    contractId: "CP-2025-0112",
    budget: "S/ 3,800,000",
    category: "Public Safety",
    heroImage: null,
    galleryImages: [],
    milestones: [
      { id: "ms-012a", label: "Inicio da obra", date: "2025-05-20", completed: true },
      { id: "ms-012b", label: "Estrutura concluida", date: "2025-11-30", completed: true },
      { id: "ms-012c", label: "Instalacoes internas", date: "2026-03-15", completed: false },
      { id: "ms-012d", label: "Entrega final", date: "2026-05-20", completed: false },
    ],
    updates: [
      {
        id: "upd-012a",
        date: "2026-02-04",
        title: "Interior systems installation phase",
        description: "Electrical, plumbing, and communication systems being installed. Building envelope fully sealed. Interior partition walls complete.",
        author: "Eng. Roberto Diaz",
      },
    ],
  },
]

export const statusLabels: Record<ProjectStatus, string> = {
  "in-progress": "Em andamento",
  completed: "Concluida",
  planned: "Planejada",
  delayed: "Atrasada",
  "on-hold": "Suspensa",
}

export const statusColors: Record<ProjectStatus, string> = {
  "in-progress": "bg-status-in-progress text-white",
  completed: "bg-status-completed text-white",
  planned: "bg-status-planned text-white",
  delayed: "bg-status-delayed text-white",
  "on-hold": "bg-status-on-hold text-white",
}

export const statusDotColors: Record<ProjectStatus, string> = {
  "in-progress": "bg-status-in-progress",
  completed: "bg-status-completed",
  planned: "bg-status-planned",
  delayed: "bg-status-delayed",
  "on-hold": "bg-status-on-hold",
}

export function getProjectsByCity(city: string): Project[] {
  return projects.filter((p) => p.city === city)
}

export function getProjectsByDistrict(district: string): Project[] {
  return projects.filter((p) => p.district === district)
}

export function getStatusCounts(projectList: Project[]): Record<ProjectStatus, number> {
  const counts: Record<ProjectStatus, number> = {
    "in-progress": 0,
    completed: 0,
    planned: 0,
    delayed: 0,
    "on-hold": 0,
  }
  for (const p of projectList) {
    counts[p.status]++
  }
  return counts
}

export function getRecentUpdates(projectList: Project[], limit = 5) {
  const allUpdates = projectList.flatMap((p) =>
    p.updates.map((u) => ({
      ...u,
      projectId: p.id,
      projectName: p.name,
      projectStatus: p.status,
    }))
  )
  allUpdates.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return allUpdates.slice(0, limit)
}

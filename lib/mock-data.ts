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
    name: "Reabilitação da Av. Principal",
    location: "Av. Principal, Quarteirão 12-18",
    city: "San Miguel",
    district: "Região Norte",
    status: "in-progress",
    progress: 67,
    lastUpdate: "2026-02-08",
    lat: -12.078,
    lng: -77.086,
    contractor: "Construtora Nacional S.A.",
    startDate: "2025-06-15",
    expectedEndDate: "2026-08-30",
    contractId: "CP-2025-0142",
    budget: "S/ 2.450.000",
    category: "Infraestrutura Rodoviária",
    heroImage: "https://images.pexels.com/photos/4575148/pexels-photo-4575148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/33484880/pexels-photo-33484880.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/2833686/pexels-photo-2833686.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/17843294/pexels-photo-17843294.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/18263701/pexels-photo-18263701.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-001a", label: "Início da obra", date: "2025-06-15", completed: true },
      { id: "ms-001b", label: "Escavação concluída", date: "2025-12-10", completed: true },
      { id: "ms-001c", label: "Drenagem instalada", date: "2026-01-22", completed: true },
      { id: "ms-001d", label: "Pavimentação asfáltica", date: "2026-04-15", completed: false },
      { id: "ms-001e", label: "Sinalização e entrega", date: "2026-08-30", completed: false },
    ],
    updates: [
      {
        id: "upd-001a",
        date: "2026-02-08",
        title: "Primeira camada de asfalto concluída nos quarteirões 12-15",
        description: "A primeira camada de asfalto foi aplicada nos quarteirões 12 a 15. Os quarteirões 16-18 estão programados para a próxima semana. O desvio de tráfego permanece em vigor na faixa sul.",
        imageUrl: "https://images.pexels.com/photos/4575148/pexels-photo-4575148.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
        author: "Eng. Maria Torres",
      },
      {
        id: "upd-001b",
        date: "2026-01-22",
        title: "Instalação de drenagem concluída",
        description: "Sistema de drenagem subterrânea completamente instalado em todos os quarteirões. Testes de pressão aprovados com resultados satisfatórios. Nenhuma retenção de água detectada durante chuva recente.",
        imageUrl: "https://images.pexels.com/photos/33484880/pexels-photo-33484880.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
        author: "Eng. Carlos Mendez",
      },
      {
        id: "upd-001c",
        date: "2025-12-10",
        title: "Fase de escavação concluída",
        description: "TodoTrabalho de escavação foi concluído conforme o cronograma. Amostras de solo atenderam aos padrões de qualidade para a fundação da estrada. Barreiras temporárias instaladas para segurança dos pedestres.",
        author: "Eng. Maria Torres",
      },
      {
        id: "upd-001d",
        date: "2025-09-03",
        title: "Projeto iniciado",
        description: "Início oficial da construção. Equipamento deslocado para o local. Notificação da comunidade emitida através de canais municipais.",
        author: "Escritório do Projeto",
      },
    ],
  },
  {
    id: "proj-002",
    name: "Expansão da Estação de Tratamento de Água Municipal",
    location: "Setor Industrial, Zona B",
    city: "San Miguel",
    district: "Região Norte",
    status: "in-progress",
    progress: 42,
    lastUpdate: "2026-02-05",
    lat: -12.074,
    lng: -77.081,
    contractor: "Hidro Engenharia S.A.C.",
    startDate: "2025-09-01",
    expectedEndDate: "2027-03-15",
    contractId: "CP-2025-0198",
    budget: "S/ 8.900.000",
    category: "Água e Saneamento",
    heroImage: "https://images.pexels.com/photos/4513940/pexels-photo-4513940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/2934280/pexels-photo-2934280.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/7108780/pexels-photo-7108780.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-002a", label: "Início da obra", date: "2025-09-01", completed: true },
      { id: "ms-002b", label: "Fundação concluída", date: "2026-03-15", completed: false },
      { id: "ms-002c", label: "Instalação de equipamentos", date: "2026-09-01", completed: false },
      { id: "ms-002d", label: "Testes operacionais", date: "2027-01-15", completed: false },
      { id: "ms-002e", label: "Entrega final", date: "2027-03-15", completed: false },
    ],
    updates: [
      {
        id: "upd-002a",
        date: "2026-02-05",
        title: "Estrutura de fundação 80% concluída",
        description: "Fundação de concreto armado para o novo módulo de tratamento está 80% completa. Reforço de aço atende aos padrões de especificação.",
        imageUrl: "https://images.pexels.com/photos/18355812/pexels-photo-18355812.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
        author: "Eng. Pedro Alvarez",
      },
      {
        id: "upd-002b",
        date: "2026-01-15",
        title: "Revisão de conformidade ambiental aprovada",
        description: "Auditoria de conformidade ambiental mensal concluída. Todos os parâmetros dentro dos limites aceitáveis. A qualidade do descarte de água atende aos padrões regulamentares.",
        author: "Divisão Ambiental",
      },
    ],
  },
  {
    id: "proj-003",
    name: "Construção do Centro de Saúde Comunitário",
    location: "Jr. Salud 450, Urbanização Los Jardines",
    city: "Los Olivos",
    district: "Região Norte",
    status: "planned",
    progress: 0,
    lastUpdate: "2026-01-28",
    lat: -11.958,
    lng: -77.063,
    contractor: "Edificações do Norte E.I.R.L.",
    startDate: "2026-04-01",
    expectedEndDate: "2027-06-30",
    contractId: "CP-2026-0015",
    budget: "S/ 5.200.000",
    category: "Saúde",
    heroImage: "https://images.pexels.com/photos/7108780/pexels-photo-7108780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/29174068/pexels-photo-29174068.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-003a", label: "Aquisição do terreno", date: "2026-01-28", completed: true },
      { id: "ms-003b", label: "Início da construção", date: "2026-04-01", completed: false },
      { id: "ms-003c", label: "Estrutura concluída", date: "2027-01-15", completed: false },
      { id: "ms-003d", label: "Entrega final", date: "2027-06-30", completed: false },
    ],
    updates: [
      {
        id: "upd-003a",
        date: "2026-01-28",
        title: "Aquisição de terreno finalizada",
        description: "Transferência de terreno municipal concluída. Limites da propriedade oficialmente registrados. Sondagem geotécnica programada para março de 2026.",
        author: "Departamento Jurídico",
      },
    ],
  },
  {
    id: "proj-004",
    name: "Reforço Sísmico de Escola Pública",
    location: "I.E. Nacional 2045, Av. Educação",
    city: "Los Olivos",
    district: "Região Norte",
    status: "completed",
    progress: 100,
    lastUpdate: "2026-01-10",
    lat: -11.952,
    lng: -77.069,
    contractor: "Reforço Estrutural Peru S.A.",
    startDate: "2025-03-10",
    expectedEndDate: "2025-12-31",
    contractId: "CP-2025-0078",
    budget: "S/ 1.800.000",
    category: "Educação",
    heroImage: "https://images.pexels.com/photos/18355812/pexels-photo-18355812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/4956909/pexels-photo-4956909.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/11580365/pexels-photo-11580365.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/13890649/pexels-photo-13890649.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-004a", label: "Início do reforço", date: "2025-03-10", completed: true },
      { id: "ms-004b", label: "Reforço estrutural concluído", date: "2025-09-15", completed: true },
      { id: "ms-004c", label: "Acabamentos internos", date: "2025-12-15", completed: true },
      { id: "ms-004d", label: "Inspeção final aprovada", date: "2026-01-10", completed: true },
    ],
    updates: [
      {
        id: "upd-004a",
        date: "2026-01-10",
        title: "Inspeção final aprovada",
        description: "Avaliação estrutural independente confirmou conformidade com os códigos sísmicos atuais. Edifício liberado para ocupação. Documentação final submetida ao ministério.",
        imageUrl: "https://images.pexels.com/photos/18355812/pexels-photo-18355812.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
        author: "Escritório de Garantia de Qualidade",
      },
      {
        id: "upd-004b",
        date: "2025-12-15",
        title: "Acabamentos internos concluídos",
        description: "Todas as salas de aula repintadas. Sistema elétrico atualizado. Nova sinalização de emergência instalada em todo o edifício.",
        author: "Eng. Rosa Huamán",
      },
    ],
  },
  {
    id: "proj-005",
    name: "Passarela de Pedestres sobre Av. Túpac Amaru",
    location: "Km 8.5, Av. Túpac Amaru",
    city: "Independência",
    district: "Região Norte",
    status: "delayed",
    progress: 31,
    lastUpdate: "2026-02-01",
    lat: -11.998,
    lng: -77.055,
    contractor: "Pontes e Estruturas S.A.C.",
    startDate: "2025-07-01",
    expectedEndDate: "2026-03-31",
    contractId: "CP-2025-0156",
    budget: "S/ 3.100.000",
    category: "Infraestrutura de Transporte",
    heroImage: "https://images.pexels.com/photos/11421402/pexels-photo-11421402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/8961159/pexels-photo-8961159.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/434659/pexels-photo-434659.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/2934280/pexels-photo-2934280.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-005a", label: "Início da obra", date: "2025-07-01", completed: true },
      { id: "ms-005b", label: "Colunas de fundação", date: "2025-11-20", completed: true },
      { id: "ms-005c", label: "Estrutura metálica", date: "2026-02-15", completed: false },
      { id: "ms-005d", label: "Entrega prevista", date: "2026-03-31", completed: false },
    ],
    updates: [
      {
        id: "upd-005a",
        date: "2026-02-01",
        title: "Notificação de atraso emitida",
        description: "Construção atrasada devido à recolocação de infraestrutura pendente pelo provedor de eletricidade. Novo cronograma em análise. Atraso estimado de 60 dias.",
        author: "Unidade de Gestão de Projeto",
      },
      {
        id: "upd-005b",
        date: "2025-11-20",
        title: "Colunas de fundação instaladas",
        description: "Duas de quatro colunas de fundação instaladas com sucesso. Testes de resistência à carga aprovados na inspeção.",
        imageUrl: "https://images.pexels.com/photos/8961159/pexels-photo-8961159.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
        author: "Eng. Luis Vargas",
      },
    ],
  },
  {
    id: "proj-006",
    name: "Renovação da Plaza Mayor",
    location: "Plaza Mayor, Centro Histórico",
    city: "Lima Centro",
    district: "Região Centro",
    status: "in-progress",
    progress: 85,
    lastUpdate: "2026-02-09",
    lat: -12.045,
    lng: -77.042,
    contractor: "Restaurações Urbanas S.A.",
    startDate: "2025-04-15",
    expectedEndDate: "2026-04-15",
    contractId: "CP-2025-0089",
    budget: "S/ 4.600.000",
    category: "Espaços Públicos",
    heroImage: "https://images.pexels.com/photos/6018652/pexels-photo-6018652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/18110372/pexels-photo-18110372.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/33484880/pexels-photo-33484880.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/4575148/pexels-photo-4575148.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-006a", label: "Início da renovação", date: "2025-04-15", completed: true },
      { id: "ms-006b", label: "Pavimentação em pedra", date: "2026-01-25", completed: true },
      { id: "ms-006c", label: "Iluminação instalada", date: "2026-03-15", completed: false },
      { id: "ms-006d", label: "Entrega final", date: "2026-04-15", completed: false },
    ],
    updates: [
      {
        id: "upd-006a",
        date: "2026-02-09",
        title: "Instalação do sistema de iluminação em andamento",
        description: "Novo sistema de iluminação LED de eficiência energética sendo instalado. 60% dos aparelhos no lugar. Design compatível com patrimônio aprovado pelo escritório de preservação cultural.",
        imageUrl: "https://images.pexels.com/photos/6018652/pexels-photo-6018652.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
        author: "Eng. Ana Gutierrez",
      },
      {
        id: "upd-006b",
        date: "2026-01-25",
        title: "Pavimentação em pedra 95% concluída",
        description: "Placas de pedra originais restauradas e reinstaladas na área da plaza principal. Novos caminhos acessíveis adicionados conectando todos os pontos de entrada.",
        author: "Eng. Ana Gutierrez",
      },
    ],
  },
  {
    id: "proj-007",
    name: "Atualização do Sistema de Drenagem de Tempestades",
    location: "Múltiplas ruas, distrito de La Victoria",
    city: "La Victoria",
    district: "Região Centro",
    status: "in-progress",
    progress: 55,
    lastUpdate: "2026-02-07",
    lat: -12.070,
    lng: -77.015,
    contractor: "Drenagens Metropolitanas S.A.",
    startDate: "2025-08-20",
    expectedEndDate: "2026-07-31",
    contractId: "CP-2025-0177",
    budget: "S/ 6.300.000",
    category: "Água e Saneamento",
    heroImage: "https://images.pexels.com/photos/2833686/pexels-photo-2833686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/17843294/pexels-photo-17843294.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/33484883/pexels-photo-33484883.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/18263701/pexels-photo-18263701.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-007a", label: "Início da fase 1", date: "2025-08-20", completed: true },
      { id: "ms-007b", label: "Fase 1 operacional", date: "2026-01-30", completed: true },
      { id: "ms-007c", label: "Início da fase 2", date: "2026-02-07", completed: true },
      { id: "ms-007d", label: "Entrega final", date: "2026-07-31", completed: false },
    ],
    updates: [
      {
        id: "upd-007a",
        date: "2026-02-07",
        title: "Escavação da Fase 2 iniciada",
        description: "Escavação para a segunda fase cobrindo ruas 8-15 foi iniciada. Drenos da Fase 1 operacionais e funcionando conforme projetado.",
        author: "Eng. Jorge Castillo",
      },
    ],
  },
  {
    id: "proj-008",
    name: "Caminho à Beira do Rio Rímac",
    location: "Malecón Rímac, Seções 3-7",
    city: "Rímac",
    district: "Região Centro",
    status: "on-hold",
    progress: 18,
    lastUpdate: "2026-01-15",
    lat: -12.024,
    lng: -77.033,
    contractor: "Paisagismo Urbano S.A.C.",
    startDate: "2025-10-01",
    expectedEndDate: "2026-12-31",
    contractId: "CP-2025-0210",
    budget: "S/ 7.500.000",
    category: "Espaços Públicos",
    heroImage: "https://images.pexels.com/photos/29174068/pexels-photo-29174068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/4513940/pexels-photo-4513940.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/19915446/pexels-photo-19915446.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-008a", label: "Início da obra", date: "2025-10-01", completed: true },
      { id: "ms-008b", label: "Obra suspensa", date: "2026-01-15", completed: false },
      { id: "ms-008c", label: "Retomada prevista", date: "2026-06-01", completed: false },
      { id: "ms-008d", label: "Entrega final", date: "2026-12-31", completed: false },
    ],
    updates: [
      {
        id: "upd-008a",
        date: "2026-01-15",
        title: "Projeto colocado em suspensão",
        description: "Construção temporariamente suspensa aguardando resolução de disputa de direitos de terra na seção 5. Procedimentos legais deverão ser concluídos até Q2 de 2026.",
        author: "Departamento Jurídico",
      },
    ],
  },
  {
    id: "proj-009",
    name: "Rede de Ciclovias de Miraflores",
    location: "Av. Larco até Malecón Cisneros",
    city: "Miraflores",
    district: "Região Sul",
    status: "completed",
    progress: 100,
    lastUpdate: "2025-12-20",
    lat: -12.122,
    lng: -77.035,
    contractor: "Mobilidade Verde S.A.",
    startDate: "2025-02-01",
    expectedEndDate: "2025-11-30",
    contractId: "CP-2025-0034",
    budget: "S/ 2.100.000",
    category: "Infraestrutura de Transporte",
    heroImage: "https://images.pexels.com/photos/18110372/pexels-photo-18110372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/4575148/pexels-photo-4575148.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/18263701/pexels-photo-18263701.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/33484883/pexels-photo-33484883.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-009a", label: "Início da obra", date: "2025-02-01", completed: true },
      { id: "ms-009b", label: "Ciclovias concluídas", date: "2025-09-30", completed: true },
      { id: "ms-009c", label: "Sinalização instalada", date: "2025-11-15", completed: true },
      { id: "ms-009d", label: "Projeto concluído", date: "2025-12-20", completed: true },
    ],
    updates: [
      {
        id: "upd-009a",
        date: "2025-12-20",
        title: "Projeto concluído e operacional",
        description: "Todos os 12km de ciclovias agora operacionais. Sinalização, medidas de acalmamento de tráfego e estações de estacionamento de bicicletas totalmente instaladas. Auditoria de segurança concluída.",
        imageUrl: "https://images.pexels.com/photos/18110372/pexels-photo-18110372.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
        author: "Escritório de Conclusão de Projeto",
      },
    ],
  },
  {
    id: "proj-010",
    name: "Complexo Esportivo de Surco",
    location: "Parque Zonal, Av. Los Constructores",
    city: "Surco",
    district: "Região Sul",
    status: "in-progress",
    progress: 38,
    lastUpdate: "2026-02-06",
    lat: -12.148,
    lng: -76.991,
    contractor: "Infraestrutura Esportiva S.A.",
    startDate: "2025-11-01",
    expectedEndDate: "2027-02-28",
    contractId: "CP-2025-0245",
    budget: "S/ 12.400.000",
    category: "Esportes e Recreação",
    heroImage: "https://images.pexels.com/photos/534220/pexels-photo-534220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/19915446/pexels-photo-19915446.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/4513940/pexels-photo-4513940.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/14169558/pexels-photo-14169558.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-010a", label: "Início da obra", date: "2025-11-01", completed: true },
      { id: "ms-010b", label: "Fundações concluídas", date: "2026-02-28", completed: false },
      { id: "ms-010c", label: "Estrutura metálica", date: "2026-08-15", completed: false },
      { id: "ms-010d", label: "Entrega final", date: "2027-02-28", completed: false },
    ],
    updates: [
      {
        id: "upd-010a",
        date: "2026-02-06",
        title: "Estrutura de aço para arena principal em construção",
        description: "Estrutura de aço estrutural para a arena coberta principal está 40% erguida. Trabalho de fundação para o complexo de piscinas foi iniciado.",
        imageUrl: "https://images.pexels.com/photos/14169558/pexels-photo-14169558.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&dpr=1",
        author: "Eng. Fernando Ramos",
      },
    ],
  },
  {
    id: "proj-011",
    name: "Extensão do Centro Cultural de San Borja",
    location: "Av. San Borja Sur 500",
    city: "San Borja",
    district: "Região Sul",
    status: "planned",
    progress: 0,
    lastUpdate: "2026-02-03",
    lat: -12.108,
    lng: -76.996,
    contractor: "A ser designado",
    startDate: "2026-06-01",
    expectedEndDate: "2027-12-31",
    contractId: "CP-2026-0028",
    budget: "S/ 9.800.000",
    category: "Cultura e Educação",
    heroImage: "https://images.pexels.com/photos/1463917/pexels-photo-1463917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/7108780/pexels-photo-7108780.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/4513940/pexels-photo-4513940.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-011a", label: "Projeto arquitetônico aprovado", date: "2026-02-03", completed: true },
      { id: "ms-011b", label: "Seleção do empreiteiro", date: "2026-03-15", completed: false },
      { id: "ms-011c", label: "Início da construção", date: "2026-06-01", completed: false },
      { id: "ms-011d", label: "Entrega final", date: "2027-12-31", completed: false },
    ],
    updates: [
      {
        id: "upd-011a",
        date: "2026-02-03",
        title: "Design arquitetônico aprovado",
        description: "Planos arquitetônicos finais aprovados pelo comitê de planejamento municipal. Período de comentário público concluído sem objeções. Processo de seleção de empreiteiro começa em março de 2026.",
        author: "Departamento de Planejamento",
      },
    ],
  },
  {
    id: "proj-012",
    name: "Estação de Resposta de Emergência",
    location: "Esquina Av. Colonial e Jr. União",
    city: "Lima Centro",
    district: "Região Centro",
    status: "in-progress",
    progress: 72,
    lastUpdate: "2026-02-04",
    lat: -12.048,
    lng: -77.046,
    contractor: "Construções Institucionais S.A.",
    startDate: "2025-05-20",
    expectedEndDate: "2026-05-20",
    contractId: "CP-2025-0112",
    budget: "S/ 3.800.000",
    category: "Segurança Pública",
    heroImage: "https://images.pexels.com/photos/13890649/pexels-photo-13890649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    galleryImages: [
      "https://images.pexels.com/photos/11580365/pexels-photo-11580365.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/10202865/pexels-photo-10202865.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
      "https://images.pexels.com/photos/4956909/pexels-photo-4956909.jpeg?auto=compress&cs=tinysrgb&w=640&h=640&dpr=1",
    ],
    milestones: [
      { id: "ms-012a", label: "Início da obra", date: "2025-05-20", completed: true },
      { id: "ms-012b", label: "Estrutura concluída", date: "2025-11-30", completed: true },
      { id: "ms-012c", label: "Instalações internas", date: "2026-03-15", completed: false },
      { id: "ms-012d", label: "Entrega final", date: "2026-05-20", completed: false },
    ],
    updates: [
      {
        id: "upd-012a",
        date: "2026-02-04",
        title: "Fase de instalação de sistemas internos",
        description: "Sistemas elétricos, hidráulicos e de comunicação sendo instalados. Envoltório do edifício totalmente selado. Paredes de divisão internas completas.",
        author: "Eng. Roberto Diaz",
      },
    ],
  },
]

export const statusLabels: Record<ProjectStatus, string> = {
  "in-progress": "Em andamento",
  completed: "Concluída",
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

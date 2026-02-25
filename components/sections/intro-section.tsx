import Link from "next/link"
import { MapPin, BarChart3, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const capabilities = [
  {
    icon: BarChart3,
    label: "Acompanhamento de progresso",
    description: "Visualize o percentual de execucao e o status atualizado de cada obra.",
  },
  {
    icon: Clock,
    label: "Atualizacoes recentes",
    description: "Consulte o historico de atualizacoes com datas, descricoes e evidencias.",
  },
  {
    icon: MapPin,
    label: "Localizacao geografica",
    description: "Encontre obras por regiao, cidade ou diretamente no mapa interativo.",
  },
]

export function IntroSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight tracking-tight text-balance mb-3">
            Acompanhe o andamento das obras publicas
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Este portal permite consultar informacoes sobre obras cadastradas no
            sistema, incluindo status de execucao, atualizacoes de campo e
            localizacao. Os dados sao publicados pelos responsaveis de cada obra.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {capabilities.map((item) => (
            <div
              key={item.label}
              className="bg-card border border-border rounded-md p-4 flex flex-col gap-2"
            >
              <div className="h-8 w-8 rounded-md bg-primary/5 border border-primary/10 flex items-center justify-center">
                <item.icon className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-sm font-medium text-foreground">{item.label}</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <Link href="/explore">
          <Button variant="outline" size="sm" className="text-xs gap-1.5 bg-transparent">
            Explorar todas as obras
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </section>
  )
}

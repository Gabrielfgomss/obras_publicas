import Link from "next/link";
import { MapPin, BarChart3, Clock, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const capabilities = [
  {
    icon: BarChart3,
    label: "Acompanhamento de progresso",
    description:
      "Visualize o percentual de execucao e o status atualizado de cada obra publica em tempo real.",
  },
  {
    icon: Clock,
    label: "Historico de atualizacoes",
    description:
      "Consulte o registro cronologico de atualizacoes com datas, descricoes e evidencias fotograficas.",
  },
  {
    icon: MapPin,
    label: "Mapa interativo",
    description:
      "Encontre obras por regiao, cidade ou diretamente no mapa com marcadores por status.",
  },
];

export function IntroSection() {
  return (
    <section className="relative">
      {/* Hero block with institutional pattern */}
      <div className="hero-pattern text-primary-foreground py-16 md:py-24">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/15">
                <Shield className="h-3 w-3" />
                Portal Oficial de Transparencia
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-balance mb-5">
              Acompanhe o andamento das obras publicas
            </h1>

            <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mb-8">
              Consulte informacoes sobre obras cadastradas no sistema, incluindo
              status de execucao, atualizacoes de campo e localizacao. Os dados
              sao publicados pelos orgaos responsaveis de cada projeto.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/explore">
                <Button
                  size="lg"
                  className="text-sm gap-2 bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20"
                >
                  Explorar obras no mapa
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/#contato">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
                >
                  Fale conosco
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Capabilities cards - overlapping the hero */}
      <div className="max-w-[1320px] mx-auto px-6 -mt-8 relative z-10">
        <div className="grid sm:grid-cols-3 gap-4">
          {capabilities.map((item, index) => (
            <div
              key={item.label}
              className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="h-10 w-10 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center mb-3">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-sm font-semibold text-foreground mb-1.5">
                {item.label}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

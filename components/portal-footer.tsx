import Link from "next/link"
import { Building2 } from "lucide-react"

const footerLinks = {
  navegacao: [
    { label: "Inicio", href: "/" },
    { label: "Explorar obras", href: "/explore" },
    { label: "Contato", href: "/#contato" },
  ],
  institucional: [
    { label: "Termos de Uso", href: "#" },
    { label: "Politica de Privacidade", href: "#" },
    { label: "Acessibilidade", href: "#" },
  ],
  contato: [
    { label: "contato@portaldeobras.gov.br", href: "mailto:contato@portaldeobras.gov.br" },
    { label: "Central de Ajuda", href: "#" },
  ],
}

export function PortalFooter() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-md bg-primary-foreground/10 flex items-center justify-center">
                <Building2 className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold tracking-tight">
                Portal de Obras
              </span>
            </Link>
            <p className="text-xs text-primary-foreground/50 leading-relaxed max-w-[240px]">
              Portal publico para consulta e acompanhamento
              do andamento de obras cadastradas no sistema.
            </p>
          </div>

          {/* Navegacao */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40">
              Navegacao
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Links de navegacao">
              {footerLinks.navegacao.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Institucional */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40">
              Institucional
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Links institucionais">
              {footerLinks.institucional.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contato */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/40">
              Contato
            </h3>
            <nav className="flex flex-col gap-2" aria-label="Informacoes de contato">
              {footerLinks.contato.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors break-all rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/30"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/30">
            {`\u00A9 ${new Date().getFullYear()} Portal de Obras. Dados exibidos sao de responsabilidade dos cadastrantes.`}
          </p>
          <p className="text-xs text-primary-foreground/20">
            Portal publico de consulta
          </p>
        </div>
      </div>
    </footer>
  )
}

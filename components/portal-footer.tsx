import Link from "next/link";
import { Landmark, Shield, ExternalLink } from "lucide-react";

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
    { label: "Lei de Acesso a Informacao", href: "#" },
  ],
  contato: [
    {
      label: "contato@portaldeobras.gov.br",
      href: "mailto:contato@portaldeobras.gov.br",
    },
    { label: "Central de Ajuda", href: "#" },
  ],
};

export function PortalFooter() {
  return (
    <footer className="footer-institutional">
      {/* Top accent */}
      <div
        className="h-1 w-full"
        style={{
          background:
            "linear-gradient(90deg, hsl(213, 70%, 15%) 0%, hsl(192, 82%, 37%) 50%, hsl(43, 69%, 40%) 100%)",
        }}
      />

      <div className="max-w-[1320px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/10">
                <Landmark className="h-5 w-5 text-white/90" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-tight leading-tight">
                  Portal de Obras
                </span>
                <span className="text-[10px] text-white/40 leading-tight">
                  Transparencia em obras publicas
                </span>
              </div>
            </Link>
            <p className="text-xs text-white/40 leading-relaxed max-w-[260px]">
              Portal publico para consulta e acompanhamento do andamento de
              obras cadastradas no sistema. Os dados sao de responsabilidade dos
              orgaos cadastrantes.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-white/30 mt-1">
              <Shield className="h-3 w-3" />
              <span>Portal oficial certificado</span>
            </div>
          </div>

          {/* Navegacao */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
              Navegacao
            </h3>
            <nav
              className="flex flex-col gap-2.5"
              aria-label="Links de navegacao"
            >
              {footerLinks.navegacao.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Institucional */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
              Institucional
            </h3>
            <nav
              className="flex flex-col gap-2.5"
              aria-label="Links institucionais"
            >
              {footerLinks.institucional.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 inline-flex items-center gap-1"
                >
                  {link.label}
                  {link.href === "#" && (
                    <ExternalLink className="h-3 w-3 opacity-40" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contato */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
              Contato
            </h3>
            <nav
              className="flex flex-col gap-2.5"
              aria-label="Informacoes de contato"
            >
              {footerLinks.contato.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors break-all rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Institutional compliance */}
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-[10px] text-white/35 leading-relaxed">
                Este portal atende aos requisitos de transparencia publica
                previstos em lei. Dados abertos disponiveis mediante
                solicitacao.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            {`\u00A9 ${new Date().getFullYear()} Portal de Obras. Dados exibidos sao de responsabilidade dos cadastrantes.`}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-white/15">v1.0</span>
            <span className="text-[10px] text-white/15">|</span>
            <span className="text-[10px] text-white/15">
              Portal publico de consulta
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark, Menu, X, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/explore", label: "Explorar obras" },
  { href: "/#contato", label: "Contato" },
];

export function PortalHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Institutional accent stripe */}
      <div className="institutional-stripe" aria-hidden="true" />

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-200",
          scrolled ? "bg-card/95 backdrop-blur-md shadow-sm" : "bg-card",
        )}
        style={{ borderBottom: "1px solid hsl(214, 20%, 88%)" }}
      >
        <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Landmark className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground tracking-tight leading-tight">
                Portal de Obras
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">
                Transparencia em obras publicas
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Navegacao principal"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm rounded-lg transition-colors relative",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive(link.href)
                    ? "text-accent font-semibold bg-accent/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <span className="badge-institutional">
              <Shield className="h-3 w-3" />
              Portal Oficial
            </span>
            <Link
              href="/admin"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-muted/60"
            >
              Area administrativa
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="md:hidden bg-card shadow-lg"
            style={{ borderBottom: "1px solid hsl(214, 20%, 88%)" }}
          >
            <nav
              className="flex flex-col px-6 py-4 gap-1"
              aria-label="Navegacao mobile"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 text-sm rounded-lg transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive(link.href)
                      ? "text-accent font-semibold bg-accent/5"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-border flex items-center justify-between">
                <Link
                  href="/admin"
                  className="block px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Area administrativa
                </Link>
                <span className="badge-institutional">
                  <Shield className="h-3 w-3" />
                  Portal Oficial
                </span>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

"use client"

import { Bell, Menu, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AdminTopbarProps {
  collapsed: boolean
  onMobileMenuToggle: () => void
}

export function AdminTopbar({ collapsed, onMobileMenuToggle }: AdminTopbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 h-14 bg-card border-b border-border flex items-center justify-between px-6 transition-all duration-300",
        collapsed ? "md:ml-[68px]" : "md:ml-[250px]"
      )}
    >
      {/* Mobile menu toggle */}
      <button
        type="button"
        className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={onMobileMenuToggle}
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Breadcrumb area */}
      <div className="hidden md:block">
        <span className="text-sm text-muted-foreground">Area Administrativa</span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          <span className="sr-only">Notificacoes</span>
        </Button>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <User className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-none">Admin</p>
            <p className="text-xs text-muted-foreground">admin@portal.gov</p>
          </div>
        </div>
      </div>
    </header>
  )
}

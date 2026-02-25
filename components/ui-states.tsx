"use client"

import { AlertCircle, FolderOpen, WifiOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  title: string
  description: string
  className?: string
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <FolderOpen className="h-10 w-10 text-muted-foreground/50 mb-4" />
      <h3 className="text-sm font-medium text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">{description}</p>
    </div>
  )
}

interface ErrorStateProps {
  title?: string
  description?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "Nao foi possivel carregar os dados",
  description = "Ocorreu um erro inesperado ao buscar os dados. Pode ser um problema temporario.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <AlertCircle className="h-10 w-10 text-destructive/60 mb-4" />
      <h3 className="text-sm font-medium text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground max-w-xs leading-relaxed mb-4">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  )
}

interface ConnectionErrorProps {
  className?: string
}

export function ConnectionError({ className }: ConnectionErrorProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <WifiOff className="h-10 w-10 text-muted-foreground/50 mb-4" />
      <h3 className="text-sm font-medium text-foreground mb-1">Problema de conexao</h3>
      <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
        Nao foi possivel conectar ao servidor. Verifique sua conexao com a internet e tente novamente.
      </p>
    </div>
  )
}

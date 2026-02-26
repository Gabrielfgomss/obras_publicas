"use client";

import { AlertCircle, FolderOpen, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  className?: string;
}

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className,
      )}
    >
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <FolderOpen className="h-5 w-5 text-muted-foreground/60" />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1.5">{title}</h3>
      <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
        {description}
      </p>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Nao foi possivel carregar os dados",
  description = "Ocorreu um erro inesperado ao buscar os dados. Pode ser um problema temporario.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className,
      )}
    >
      <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="h-5 w-5 text-destructive" />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1.5">{title}</h3>
      <p className="text-xs text-muted-foreground max-w-xs leading-relaxed mb-4">
        {description}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="text-xs"
        >
          Tentar novamente
        </Button>
      )}
    </div>
  );
}

interface ConnectionErrorProps {
  className?: string;
}

export function ConnectionError({ className }: ConnectionErrorProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className,
      )}
    >
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <WifiOff className="h-5 w-5 text-muted-foreground/60" />
      </div>
      <h3 className="text-sm font-semibold text-foreground mb-1.5">
        Problema de conexao
      </h3>
      <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
        Nao foi possivel conectar ao servidor. Verifique sua conexao com a
        internet e tente novamente.
      </p>
    </div>
  );
}

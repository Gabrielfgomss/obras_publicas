"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle2 } from "lucide-react"

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contato" className="py-16 md:py-20 bg-card border-t border-border scroll-mt-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: context */}
          <div className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight text-balance">
              Contato
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Para duvidas sobre os dados exibidos, informacoes institucionais
              ou questoes tecnicas sobre o portal, utilize o formulario ao lado.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-md mt-2">
              Informacoes especificas sobre uma obra devem ser direcionadas ao
              orgao responsavel indicado na pagina de detalhes da respectiva obra.
            </p>
          </div>

          {/* Right: form */}
          <div className="bg-background rounded-md border border-border p-5">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CheckCircle2 className="h-8 w-8 text-status-completed mb-3" />
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  Mensagem enviada
                </h3>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Recebemos sua mensagem e responderemos assim que possivel.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-5 text-xs bg-transparent"
                  onClick={() => setSubmitted(false)}
                >
                  Enviar outra mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-name" className="text-xs font-medium">
                      Nome
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="Seu nome"
                      required
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="contact-email" className="text-xs font-medium">
                      E-mail
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="h-9 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-message" className="text-xs font-medium">
                    Mensagem
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Descreva sua duvida ou solicitacao..."
                    rows={4}
                    required
                    className="text-sm resize-none"
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto text-sm gap-2">
                  <Send className="h-4 w-4" />
                  Enviar mensagem
                </Button>

                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Seus dados serao utilizados exclusivamente para responder
                  a esta solicitacao, conforme nossa politica de privacidade.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

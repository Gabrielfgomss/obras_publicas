"use client";

import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2, Mail, Phone, MapPin } from "lucide-react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contato"
      className="section-institutional py-16 md:py-20 scroll-mt-16"
    >
      <div className="max-w-[1320px] mx-auto px-6 pt-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left: context */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight text-balance">
              Entre em contato
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Para duvidas sobre os dados exibidos, informacoes institucionais
              ou questoes tecnicas sobre o portal, utilize o formulario ao lado.
            </p>

            <div className="flex flex-col gap-3 mt-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-9 w-9 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <span>contato@portaldeobras.gov.br</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-9 w-9 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <span>(11) 3000-0000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="h-9 w-9 rounded-lg bg-accent/8 border border-accent/15 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <span>Sede administrativa - Centro</span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-md mt-3 p-3 bg-card rounded-lg border border-border">
              Informacoes especificas sobre uma obra devem ser direcionadas ao
              orgao responsavel indicado na pagina de detalhes da respectiva
              obra.
            </p>
          </div>

          {/* Right: form */}
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-12 w-12 rounded-full bg-status-completed/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-6 w-6 text-status-completed" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Mensagem enviada
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Recebemos sua mensagem e responderemos assim que possivel.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6 text-xs"
                  onClick={() => setSubmitted(false)}
                >
                  Enviar outra mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="contact-name"
                      className="text-xs font-semibold"
                    >
                      Nome
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="Seu nome"
                      required
                      className="h-10 text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="contact-email"
                      className="text-xs font-semibold"
                    >
                      E-mail
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="h-10 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="contact-message"
                    className="text-xs font-semibold"
                  >
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

                <Button
                  type="submit"
                  className="w-full sm:w-auto text-sm gap-2 bg-accent hover:bg-accent/90"
                >
                  <Send className="h-4 w-4" />
                  Enviar mensagem
                </Button>

                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Seus dados serao utilizados exclusivamente para responder a
                  esta solicitacao, conforme nossa politica de privacidade.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

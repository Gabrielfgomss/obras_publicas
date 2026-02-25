"use client"

import { useState } from "react"
import { Save, Building2, Bell, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export default function ConfiguracoesPage() {
  // General settings
  const [orgName, setOrgName] = useState("Portal de Obras Municipal")
  const [orgEmail, setOrgEmail] = useState("contato@portal.gov")
  const [orgPhone, setOrgPhone] = useState("(11) 3000-0000")
  const [orgDescription, setOrgDescription] = useState(
    "Sistema de acompanhamento de obras publicas municipais."
  )

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [updateAlerts, setUpdateAlerts] = useState(true)
  const [deadlineAlerts, setDeadlineAlerts] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(false)

  // Limits
  const [maxUsersPerProfile, setMaxUsersPerProfile] = useState("50")
  const [updateFrequency, setUpdateFrequency] = useState("7")
  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [defaultLanguage, setDefaultLanguage] = useState("pt-BR")

  // Security
  const [twoFactor, setTwoFactor] = useState(false)
  const [passwordExpiry, setPasswordExpiry] = useState("90")
  const [minPasswordLength, setMinPasswordLength] = useState("8")

  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Configuracoes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Parametros gerais do sistema
          </p>
        </div>
        <Button onClick={handleSave} className="shrink-0">
          <Save className="h-4 w-4 mr-2" />
          {saved ? "Salvo com sucesso" : "Salvar alteracoes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Institutional */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">Dados Institucionais</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Informacoes da organizacao exibidas no portal publico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="org-name">Nome da organizacao</Label>
              <Input id="org-name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-email">E-mail de contato</Label>
              <Input id="org-email" type="email" value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-phone">Telefone</Label>
              <Input id="org-phone" value={orgPhone} onChange={(e) => setOrgPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="org-desc">Descricao</Label>
              <Textarea id="org-desc" value={orgDescription} onChange={(e) => setOrgDescription(e.target.value)} rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">Notificacoes</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Configure alertas e notificacoes do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Notificacoes por e-mail</p>
                <p className="text-xs text-muted-foreground">Receber resumos por e-mail</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Alertas de atualizacao</p>
                <p className="text-xs text-muted-foreground">Notificar quando obras forem atualizadas</p>
              </div>
              <Switch checked={updateAlerts} onCheckedChange={setUpdateAlerts} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Alertas de prazo</p>
                <p className="text-xs text-muted-foreground">Notificar quando prazos estiverem proximos</p>
              </div>
              <Switch checked={deadlineAlerts} onCheckedChange={setDeadlineAlerts} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Relatorio semanal</p>
                <p className="text-xs text-muted-foreground">Enviar resumo semanal automatico</p>
              </div>
              <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
            </div>
          </CardContent>
        </Card>

        {/* Limits & Parameters */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">Parametros e Limites</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Defina limites operacionais do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max-users">Max. usuarios por perfil</Label>
                <Input id="max-users" type="number" value={maxUsersPerProfile} onChange={(e) => setMaxUsersPerProfile(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="update-freq">Freq. atualizacao (dias)</Label>
                <Input id="update-freq" type="number" value={updateFrequency} onChange={(e) => setUpdateFrequency(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Timeout de sessao (min)</Label>
                <Input id="session-timeout" type="number" value={sessionTimeout} onChange={(e) => setSessionTimeout(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Idioma padrao</Label>
                <Select value={defaultLanguage} onValueChange={setDefaultLanguage}>
                  <SelectTrigger id="language"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Portugues (BR)</SelectItem>
                    <SelectItem value="es">Espanhol</SelectItem>
                    <SelectItem value="en">Ingles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm">Seguranca</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Configuracoes de seguranca e autenticacao
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Autenticacao em dois fatores</p>
                <p className="text-xs text-muted-foreground">Exigir 2FA para todos os usuarios</p>
              </div>
              <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pwd-expiry">Expiracao de senha (dias)</Label>
                <Input id="pwd-expiry" type="number" value={passwordExpiry} onChange={(e) => setPasswordExpiry(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pwd-length">Tamanho minimo de senha</Label>
                <Input id="pwd-length" type="number" value={minPasswordLength} onChange={(e) => setMinPasswordLength(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

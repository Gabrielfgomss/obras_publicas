"use client"

import { useState } from "react"
import { Plus, Edit2, ShieldCheck, Users, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  mockProfiles,
  allPermissions,
  type AdminProfile,
} from "@/lib/admin-mock-data"
import { cn } from "@/lib/utils"

export default function PerfisPage() {
  const [profiles, setProfiles] = useState<AdminProfile[]>(mockProfiles)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProfile, setEditingProfile] = useState<AdminProfile | null>(null)

  // Form
  const [formName, setFormName] = useState("")
  const [formDescription, setFormDescription] = useState("")
  const [formPermissions, setFormPermissions] = useState<string[]>([])

  function openCreateDialog() {
    setEditingProfile(null)
    setFormName("")
    setFormDescription("")
    setFormPermissions([])
    setDialogOpen(true)
  }

  function openEditDialog(profile: AdminProfile) {
    setEditingProfile(profile)
    setFormName(profile.name)
    setFormDescription(profile.description)
    setFormPermissions([...profile.permissions])
    setDialogOpen(true)
  }

  function togglePermission(key: string) {
    setFormPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    )
  }

  function handleSave() {
    if (editingProfile) {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === editingProfile.id
            ? { ...p, name: formName, description: formDescription, permissions: formPermissions }
            : p
        )
      )
    } else {
      const newProfile: AdminProfile = {
        id: `prof-${Date.now()}`,
        name: formName,
        description: formDescription,
        permissions: formPermissions,
        usersCount: 0,
      }
      setProfiles((prev) => [...prev, newProfile])
    }
    setDialogOpen(false)
  }

  // Group permissions by module
  const permissionsByModule = allPermissions.reduce(
    (acc, perm) => {
      if (!acc[perm.module]) acc[perm.module] = []
      acc[perm.module].push(perm)
      return acc
    },
    {} as Record<string, typeof allPermissions>
  )

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Perfis e Permissoes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gerencie os perfis de acesso e suas permissoes (RBAC)
          </p>
        </div>
        <Button onClick={openCreateDialog} className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Novo perfil
        </Button>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((profile) => (
          <Card key={profile.id} className="border border-border">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{profile.name}</CardTitle>
                    <CardDescription className="text-xs mt-0.5">{profile.description}</CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openEditDialog(profile)}
                  aria-label={`Editar perfil ${profile.name}`}
                >
                  <Edit2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5" />
                  <span>{profile.usersCount} usuarios vinculados</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {profile.permissions.length} permissoes
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {profile.permissions.slice(0, 6).map((permKey) => {
                  const perm = allPermissions.find((p) => p.key === permKey)
                  return (
                    <Badge key={permKey} variant="outline" className="text-[10px] font-normal">
                      {perm?.label || permKey}
                    </Badge>
                  )
                })}
                {profile.permissions.length > 6 && (
                  <Badge variant="outline" className="text-[10px] font-normal text-muted-foreground">
                    +{profile.permissions.length - 6} mais
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProfile ? "Editar perfil" : "Criar novo perfil"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="profile-name">Nome do perfil</Label>
              <Input
                id="profile-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Gerente de Obras"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-desc">Descricao</Label>
              <Textarea
                id="profile-desc"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Descreva o papel deste perfil..."
                rows={3}
              />
            </div>

            {/* Permissions grouped by module */}
            <div className="space-y-4">
              <Label>Permissoes</Label>
              {Object.entries(permissionsByModule).map(([module, perms]) => (
                <div key={module} className="border border-border rounded-md p-3">
                  <p className="text-xs font-medium text-foreground mb-2 uppercase tracking-wide">{module}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {perms.map((perm) => (
                      <label
                        key={perm.id}
                        className="flex items-center gap-2 cursor-pointer py-1"
                      >
                        <Checkbox
                          checked={formPermissions.includes(perm.key)}
                          onCheckedChange={() => togglePermission(perm.key)}
                        />
                        <span className="text-sm text-foreground">{perm.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={!formName.trim()}>
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { regions } from "@/lib/mock-data"

interface LocationSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function LocationSelector({ value, onChange }: LocationSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="location-selector" className="text-xs text-muted-foreground font-medium whitespace-nowrap">
        Localizacao
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="location-selector" className="w-52 h-8 text-xs bg-card">
          <SelectValue placeholder="Todas as localidades" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as localidades</SelectItem>
          {regions.map((region) => (
            <SelectGroup key={region.id}>
              <SelectLabel className="text-xs">{region.name}</SelectLabel>
              {region.cities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

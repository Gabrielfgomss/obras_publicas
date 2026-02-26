"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { regions } from "@/lib/mock-data";
import { MapPin } from "lucide-react";

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function LocationSelector({ value, onChange }: LocationSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="location-selector"
        className="text-xs text-muted-foreground font-semibold whitespace-nowrap flex items-center gap-1"
      >
        <MapPin className="h-3 w-3" />
        Local
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          id="location-selector"
          className="w-52 h-9 text-xs bg-card"
        >
          <SelectValue placeholder="Todas as localidades" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as localidades</SelectItem>
          {regions.map((region) => (
            <SelectGroup key={region.id}>
              <SelectLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {region.name}
              </SelectLabel>
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
  );
}

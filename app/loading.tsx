import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header skeleton */}
      <div className="h-14 border-b border-border bg-card flex items-center px-6 shrink-0">
        <Skeleton className="h-5 w-32" />
        <div className="flex items-center gap-2 ml-8">
          <Skeleton className="h-7 w-20 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-md" />
        </div>
      </div>

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col gap-4">
          {/* Filter bar skeleton */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* KPI skeleton */}
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={`kpi-${i}`} className="bg-card border border-border rounded-md p-4">
                <Skeleton className="h-3 w-20 mb-2" />
                <Skeleton className="h-7 w-12" />
              </div>
            ))}
          </div>

          {/* Map + sidebar skeleton */}
          <div className="flex gap-4" style={{ minHeight: "520px" }}>
            <Skeleton className="flex-1 rounded-md" />
            <div className="w-80 shrink-0 flex flex-col gap-4">
              <Skeleton className="h-64 rounded-md" />
              <Skeleton className="flex-1 rounded-md" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

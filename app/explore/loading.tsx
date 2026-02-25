import { Skeleton } from "@/components/ui/skeleton"

export default function ExploreLoading() {
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

      {/* Filter bar skeleton */}
      <div className="border-b border-border bg-card px-6 py-2.5 flex items-center gap-4 shrink-0">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-8 w-56 ml-auto" />
      </div>

      {/* Map + list skeleton */}
      <div className="flex-1 flex overflow-hidden">
        <Skeleton className="flex-1" />
        <div className="w-96 shrink-0 border-l border-border bg-card p-3 flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={`card-${i}`} className="h-28 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  )
}

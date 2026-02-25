import { Skeleton } from "@/components/ui/skeleton"

export default function ProjectDetailLoading() {
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
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          {/* Breadcrumb skeleton */}
          <Skeleton className="h-4 w-32 mb-4" />

          {/* Header card skeleton */}
          <div className="bg-card border border-border rounded-md p-5 mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Skeleton className="h-5 w-80 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-7 w-24 rounded" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="flex-1 h-2 rounded-full" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>

          {/* Two column skeleton */}
          <div className="flex gap-4">
            <div className="flex-1 min-w-0">
              <div className="bg-card border border-border rounded-md">
                <div className="px-5 py-3.5 border-b border-border">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-64" />
                </div>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={`update-${i}`} className="px-5 py-4 border-b border-border last:border-b-0">
                    <Skeleton className="h-3 w-24 mb-2" />
                    <Skeleton className="h-4 w-72 mb-2" />
                    <Skeleton className="h-3 w-full mb-1" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-80 shrink-0">
              <Skeleton className="h-96 rounded-md" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

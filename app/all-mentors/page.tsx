import { Suspense } from "react"
import  MentorsList  from "@/components/mentors-list"
import { MentorFilters } from "@/components/mentor-filters"
import { Skeleton } from "@/components/ui/skeleton"

export default async function MentorsPage({
  searchParams,
}: {
  searchParams:Promise< { [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams;
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Mentor</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <MentorFilters />
        </div>

        <div className="lg:col-span-3">
          <Suspense fallback={<MentorsListSkeleton />}>
            <MentorsList searchParams={params} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function MentorsListSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col md:flex-row gap-4 p-6 border rounded-lg">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
          <div className="space-y-2 w-32">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
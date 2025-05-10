import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <Skeleton className="h-8 w-48 bg-[#333333]" />
          <Skeleton className="h-4 w-32 mt-2 bg-[#333333]" />
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Skeleton className="h-10 w-32 bg-[#333333]" />
          <Skeleton className="h-10 w-32 bg-[#333333]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-[#1A1A1A] border-[#333333]">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-32 bg-[#333333]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 bg-[#333333]" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-32 bg-[#333333]" />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <Skeleton className="h-6 w-40 bg-[#333333]" />
            <Skeleton className="h-4 w-32 mt-1 bg-[#333333]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start">
                  <Skeleton className="h-5 w-5 mr-3 bg-[#333333]" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-full bg-[#333333]" />
                    <div className="flex justify-between mt-1">
                      <Skeleton className="h-4 w-24 bg-[#333333]" />
                      <Skeleton className="h-4 w-16 bg-[#333333]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A1A] border-[#333333]">
          <CardHeader>
            <Skeleton className="h-6 w-32 bg-[#333333]" />
            <Skeleton className="h-4 w-40 mt-1 bg-[#333333]" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-full bg-[#333333]" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

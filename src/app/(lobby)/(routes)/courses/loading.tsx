import CourseCardSkeleton from '@/components/skeleton/course-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsLoading() {
  return (
    <div className="container px-8 md:px-16 py-4 mt-[64px] lg:mt-[80px] w-full">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-64 border border-input" />
        <Skeleton className="h-10 w-52 border border-input" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CourseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

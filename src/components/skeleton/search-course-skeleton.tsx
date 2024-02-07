import { Skeleton } from '../ui/skeleton';

const SearchCourseSkeleton = () => {
  return (
    <div className="flex gap-2 py-2">
      <Skeleton className="object-cover h-[50px] w-[100px] aspect-video overflow-hidden" />
      <div className="w-full">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
};

export default SearchCourseSkeleton;

import { AspectRatio } from '../ui/aspect-ratio';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const CourseCardSkeleton = () => {
  return (
    <Card className="rounded-md overflow-hidden h-full">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <Skeleton className="w-full h-full aspect-video object-cover" />
        </AspectRatio>
      </CardHeader>
      <hr />
      <CardContent className="grid gap-2.5 p-4">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-2 w-1/4" />
        <Skeleton className="h-3 w-1/4" />
      </CardContent>
    </Card>
  );
};

export default CourseCardSkeleton;

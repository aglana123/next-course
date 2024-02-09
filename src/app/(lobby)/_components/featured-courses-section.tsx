import FeaturedCourses from './featured-courses';
import { Suspense } from 'react';
import CoursesCardSkeleton from '@/components/skeleton/courses-card-skeleton';

const FeaturedCoursesSection = () => {
  return (
    <div className="flex flex-col items-center max-w-screen-xl px-4 mx-auto h-full">
      <div className="mb-8 max-w-sm text-center">
        <h2 className="font-bold text-3xl md:text-4xl text-primary mb-2">
          Courses Section
        </h2>
        <p>Browse through the course categories that catch your eye.</p>
      </div>
      <Suspense fallback={<CoursesCardSkeleton />}>
        <FeaturedCourses />
      </Suspense>
    </div>
  );
};

export default FeaturedCoursesSection;

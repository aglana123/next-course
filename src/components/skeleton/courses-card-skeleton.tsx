import CourseCardSkeleton from './course-card-skeleton';

const CoursesCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-stretch w-full">
      {Array.from({ length: 8 }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default CoursesCardSkeleton;

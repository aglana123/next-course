import SearchCourseSkeleton from './search-course-skeleton';

const SearchCoursesSkeleton = ({
  skeletonCount = 6
}: {
  skeletonCount?: number;
}) => {
  return (
    <>
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <SearchCourseSkeleton key={i} />
      ))}
    </>
  );
};

export default SearchCoursesSkeleton;

'use client';

import searchFilterCourses from '@/actions/search-filter-courses';
import CourseCard from '@/components/cards/course-card';
import { CoursePageParams } from '@/types/course-page';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import CoursesCardSkeleton from './skeleton/courses-card-skeleton';

const CoursesSection: FC<CoursePageParams> = ({ searchParams }) => {
  const {
    data: courses,
    isLoading,
    error
  } = useQuery({
    queryKey: ['courses', searchParams],
    queryFn: async () => {
      const data = await searchFilterCourses(searchParams);
      return data;
    }
  });

  if (isLoading) {
    return <CoursesCardSkeleton />;
  }
  if (error) {
    return <h1>Error</h1>;
  }
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 place-items-stretch">
      {courses?.map((course) => (
        <CourseCard
          slug={course.slug}
          key={course.id}
          title={course.title}
          desc={course.description!}
          src={course.imageUrl!}
          teacher={course.author.name}
          course_access={course.public_access}
        />
      ))}
    </section>
  );
};

export default CoursesSection;

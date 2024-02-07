'use client';

import searchFilterCourses from '@/actions/search-filter-courses';
import SortPopUp from './SortPopUp';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { CoursePageParams } from '@/types/course-page';

const SearchResultMenu: FC<CoursePageParams> = ({ searchParams }) => {
  const {
    data: courses,
    isLoading,
    error
  } = useQuery({
    queryKey: ['courses', searchParams],
    queryFn: async () => await searchFilterCourses(searchParams)
  });
  return (
    <div className="flex justify-between items-center mb-4">
      <p className="font-medium">
        <strong>{courses?.length || 0} Courses</strong> Found for{' '}
        {`"${searchParams.q || ''}"`}
      </p>
      <SortPopUp />
    </div>
  );
};

export default SearchResultMenu;

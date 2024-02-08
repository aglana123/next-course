import ContainerCourses from './_components/ContainerCourses';
import CoursesSection from '@/components/courses-section';
import { FC } from 'react';
import { CoursePageParams } from '@/types/course-page';
import searchFilterCourses from '@/actions/search-filter-courses';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary
} from '@tanstack/react-query';
import SearchResultMenu from './_components/search-result-menu';

const CoursesPage: FC<CoursePageParams> = async ({ searchParams }) => {
  const { q, category } = searchParams;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['courses', { q, category }],
    queryFn: async () => {
      const data = await searchFilterCourses(searchParams);
      return data;
    }
  });
  console.log(queryClient);
  const dehydratedState = dehydrate(queryClient);
  return (
    <ContainerCourses>
      <HydrationBoundary state={dehydratedState}>
        <SearchResultMenu searchParams={searchParams} />
        <CoursesSection searchParams={searchParams} />
      </HydrationBoundary>
    </ContainerCourses>
  );
};

export default CoursesPage;

import ContainerCourses from './_components/ContainerCourses';
import CoursesSection from '@/components/CoursesSection';
import { FC, Suspense } from 'react';
import { CoursePageParams } from '@/types/course-page';
import SortPopUp from './_components/SortPopUp';
import searchFilterCourses from '@/actions/search-filter-courses';
import {
  QueryClient,
  dehydrate,
  HydrationBoundary
} from '@tanstack/react-query';
import CoursesCardSkeleton from '@/components/skeleton/courses-card-skeleton';
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

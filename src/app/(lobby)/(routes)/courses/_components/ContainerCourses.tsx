'use client';

import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';
import SearchFilter from './SearchFilter';
import FilterSidebar from './filter-sidebar';
import { useContainerFilter } from '@/hooks/use-container-filter';
import { categoriesAsset } from '@/asset/categories';

type ContainerCoursesprops = {
  children: ReactNode;
};

const ContainerCourses: FC<ContainerCoursesprops> = ({ children }) => {
  const { isOpen } = useContainerFilter();

  return (
    <div
      className={cn(
        'w-full h-full',
        isOpen && 'max-lg:h-screen max-lg:overflow-hidden'
      )}
    >
      <div className="container px-8 md:px-16 py-4 mt-[64px] lg:mt-[80px] w-full">
        <FilterSidebar>
          <SearchFilter categories={categoriesAsset} />
        </FilterSidebar>
        {children}
      </div>
    </div>
  );
};

export default ContainerCourses;

'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { FC, ReactNode, useState } from 'react';
import SearchFilter from './SearchFilter';
import { Category } from '@prisma/client';
import FilterSidebar from './filter-sidebar';
import { useContainerFilter } from '@/hooks/use-container-filter';

type ContainerCoursesprops = {
  children: ReactNode;
  categories: Category[];
};

const ContainerCourses: FC<ContainerCoursesprops> = ({
  children,
  categories
}) => {
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
          <SearchFilter categories={categories} />
        </FilterSidebar>
        {children}
      </div>
    </div>
  );
};

export default ContainerCourses;

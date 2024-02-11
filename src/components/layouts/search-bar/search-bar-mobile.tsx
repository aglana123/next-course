'use client';

import { SearchIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import searchCourses, { SearchResults } from '@/actions/search-courses';
import { useEffect, useState, useTransition } from 'react';
import { useDebounce } from 'use-debounce';
import SearchCoursesList from './search-courses-list';
import { useRouter } from 'next/navigation';
import SearchCoursesSkeleton from '@/components/skeleton/search-courses-skeleton';

const SearchBarMobile = () => {
  const [term, setTerm] = useState('');
  const router = useRouter();
  const [value] = useDebounce(term, 1000);
  const [data, setData] = useState<SearchResults | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (term) {
        const url = `/courses?q=${term}`;
        setTerm('');
        setIsOpen(false);
        router.push(url);
      }
    }
  };

  useEffect(() => {
    setData(null);
    if (value.length <= 0) {
      setData(null);
      return;
    }
    const fetchingItems = async () => {
      try {
        const response = await searchCourses({ slug: value });
        setData(response);
      } catch (error) {
        console.log('[SEARCH_COURSES]', error);
      }
    };
    startTransition(fetchingItems);
  }, [value]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(() => e.target.value);
  };

  const isDataEmpty = data && data?.length <= 0 ? true : false;
  return (
    <Sheet
      onOpenChange={() => {
        setIsOpen((current) => !current);
      }}
      open={isOpen}
    >
      <SheetTrigger className="h-fit w-fit lg:hidden" asChild>
        <Button variant="outline" className="h-fit w-fit p-2">
          <span className="sr-only">search bar pop-up button</span>
          <SearchIcon className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={'bottom'}
        className="w-full min-h-dvh h-full overflow-auto py-14 lg:hidden "
      >
        <div className="flex w-full items-center ring-1 ring-input hover:ring-primary focus-within:ring-primary rounded-md">
          <Input
            onKeyDown={handleOnKeyDown}
            onChange={handleOnChange}
            value={term}
            placeholder="Cari kursus disini..."
            className="border-none bg-transparent"
          />
          <SearchIcon className="text-black/40 h-6 w-6 cursor-pointer px-4" />
        </div>

        <div className="w-full min-h-24 h-fit flex flex-col mt-4">
          {isPending ? (
            <SearchCoursesSkeleton skeletonCount={4} />
          ) : (
            <>
              {!isDataEmpty ? (
                data?.map((course) => (
                  <SearchCoursesList
                    key={course.id}
                    category_name={course.category?.name!}
                    course_slug={course.slug}
                    title={course.title}
                    url={course.imageUrl!}
                  />
                ))
              ) : (
                <h3 className="self-center">
                  Courses not found. Please try different keywords.{' '}
                </h3>
              )}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBarMobile;

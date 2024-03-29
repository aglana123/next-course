'use client';

import { SearchIcon } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import searchCourses, { SearchResults } from '@/actions/search-courses';
import { cn } from '@/lib/utils';
import SearchCoursesList from './search-courses-list';
import SearchCoursesSkeleton from '@/components/skeleton/search-courses-skeleton';

const SearchBarDesktop = () => {
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
    <div className="w-full relative">
      <div
        onFocusCapture={() => {
          setIsOpen(true);
        }}
        className="flex relative w-full items-center ring-1 ring-input bg-slate-50 hover:ring-primary focus-within:ring-primary pl-2 pr-4 rounded-3xl z-50"
      >
        <Input
          onKeyDown={handleOnKeyDown}
          onChange={handleOnChange}
          value={term}
          placeholder="Cari kursus disini..."
          className="border-none bg-transparent"
        />
        <SearchIcon className="text-black/40 h-6 w-6 cursor-pointer" />
        {isOpen && term?.length ? (
          isPending ? (
            <div className="w-full max-h-[400px] h-fit overflow-auto bg-white shadow-md shadow-black/30 border border-input absolute top-[60px] right-0 flex flex-col py-4 px-4">
              <SearchCoursesSkeleton skeletonCount={4} />
            </div>
          ) : (
            <div className="w-full max-h-[400px] h-fit overflow-auto bg-white shadow-md shadow-black/30 border border-input absolute top-[60px] right-0 flex flex-col py-4 px-4">
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
            </div>
          )
        ) : null}
      </div>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className={cn(
          'bg-transparent w-full h-screen fixed top-0 right-0 ',
          !isOpen && 'hidden'
        )}
      />
    </div>
  );
};

export default SearchBarDesktop;

'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const SortPopUp = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedSort = searchParams.get('sort');
  const handleOnChange = (value: string) => {
    const url = new URLSearchParams(searchParams);
    if (value === selectedSort) {
      url.delete('sort');
      const searchQuery = url.toString();
      return router.push(`${pathname}/?${searchQuery}`);
    }
    url.set('sort', value);
    const searchQuery = url.toString();

    router.push(`${pathname}/?${searchQuery}`);
  };

  return (
    <Select defaultValue="relevance" onValueChange={handleOnChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="relevance">Relevance</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortPopUp;

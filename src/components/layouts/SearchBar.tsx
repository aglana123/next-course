'use client';

import { SearchIcon } from 'lucide-react';
import { useDebounce } from 'use-debounce';
import { useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import searchCourses, { SearchResults } from '@/actions/search-courses';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const SearchBar = () => {
	const [term, setTerm] = useState('');
	const router = useRouter();
	const [value] = useDebounce(term, 1000);
	const [data, setData] = useState<SearchResults | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isPending, startTransition] = useTransition();
	const [isOpen, setIsOpen] = useState(false);

	console.log(data);

	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (e.currentTarget.value) {
				const url = `/courses?q=${term}`;
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
				console.log(error);
			}
		};
		fetchingItems();
	}, [value]);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTerm(() => e.target.value);
	};

	return (
		<div className="w-full relative">
			<div
				onFocusCapture={() => {
					setIsOpen(true);
				}}
				className="flex relative w-full items-center ring-1 ring-input bg-slate-50  hover:ring-primary focus-within:ring-primary pl-2 pr-4 rounded-3xl z-50 ">
				<Input
					onKeyDown={handleOnKeyDown}
					onChange={handleOnChange}
					value={term}
					placeholder="Cari kursus disini..."
					className="border-none bg-transparent"
				/>
				<SearchIcon className="text-black/40 h-6 w-6 cursor-pointer" />
				{isOpen && (
					<div className="w-full h-[300px] bg-red-500 absolute top-[60px] right-0 flex flex-col">
						{data?.searchCourses?.map((course) => (
							<div
								className="text-black text-xl "
								key={course.id}>
								<h2>{course.title}</h2>
							</div>
						))}
					</div>
				)}
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

export default SearchBar;

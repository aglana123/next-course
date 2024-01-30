'use client';

import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
	const [term, setTerm] = useState('');
	const router = useRouter();

	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (e.currentTarget.value) {
				const url = `/courses?q=${term}`;
				router.push(url);
			}
		}
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTerm(() => e.target.value);
	};
	return (
		<div className="flex w-full items-center ring-1 ring-input bg-slate-50  hover:ring-primary focus-within:ring-primary pl-2 pr-4 rounded-3xl select-none">
			<Input
				onKeyDown={handleOnKeyDown}
				onChange={handleOnChange}
				value={term}
				placeholder="Cari kursus disini..."
				className="border-none bg-transparent"
			/>
			<SearchIcon className="text-black/40 h-6 w-6 cursor-pointer" />
		</div>
	);
};

export default SearchBar;

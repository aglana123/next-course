import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import CategoriesPopUp from './CategoriesPopUp';
import { Button } from '../ui/button';

const SearchBar = () => {
	return (
		<div className="w-full hidden lg:flex gap-4 xl:mx-4">
			<CategoriesPopUp />
			<div className="flex w-full items-center ring-1 ring-input bg-slate-50  hover:ring-primary focus-within:ring-primary pl-2 pr-4 rounded-3xl select-none">
				<Input
					placeholder="Search courses here..."
					className="border-none bg-transparent"
				/>
				<SearchIcon className="text-black/40 h-6 w-6 cursor-pointer" />
			</div>
		</div>
	);
};

export default SearchBar;

'use client';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import db from '@/lib/db';
import { Circle } from 'lucide-react';
import Link from 'next/link';

const CategoriesPopUp = () => {
	return (
		<Popover>
			<PopoverTrigger>
				<span className="text-primary font-medium">Categories</span>
			</PopoverTrigger>
			<PopoverContent
				align="start"
				sideOffset={15}
				hideWhenDetached={true}
				className="flex flex-col w-[245px]">
				{/* {courseCategories.map((category) => (
					<Link
						href={''}
						key={category.slug}>
						<div className="group flex items-center gap-2 hover:text-primary h-full py-2">
							<Circle className="group-hover:fill-primary stroke-none w-3 h-3" />
							{category.name}
						</div>
					</Link>
				))} */}
			</PopoverContent>
		</Popover>
	);
};

export default CategoriesPopUp;

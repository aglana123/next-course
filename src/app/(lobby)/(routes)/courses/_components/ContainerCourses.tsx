'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { FC, ReactNode, useState } from 'react';
import SearchFilter from './SearchFilter';
import { Category } from '@prisma/client';
import FilterSidebar from './filter-sidebar';

type ContainerCoursesprops = {
	children: ReactNode;
	categories: Category[];
};

const ContainerCourses: FC<ContainerCoursesprops> = ({
	children,
	categories,
}) => {
	const [showFilter, setShowFilter] = useState(false);

	function setFilter() {
		setShowFilter((current) => !current);
	}

	return (
		<div
			className={cn(
				'w-full h-full',
				showFilter && 'max-lg:h-screen max-lg:overflow-hidden'
			)}>
			<div className="container px-8 md:px-16 py-4 mt-[64px] lg:mt-[80px] w-full">
				<FilterSidebar
					showFilter={showFilter}
					overlay={
						<div
							onClick={setFilter}
							className={cn(
								'w-full h-full bg-transparent top-0 z-[5] max-lg:hidden',
								!showFilter && 'hidden'
							)}
						/>
					}>
					{/* Main Open-close sheet filter */}
					<Button
						onClick={() => {
							setShowFilter((current) => !current);
						}}
						className="rounded-s w-20 shadow shadow-black/40 font-semibold absolute -right-20 top-16">
						FILTER
					</Button>
					{/* close sheet filter mobile */}
					<Button
						onClick={() => {
							setShowFilter((current) => !current);
						}}
						variant="ghost"
						className={cn(
							'lg:hidden absolute w-fit h-fit rounded-full top-2 right-4 p-2',
							!showFilter && 'hidden'
						)}>
						<X />
					</Button>
					<SearchFilter categories={categories} />
				</FilterSidebar>

				{children}
			</div>
		</div>
	);
};

export default ContainerCourses;

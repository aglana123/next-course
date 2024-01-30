'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { FC, ReactNode, useState } from 'react';
import SearchFilter from './SearchFilter';
import { Category } from '@prisma/client';

type ContainerProducts = {
	children: ReactNode;
	categories: Category[];
};

const ContainerProducts: FC<ContainerProducts> = ({ children, categories }) => {
	const [showFilter, setShowFilter] = useState(false);

	return (
		<div
			className={cn(
				'w-full h-full',
				showFilter && 'max-lg:h-screen max-lg:overflow-hidden'
			)}>
			<div className="container px-8 md:px-16 py-4 mt-[64px] lg:mt-[80px] w-full">
				<div
					className={cn(
						'fixed flex w-fit h-full top-0 bg-transparent left-0 z-[1]',
						showFilter && 'w-full'
					)}>
					<div
						className={cn(
							'apply-animation left-0 top-0 w-full lg:w-[300px] min-h-dvh mt-[64px] lg:mt-[80px] fixed bg-white -translate-x-full z-10',
							showFilter && 'translate-x-0'
						)}>
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
					</div>
					{/* Outside close Sheet */}
					<div
						onClick={() => {
							setShowFilter((current) => !current);
						}}
						className={cn(
							'w-full h-full bg-transparent top-0 z-[5] max-lg:hidden',
							!showFilter && 'hidden'
						)}
					/>
				</div>
				{children}
			</div>
		</div>
	);
};

export default ContainerProducts;

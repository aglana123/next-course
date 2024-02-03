import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const FilterSidebar = ({
	showFilter,
	children,
	overlay,
}: {
	showFilter: boolean;
	children: ReactNode;
	overlay: ReactNode;
}) => {
	return (
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
				{children}
			</div>
			{overlay}
		</div>
	);
};

export default FilterSidebar;

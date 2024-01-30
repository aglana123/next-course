import { FC, MouseEventHandler, ReactNode } from 'react';

type FilterListProps = {
	slug: string;
	children: ReactNode;
	onClick: MouseEventHandler<HTMLDivElement>;
};

const FilterList: FC<FilterListProps> = ({ slug, children, onClick }) => {
	return (
		<div
			className="px-4 py-2 hover:text-primary flex items-center gap-2 cursor-pointer select-none"
			key={slug}
			onClick={onClick}>
			<span className="sr-only">filter {slug} button</span>
			{children}
		</div>
	);
};

export default FilterList;

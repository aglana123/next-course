'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

const UserMenuList = ({
	title,
	icon: Icon,
	href,
}: {
	title: string;
	icon: LucideIcon;
	href: string;
}) => {
	return (
		<Link href={href}>
			<div className="flex items-center gap-2 py-2 px-4 hover:text-primary">
				{<Icon className="h-4 w-4" />}
				{title}
			</div>
		</Link>
	);
};

export default UserMenuList;

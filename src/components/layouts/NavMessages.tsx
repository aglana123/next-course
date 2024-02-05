'use client';

import useWishlist from '@/hooks/use-wishlist';
import { MessageCircle } from 'lucide-react';

const NavMessages = () => {
	const { items } = useWishlist();
	return (
		<div className="relative">
			<MessageCircle className="fill-primary stroke-none" />
			<div className="absolute h-4 w-4 flex items-center justify-center top-0 -right-1 rounded-full bg-destructive text-white text-[10px] p-2 font-medium">
				{items?.length || 0}
			</div>
		</div>
	);
};

export default NavMessages;

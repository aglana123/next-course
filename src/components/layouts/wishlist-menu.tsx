'use client';

import useWishlist from '@/hooks/use-wishlist';

import { Heart } from 'lucide-react';
import Link from 'next/link';

const WishlistMenu = () => {
  const { items } = useWishlist();

  const hasItems = Boolean(items.length);
  return (
    <Link href={'/user/wishlist'} className="relative max-lg:hidden">
      <span className="sr-only">wishlist link button</span>
      <Heart className="stroke-rose-500" />
      {hasItems && (
        <div className="absolute h-5 w-5 flex items-center justify-center -top-1 -right-3 rounded-full bg-primary text-white text-xs p-2 font-medium">
          {items.length}
        </div>
      )}
    </Link>
  );
};

export default WishlistMenu;

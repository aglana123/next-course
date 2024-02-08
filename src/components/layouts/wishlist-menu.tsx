'use client';

import useWishlist from '@/hooks/use-wishlist';

import { Heart } from 'lucide-react';

const WishlistMenu = () => {
  const { items } = useWishlist();

  const hasItems = Boolean(items.length);
  return (
    <div className="relative max-lg:hidden">
      <Heart className="fill-rose-500  stroke-rose-500" />
      {hasItems && (
        <div className="absolute h-5 w-5 flex items-center justify-center -top-1 -right-2 rounded-full bg-primary text-white text-xs p-2 font-medium">
          {items.length}
        </div>
      )}
    </div>
  );
};

export default WishlistMenu;

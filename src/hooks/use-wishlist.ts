import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

import { Course } from '@prisma/client';

interface WishlistStore {
	items: Course[];
	addItem: (data: Course) => void;
	removeItem: (id: string) => void;
	removeAll: () => void;
}

const useWishlist = create(
	persist<WishlistStore>(
		(set, get) => ({
			items: [],
			addItem: (data: Course) => {
				const currentItems = get().items;
				const existingItem = currentItems.find(
					(item) => item.id === data.id
				);

				if (existingItem) {
					return toast('Item already in cart.');
				}

				set({ items: [...get().items, data] });
				toast.success('Item added to cart');
			},
			removeItem: (id: string) => {
				set({
					items: [...get().items.filter((item) => item.id !== id)],
				});
				toast.success('Item removed from the cart');
			},
			removeAll: () => set({ items: [] }),
		}),
		{
			name: 'wishlist-storage',
			storage: createJSONStorage(() => localStorage),
		}
	)
);

export default useWishlist;
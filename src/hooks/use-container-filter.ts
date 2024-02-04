import { create } from 'zustand';

type ConfettiStore = {
	isOpen: boolean;
	onToggle: () => void;
};

export const useContainerFilter = create<ConfettiStore>((set) => ({
	isOpen: false,
	onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

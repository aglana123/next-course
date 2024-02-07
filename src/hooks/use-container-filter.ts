import { create } from 'zustand';

type ConfettiStore = {
  isOpen: boolean;
  isLoading: boolean;
  onToggle: () => void;
};

export const useContainerFilter = create<ConfettiStore>((set) => ({
  isOpen: false,
  isLoading: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen }))
}));
